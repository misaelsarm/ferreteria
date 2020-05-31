import { Component, OnInit } from '@angular/core';
import { FerreteriaService } from 'src/app/services/ferreteria.service';
import { Producto } from 'src/app/models/producto.model';
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

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
    this.resultados = this.listFilter ? this.buscar(this.listFilter) : this.productos;
  }

  constructor(
    private storage: AngularFireStorage,
    private ferreteriaService: FerreteriaService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.ferreteriaService.obtenerProductos().subscribe(items => {
      this.productos = items;
      this.resultados = this.productos;
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
      imagenURL: this.producto.imagenURL,
    };
    this.ferreteriaService.registrarProducto(this.producto);
    this.toastr.success('Se registro un nuevo producto exitosamente.', 'Inventario', {
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'decreasing'
    });
    this.showModal = !this.showModal;
  }

  onFileSelected(event?) {
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
}
