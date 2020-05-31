import { Component, OnInit } from '@angular/core';
import { FerreteriaService } from 'src/app/services/ferreteria.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {
  ordenes = [];
  misOrdenes = []
  productosOrdenados = [];
  public cliente = '';
  tipoUsuario: string
  usuario: string;

  constructor(private ferreteriaService: FerreteriaService, private firebaseAuth: AngularFireAuth, private firestore: AngularFirestore) {

    this.ferreteriaService.obtenerOrdenes().subscribe(ordenes => {
      this.firebaseAuth.onAuthStateChanged((user) => {
        if (user) {
          const document = this.firestore.collection('Users').doc(user.uid);
          document.get().subscribe((doc) => {
            this.ordenes = ordenes;
            console.log(ordenes)
            console.log(doc.data().tipoUsuario);
            const idCliente = user.uid;
            this.misOrdenes = this.ordenes.filter((element) => {
              return element.idCliente === user.uid;
            })
            //console.log(this.misOrdenes);
          });
        }
      });
      //console.log(this.cliente);
      //console.log(this.misOrdenes);
      /*  this.ordenes.forEach(async (orden: any, index) => {
         this.firestore
           .collection('Orders')
           .doc(orden.id)
           .collection('Products')
           .get().subscribe((doc) => {
             doc.forEach(((document) => {
               console.log(document.id);
               this.productosOrdenados.splice(index, 0, document.id)
             }))
             console.log(this.productosOrdenados);
           })
       }); */
    });
  }

  ngOnInit(): void {
    this.firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        const document = this.firestore.collection('Users').doc(user.uid);
        document.get().subscribe((doc) => {
          this.usuario = doc.data().tipoUsuario;
          console.log(doc.data().tipoUsuario);
        });
      } else {
        console.log('not logged in');
      }
    });

  }
}
