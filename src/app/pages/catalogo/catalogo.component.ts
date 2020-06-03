import { Component, OnInit } from '@angular/core';
import { FerreteriaService } from 'src/app/services/ferreteria.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {

  showModal = false;

  productos = [];
  resultados = [];

  tipoUsuario: string;

  orden = {
    productosOrdenados: [],
    total: 0,
    nombreCliente: '',
    idCliente: ''
  };

  _listFilter: string;

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.productos = this.listFilter ? this.buscar(this.listFilter) : this.resultados;
  }

  constructor(
    private firebaseAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private ferreteriaService: FerreteriaService,
    private toastr: ToastrService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.currentUser().subscribe((user) => {
      if (user) {
        const document = this.firestore.collection('Users').doc(user.uid);
        document.get().subscribe((doc) => {
          this.tipoUsuario = doc.data().tipoUsuario;
          this.orden.nombreCliente = doc.data().nombreCompleto;
          this.orden.idCliente = user.uid;
        });
      }
    });
    this.ferreteriaService.obtenerProductos().subscribe(items => {
      this.resultados = items;
      this.productos = this.resultados;
    });
  }

  ordernar(producto: Producto) {
    this.orden.productosOrdenados.push(producto);
    this.toastr.info('Se agrego el producto a tu pedido', '', {
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'decreasing'
    });
  }

  verPedido() {
    this.orden.total = 0;
    this.showModal = !this.showModal;
    console.log(this.orden.productosOrdenados);
    this.orden.productosOrdenados.forEach((producto) => {
      const cantidad = parseFloat(producto.precio);
      this.orden.total = this.orden.total + cantidad;
    });
    console.log(this.orden.total);
  }

  confirmarPedido() {
    const id = new Date();
    const date = new Date();
    const days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    let time;
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    let hora;
    let minuto;
    let segundo;
    if (date.getHours() < 10 || date.getMinutes() < 10 || date.getSeconds() < 10) {
      time = `0${date.getHours().toString()}:0${date.getMinutes().toString()}:0${date.getSeconds().toString()}`;
    } else {
      time = `${date.getHours().toString()}:${date.getMinutes().toString()}:${date.getSeconds().toString()}`;
    }

    if (hour < 10) {
      hora = `0${date.getHours().toString()}`;
    } else {
      hora = `${date.getHours().toString()}`;
    }
    if (min < 10) {
      minuto = `0${date.getMinutes().toString()}`;
    } else {
      minuto = `${date.getMinutes().toString()}`;
    }
    if (sec < 10) {
      segundo = `0${date.getSeconds().toString()}`;
    } else {
      segundo = `${date.getSeconds().toString()}`;
    }

    const day = `${days[date.getDay().toString()]}, ${date.getDate().toString()} de ${months[date.getMonth().toString()]} de ${date.getFullYear().toString()}`;
    time = `${hora}:${minuto}:${segundo}`;
    
    this.orden.productosOrdenados.forEach((producto) => {
      this.firestore.collection('Pedidos').doc(id.getTime().toString()).collection('Products').add(producto);
      this.firestore.collection('Pedidos').doc(id.getTime().toString()).set({
        status: 'Pendiente',
        total: this.orden.total,
        nombreCliente: this.orden.nombreCliente,
        idCliente: this.orden.idCliente,
        diaPedido: day,
        horaPedido: time
      });
    });
    this.toastr.success('Se registro tu pedido de manera correcta', 'Pedido realizado', {
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'decreasing'
    });
    this.limpiar();
  }

  cancelar() {
    if (this.orden.total > 0) {
      this.toastr.error('Operacion cancelada', '', {
        timeOut: 3000,
        progressBar: true,
        progressAnimation: 'decreasing'
      });
    }
    this.limpiar();
  }

  buscar(elementoBuscado: string): Producto[] {
    elementoBuscado = elementoBuscado.toLowerCase();
    return this.productos.filter((producto: Producto) =>
      producto.nombre.toLowerCase().indexOf(elementoBuscado) !== -1);
  }

  limpiar() {
    this.orden.productosOrdenados = [];
    this.orden.total = 0;
    this.showModal = !this.showModal;
  }
}
