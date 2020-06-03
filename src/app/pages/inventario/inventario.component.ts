import { Component, OnInit } from '@angular/core';
import { FerreteriaService } from 'src/app/services/ferreteria.service';
import { Producto } from 'src/app/models/producto.model';
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})

export class InventarioComponent implements OnInit {

  showModal = false;
  accion = '';
  productos = [];
  resultados = [];
  tipoUsuario: string;
  producto = new Producto();
  fileData = {
    file: '',
    fileName: ''
  };
  uploadPercent: Observable<number>;

  _listFilter: string;

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.productos = this.listFilter ? this.buscar(this.listFilter) : this.resultados;
  }

  constructor(
    private storage: AngularFireStorage,
    private ferreteriaService: FerreteriaService,
    private toastr: ToastrService,
    private authService: AuthService,
    private firestore: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.authService.currentUser().subscribe((user) => {
      if (user) {
        const document = this.firestore.collection('Users').doc(user.uid);
        document.get().subscribe((doc) => {
          this.tipoUsuario = doc.data().tipoUsuario;
        });
      }
    });
    this.ferreteriaService.obtenerProductos().subscribe(items => {
      this.resultados = items;
      this.productos = this.resultados;
      //console.log(this.resultados);
    });
  }

  buscar(elementoBuscado: string): Producto[] {
    elementoBuscado = elementoBuscado.toLowerCase();
    return this.productos.filter((producto: Producto) =>
      producto.nombre.toLowerCase().indexOf(elementoBuscado) !== -1);
  }

  nuevoProducto() {
    this.showModal = !this.showModal;
    this.accion = 'Registrar nuevo';
  }

  submitForm(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.registrarProducto();
  }

  registrarProducto() {
    this.producto = {
      nombre: this.producto.nombre,
      descripcion: this.producto.descripcion,
      marca: this.producto.marca,
      enExistenciaDisponibles: this.producto.enExistenciaDisponibles,
      precio: this.producto.precio,
      imagenURL: this.producto.imagenURL
    };
    this.ferreteriaService.registrarProducto(this.producto);
    this.toastr.success('Se registro un nuevo producto exitosamente.', 'Inventario', {
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'decreasing'
    });
    this.showModal = !this.showModal;
  }

  verProducto(producto: Producto) {
    this.accion = 'Actualizar';
    this.showModal = !this.showModal;
    this.producto.nombre = producto.nombre;
    this.producto.precio = producto.precio;
    this.producto.marca = producto.marca;
    this.producto.descripcion = producto.descripcion;
    this.producto.enExistenciaDisponibles = producto.enExistenciaDisponibles;
    this.producto.id = producto.id;
  }

  onFileSelected(event) {
    this.fileData.file = event.target.files[0];
    this.fileData.fileName = event.target.files[0].name;
    const filePath = `productos/${this.fileData.fileName}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.fileData.file);
    this.uploadPercent = task.percentageChanges();

    task.snapshotChanges().pipe(
      finalize(() => {
        ref.getDownloadURL().subscribe((data) => {
          this.producto.imagenURL = data;
          console.log(this.producto.imagenURL);
        });
      }
      )).subscribe();
  }

  cancelar(form: NgForm) {
    form.reset();
    this.showModal = !this.showModal;
  }

  confirmarActualizacion() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'm-3 btn btn-success',
        cancelButton: 'btn btn-outline-danger'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: '¿Actualizar datos de producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.firestore.collection('Products').doc((this.producto.id).toString()).update({
          nombre: this.producto.nombre,
          precio: this.producto.precio,
          marca: this.producto.marca,
          descripcion: this.producto.descripcion,
          enExistenciaDisponibles: this.producto.enExistenciaDisponibles,
        }).then(() => {
          this.toastr.success('Se actualizaron los datos del producto.', 'Producto actualizado', {
            timeOut: 3000,
            progressBar: true,
            progressAnimation: 'decreasing'
          });
          this.showModal = !this.showModal;
        });

      }
      else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.error('Operacion cancelada', '', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing'
        });
      }
    });
  }
}
