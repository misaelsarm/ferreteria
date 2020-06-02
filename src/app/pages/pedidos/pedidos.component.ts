import { Component, OnInit } from '@angular/core';
import { FerreteriaService } from 'src/app/services/ferreteria.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private ferreteriaService: FerreteriaService,
    private firebaseAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private toastr: ToastrService
  ) {
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

  confirmar(pedido) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'm-3 btn btn-success',
        cancelButton: 'btn btn-outline-danger'
      },
      buttonsStyling: false
    })
    console.log(pedido);
    swalWithBootstrapButtons.fire({
      title: `Confirmar entrega de pedido: ${pedido.id}`,
      text: `El pedido se entregara a: ${pedido.nombreCliente}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar entrega',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        const document = this.firestore.collection('Pedidos').doc(pedido.id).update({
          status: 'Entregado'
        }).then(() => {
          this.toastr.success('Se actualizo el estado del pedido a: Entregado.', 'Entrega realizada', {
            timeOut: 3000,
            progressBar: true,
            progressAnimation: 'decreasing'
          });
        });

      }
      else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.error('Operacion cancelada', '', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing'
        });
      }
    })
  }
}
