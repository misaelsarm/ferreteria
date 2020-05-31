import { Component, OnInit } from '@angular/core';
import { FerreteriaService } from 'src/app/services/ferreteria.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

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

  constructor(private firebaseAuth: AngularFireAuth, private firestore: AngularFirestore, private ferreteriaService: FerreteriaService) { }

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

  ordernar(producto) {
    this.orden.productosOrdenados.push(producto);
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
    this.orden.productosOrdenados.forEach((producto) => {
      this.firestore.collection('Orders').doc(id.getTime().toString()).collection('Products').add(producto);
      this.firestore.collection('Orders').doc(id.getTime().toString()).set({
        status: 'Pendiente',
        total: this.orden.total,
        nombreCliente: this.orden.nombreCliente,
        idCliente: this.orden.idCliente
      });
    });
  }

  cancelar() {
    this.orden.productosOrdenados = [];
    this.orden.total = 0;
    this.showModal = !this.showModal;
  }
}
