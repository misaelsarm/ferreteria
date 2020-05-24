import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { FerreteriaService } from 'src/app/services/ferreteria.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  usuarios = [];
  usuario = {
    nombre: '',
    apellido: '',
    email: '',
    tipoUsuario: ''
  };

  showModal = false;
  accion = '';

  constructor(private ferreteriaService: FerreteriaService) { }

  ngOnInit(): void {
    this.ferreteriaService.obtenerUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
      console.log(this.usuarios);
    })
  }

  /**
   *
   * Ver un usuario en particular. Muestra el modal con los datos del usuario.
   */
  verUsuario(usuario: UsuarioModel) {
    this.showModal = true;
    this.accion = 'Modificar';
    this.usuario.nombre = usuario.nombre;
    this.usuario.apellido = usuario.apellido;
    this.usuario.email = usuario.email;
    this.usuario.tipoUsuario = usuario.tipoUsuario;
    console.log(this.usuario);
  }

  /**
   *
   * Se ejecuta cuando se hace click en el boton 'Registrar nuevo usuario'
   */
  nuevoUsuario() {
    this.showModal = true;
    this.accion = 'Registrar nuevo';
  }

  cancelar() {
    this.showModal = !this.showModal;
    this.limpiar();
  }

  limpiar() {
    this.usuario = {
      nombre: '',
      apellido: '',
      email: '',
      tipoUsuario: ''
    }
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
