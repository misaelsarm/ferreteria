import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();

  constructor(private auth: AuthService, private afs: AngularFirestore) { }

  ngOnInit(): void {
  }

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.auth.login(this.usuario).subscribe((resp: any) => {
      let user = this.afs.collection('Users').doc(resp.localId);
      user.get().toPromise().then(doc => {
        let data = doc.data();
        console.log(data.nombreCompleto);
        Swal.fire({
          //title: `Bienvenido ${resp['email']}`,
          text: `Bienvenido ${data.nombre}`,
          icon: 'success',
          confirmButtonText: 'Cerrar'
        })
      })
      console.log(resp.localId);
    }, (err) => {
      console.log(err.error.error.message);
      if (err.error.error.message === 'EMAIL_NOT_FOUND') {
        Swal.fire({
          title: 'Error',
          text: 'El correo ingresado no existe',
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });
      }
      if (err.error.error.message === 'INVALID_PASSWORD') {
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
