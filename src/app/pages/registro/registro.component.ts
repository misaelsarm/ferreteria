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

  constructor(private auth: AuthService, private firestore: AngularFirestore, private router: Router) { }

  registro(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.auth.nuevoUsuario(this.usuario).then((cred) => {
      console.log(cred);
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

      this.firestore.collection('Users').doc(cred.user.uid).set({
        nombre: this.usuario.nombre,
        apellido: this.usuario.apellido,
        email: this.usuario.email,
        nombreCompleto: `${this.usuario.nombre} ${this.usuario.apellido}`,
        tipoUsuario: Roles.Cliente,
        fechaRegistro: day,
        horaRegistro: time
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
