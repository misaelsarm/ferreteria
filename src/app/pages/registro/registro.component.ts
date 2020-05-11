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
    this.auth.nuevoUsuario(this.usuario).subscribe((resp: any) => {
      this.afs.collection('Users').doc(resp.localId).set({
        nombre: this.usuario.nombre,
        apellido: this.usuario.apellido,
        email: this.usuario.email,
        nombreCompleto: `${this.usuario.nombre} ${this.usuario.apellido}`,
        tipoUsuario: Roles.ReadOnly,
      })
      console.log(resp);
      Swal.fire({
        title: 'Registro correcto',
        text: 'El usuario se registro de manera exitosa',
        icon: 'success',
        confirmButtonText: 'Cerrar'
      }).then(() => {
        this.router.navigateByUrl('login');
      });
    }, (err) => {
      console.error(err.error.error.message);
      if (err.error.error.message === 'EMAIL_EXISTS') {
        Swal.fire({
          title: 'Error',
          text: 'El correo ya existe',
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });
      }
    });
  }
}
