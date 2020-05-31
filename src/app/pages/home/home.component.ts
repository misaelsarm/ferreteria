import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FerreteriaService } from 'src/app/services/ferreteria.service';
import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from '@angular/fire/auth';
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
  usuario;

  ordenes = [];
  misOrdenes = [];

 

  constructor(
    private ferreteriaService: FerreteriaService,
    private firebaseAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
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

    this.ferreteriaService.obtenerOrdenes().subscribe(ordenes => {
      this.firebaseAuth.onAuthStateChanged((user) => {
        if (user) {
          const document = this.firestore.collection('Users').doc(user.uid);
          document.get().subscribe((doc) => {
            this.ordenes = ordenes;
            console.log(ordenes)
            console.log(doc.data().tipoUsuario);
            this.misOrdenes = this.ordenes.filter((element) => {
              return element.idCliente === user.uid;
            })
          });
        }
      });
    });

    this.ferreteriaService.obtenerUsuarios().subscribe((usuarios) => {
      this.usuarios = usuarios;
      this.obtenerClientes(this.usuarios);
      this.obtenerAdmins(this.usuarios);
    });
    this.ferreteriaService.obtenerProductos().subscribe((productos) => {
      this.productos = productos;
      console.log(this.productos)
    });
  }

  obtenerClientes(usuarios: UsuarioModel[]) {
    usuarios.forEach(element => {
      if (element.tipoUsuario === 'ReadOnly') {
        this.clientes.push(element);
      }
    });
    console.log(this.clientes);
  }

  obtenerAdmins(usuarios: UsuarioModel[]) {
    usuarios.forEach(element => {
      if (element.tipoUsuario === 'Admin') {
        this.administradores.push(element);
      }
    });
    console.log(this.administradores);
  }
}
