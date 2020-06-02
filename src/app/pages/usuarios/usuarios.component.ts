import { Component, OnInit } from '@angular/core';
import { UsuarioModel, Roles } from 'src/app/models/usuario.model';
import { FerreteriaService } from 'src/app/services/ferreteria.service';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  usuarios = [];
  resultados = [];
  usuario: UsuarioModel = new UsuarioModel();

  showModal = false;
  accion = '';

  _listFilter: string;

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.resultados = this.listFilter ? this.buscar(this.listFilter) : this.usuarios;
  }

  constructor(
    private ferreteriaService: FerreteriaService,
    private auth: AuthService,
    private firestore: AngularFirestore,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.ferreteriaService.obtenerUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
      this.resultados = this.usuarios;
    })
  }

  buscar(elementoBuscado: string): UsuarioModel[] {
    elementoBuscado = elementoBuscado.toLowerCase();
    return this.usuarios.filter((usuario: UsuarioModel) =>
      usuario.nombre.toLowerCase().indexOf(elementoBuscado) !== -1);
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
    this.accion = 'Registrar nuevo';
    this.showModal = true;
  }

  submitForm(form: NgForm) {
    console.log(form);
    if (form.invalid) {
      return;
    }
    this.registrar();
  }

  cancelar(form: NgForm) {
    this.showModal = !this.showModal;
    form.reset();
  }

  registrar() {
    this.auth.nuevoUsuario(this.usuario).then(cred => {
      console.log(cred)
      this.firestore.collection('Users').doc(cred.user.uid).set({
        nombre: this.usuario.nombre,
        apellido: this.usuario.apellido,
        email: this.usuario.email,
        nombreCompleto: `${this.usuario.nombre} ${this.usuario.apellido}`,
        tipoUsuario: Roles.Admin,
      });
      this.toastr.success('Se registro un nuevo usuario exitosamente.', 'Usuarios', {
        timeOut: 3000,
        progressBar: true,
        progressAnimation: 'decreasing'
      });
    })
    this.showModal = !this.showModal;
  }
}
