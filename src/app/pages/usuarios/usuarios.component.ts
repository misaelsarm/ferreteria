import { Component, OnInit } from '@angular/core';
import { UsuarioModel, Roles } from 'src/app/models/usuario.model';
import { FerreteriaService } from 'src/app/services/ferreteria.service';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  usuarios = [];
  usuario: UsuarioModel = new UsuarioModel();

  showModal = false;
  accion = '';

  constructor(
    private ferreteriaService: FerreteriaService,
    private auth: AuthService,
    private firestore: AngularFirestore,
    private toastr: ToastrService
  ) { }

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
      tipoUsuario: '',
      password: '',
      confirmPassword: '',
      nombreCompleto: ''
    };
  }

  registrar() {
    console.log("registro");
    this.auth.nuevoUsuario(this.usuario).then(cred => {
      console.log(cred)
      this.firestore.collection('Users').doc(cred.user.uid).set({
        nombre: this.usuario.nombre,
        apellido: this.usuario.apellido,
        email: this.usuario.email,
        nombreCompleto: `${this.usuario.nombre} ${this.usuario.apellido}`,
        tipoUsuario: Roles.Admin,
      });
    })
    this.toastr.success('Se registro un nuevo usuario exitosamente.', 'Usuarios', {
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'decreasing'
    });
    this.showModal = !this.showModal;

  }

}
