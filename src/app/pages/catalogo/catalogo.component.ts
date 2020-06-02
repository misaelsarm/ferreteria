import { Component, OnInit } from '@angular/core';
import { FerreteriaService } from 'src/app/services/ferreteria.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto.model';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {

  showModal = false;

  productos = [];

  orden = {
    productosOrdenados: [],
    total: 0,
    nombreCliente: '',
    idCliente: ''
  };

  constructor(
    private firebaseAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private ferreteriaService: FerreteriaService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.ferreteriaService.obtenerProductos().subscribe(items => {
      this.productos = items;
      console.log(this.productos);
      this.firebaseAuth.onAuthStateChanged((user) => {
        if (user) {
          const document = this.firestore.collection('Users').doc(user.uid);
          document.get().subscribe((doc) => {
            this.orden.nombreCliente = doc.data().nombreCompleto;
            this.orden.idCliente = user.uid;
            console.log(this.orden.nombreCliente);
          });
        }
      });
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
    const time = `${date.getHours().toString()} : ${date.getMinutes().toString()} : ${date.getSeconds().toString()}`;
    const day = `${date.getDate().toString()} - ${(date.getMonth() + 1).toString()} - ${date.getFullYear().toString()}`;
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

  limpiar() {
    this.orden.productosOrdenados = [];
    this.orden.total = 0;
    this.showModal = !this.showModal;
  }
}
