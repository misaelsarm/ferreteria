import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FerreteriaService } from 'src/app/services/ferreteria.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { UsuarioModel } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  productos = [];
  pedidos = [];
  usuarios = [];
  clientes = [];
  administradores = [];
  tipoUsuario: string;
  misPedidos = [];

  constructor(
    private ferreteriaService: FerreteriaService,
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.authService.currentUser().subscribe((user) => {
      if (user) {
        const document = this.firestore.collection('Users').doc(user.uid);
        document.get().subscribe((doc) => {
          this.tipoUsuario = doc.data().tipoUsuario;
          this.ferreteriaService.obtenerPedidos().subscribe(pedidos => {
            this.pedidos = pedidos;
            this.misPedidos = this.pedidos.filter((element) => {
              return element.idCliente === user.uid;
            });
          })
        });
      }
    })

    this.ferreteriaService.obtenerUsuarios().subscribe((usuarios) => {
      this.usuarios = usuarios;
      this.obtenerClientes(this.usuarios);
      this.obtenerAdmins(this.usuarios);
    });

    this.ferreteriaService.obtenerProductos().subscribe((productos) => {
      this.productos = productos;
    });
  }

  obtenerClientes(usuarios: UsuarioModel[]) {
    usuarios.forEach(element => {
      if (element.tipoUsuario === 'ReadOnly') {
        this.clientes.push(element);
      }
    });
  }

  obtenerAdmins(usuarios: UsuarioModel[]) {
    usuarios.forEach(element => {
      if (element.tipoUsuario === 'Admin') {
        this.administradores.push(element);
      }
    });
  }
}
