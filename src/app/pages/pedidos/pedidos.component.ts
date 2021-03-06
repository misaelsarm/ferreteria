import { Component, OnInit } from '@angular/core';
import { FerreteriaService } from 'src/app/services/ferreteria.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {
  pedidos = [];
  misPedidos = [];
  misResultados = [];
  resultados = [];

  tipoUsuario: string;
  // tslint:disable-next-line: variable-name
  _listFilter: string;
  uid: string;

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.pedidos = this.listFilter ? this.buscarPedidos(this.listFilter) : this.resultados;
    this.misPedidos = this.listFilter ? this.buscarPedidos(this.listFilter) : this.misResultados;
  }
  constructor(
    private ferreteriaService: FerreteriaService,
    private firebaseAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.authService.currentUser().subscribe((user) => {
      if (user) {
        const document = this.firestore.collection('Users').doc(user.uid);
        document.get().subscribe((doc) => {
          this.tipoUsuario = doc.data().tipoUsuario;
          this.uid = user.uid;
          this.ferreteriaService.obtenerPedidos().subscribe((pedidos) => {
            this.resultados = pedidos;
            this.pedidos = this.resultados;
            this.misPedidos = this.pedidos.filter((element) => {
              return element.idCliente === user.uid;
            });
            this.misResultados = this.misPedidos;
            this.pedidos.forEach((orden, index) => {
              const data = [];
              this.firestore.collection('Pedidos').doc(orden.id).collection('Products').get().toPromise().then(snapshot => {
                this.pedidos[index].productos = data;
                snapshot.forEach((el) => {
                  data.push(el.data());
                });
              });
            });
          })

        });
      }
    });
  }

  buscarPedidos(elementoBuscado: string) {
    elementoBuscado = elementoBuscado.toLowerCase();
    return this.resultados.filter((pedido) =>
      pedido.id.toLowerCase().indexOf(elementoBuscado) !== -1);
  }

  buscarMisPedidos(elementoBuscado: string) {
    elementoBuscado = elementoBuscado.toLowerCase();
    return this.misResultados.filter((pedido) =>
      pedido.id.toLowerCase().indexOf(elementoBuscado) !== -1);
  }

  confirmar(pedido) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'm-3 btn btn-success',
        cancelButton: 'btn btn-outline-danger'
      },
      buttonsStyling: false
    });
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
    });
  }

  cancelarPedido(pedido) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'm-3 btn btn-success',
        cancelButton: 'btn btn-outline-danger'
      },
      buttonsStyling: false
    });
    console.log(pedido);
    swalWithBootstrapButtons.fire({
      title: `¿Seguro que deseas cancelar el pedido: ${pedido.id}?`,
      text: `El pedido se cancelara`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar cancelacion de pedido',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        const document = this.firestore.collection('Pedidos').doc(pedido.id).update({
          status: 'Cancelado'
        }).then(() => {
          this.toastr.success('Se actualizo el estado del pedido a: Cancelado.', 'Pedido cancelado', {
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
    });
  }
}
