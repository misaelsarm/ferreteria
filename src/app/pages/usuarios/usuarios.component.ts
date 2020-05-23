import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import Swal from 'sweetalert2';
import { Roles, UsuarioModel } from 'src/app/models/usuario.model';
import { FerreteriaService } from 'src/app/services/ferreteria.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  usuarios = [];

  constructor(private ferreteriaService: FerreteriaService) { }

  ngOnInit(): void {
    this.ferreteriaService.obtenerUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
      console.log(this.usuarios);
    })
  }

  verUsuario(usuario: UsuarioModel) {
    console.log(usuario);
  }

  /* async OnclickSubmit() {
    const id = new Date();
    const { value: formValues } = await Swal.fire({
      title: 'Registro de administradores',
      html:
        '<label>Nombre:</label>' +
        '<input autocomplete="off" id="nombre" class="swal2-input">' +

        '<label>Apellido:</label>' +
        '<input autocomplete="off" id="apellido" class="swal2-input">' +

        '<label>Correo:</label><br>' +
        '<input autocomplete="off" id="correo" class="swal2-input"><br>' +

        '<label>Contraseña:</label>' +
        '<input autocomplete="off" type="password" id="password" class="swal2-input">',
      focusConfirm: false,
      preConfirm: () => {
        return [];
      }
    });
    if (formValues) {
      let email = document.getElementById('email')
      let password = document.getElementById('password')
      this.afs.collection('Users').doc(id.getTime().toString()).set({
        nombre: (document.getElementById('nombre') as HTMLInputElement).value,
        apellido: (document.getElementById('apellido') as HTMLInputElement).value,
        email: (document.getElementById('correo') as HTMLInputElement).value,
        tipoUsuario: Roles.Admin,
      });
    }
  } */

}
