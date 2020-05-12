import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();

  constructor(private auth: AuthService, private afs: AngularFirestore, private route: Router) {
  }

  ngOnInit(): void {
  }

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.auth.login(this.usuario).then((cred) => {
      this.route.navigateByUrl('inicio')
      const user = this.afs.collection('Users').doc(cred.user.uid);
      user.get().toPromise().then((doc) => {
        const data = doc.data();
        Swal.fire({
          text: `Bienvenido ${data.nombreCompleto}`,
          icon: 'success',
          confirmButtonText: 'Cerrar'
        })
      });
    }).catch((err) => {
      console.log(err);
      if (err.code === 'auth/user-not-found') {
        Swal.fire({
          title: 'Error',
          text: 'El correo ingresado no existe',
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });
      }
      if (err.code === 'auth/wrong-password') {
        Swal.fire({
          title: 'Error',
          text: 'La contraseña es incorrecta',
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });
      }
    });
  }
}
