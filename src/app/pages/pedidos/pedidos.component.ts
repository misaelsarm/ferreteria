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
  pedidos = [];
  misPedidos = [];
  tipoUsuario: string;
  usuario: string;

  constructor(private ferreteriaService: FerreteriaService, private firebaseAuth: AngularFireAuth, private firestore: AngularFirestore) {
    this.ferreteriaService.obtenerPedidos().subscribe(pedidos => {
      this.firebaseAuth.onAuthStateChanged((user) => {
        if (user) {
          const document = this.firestore.collection('Users').doc(user.uid);
          document.get().subscribe((doc) => {
            this.pedidos = pedidos;
            this.misPedidos = this.pedidos.filter((element) => {
              return element.idCliente === user.uid;
            });
            this.pedidos.forEach((orden, index) => {
              let data = []
              this.firestore.collection('Pedidos').doc(orden.id).collection('Products').get().toPromise().then(snapshot => {
                this.pedidos[index]['productos'] = data;
                snapshot.forEach((el) => {
                  data.push(el.data());
                });
              });
            });
            console.log(this.pedidos);
          });
        }
      });
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
