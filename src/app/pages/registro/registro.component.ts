import { Component } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Roles } from "../../models/usuario.model";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {

  usuario: UsuarioModel = new UsuarioModel();
  passwords = false;

  constructor(private auth: AuthService, private afs: AngularFirestore, private router: Router) { }

  registro(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.auth.nuevoUsuario(this.usuario).then((cred) => {
      console.log(cred);
      const date = new Date();
      const time = `${date.getHours().toString()} : ${date.getMinutes().toString()} : ${date.getSeconds().toString()}`;
      const day = `${date.getDate().toString()} - ${(date.getMonth() + 1).toString()} - ${date.getFullYear().toString()}`;
      this.afs.collection('Users').doc(cred.user.uid).set({
        nombre: this.usuario.nombre,
        apellido: this.usuario.apellido,
        email: this.usuario.email,
        nombreCompleto: `${this.usuario.nombre} ${this.usuario.apellido}`,
        tipoUsuario: Roles.Cliente,
        fechaCreacion: day,
        horaCreacion: time
      })
      Swal.fire({
        title: 'Registro exitoso',
        text: `Bienvenido ${this.usuario.nombre} ${this.usuario.apellido}`,
        icon: 'success',
        confirmButtonText: 'Cerrar'
      }).then(() => {
        this.router.navigateByUrl('inicio');
      });
    }).catch((err) => {
      console.log(err);
      if (err.code === 'auth/email-already-in-use') {
        Swal.fire({
          title: 'Error',
          text: 'El correo ingresado ya existe',
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });
      }
      if (err.code === 'auth/network-request-failed') {
        Swal.fire({
          title: 'Error',
          text: 'Ocurrio un problema de conexión. Por favor intenta mas tarde.',
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });
      }
    });
  }
}
