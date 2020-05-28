import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FerreteriaService } from 'src/app/services/ferreteria.service';
import { ToastrService } from 'ngx-toastr';
import { ThrowStmt } from '@angular/compiler';

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

  constructor(
    private auth: AuthService,
    private ferreteriaService: FerreteriaService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
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


  obtenerClientes(usuarios) {
    usuarios.forEach(element => {
      if (element.tipoUsuario === "ReadOnly") {
        this.clientes.push(element);
        console.log(this.clientes);
      }
    });
  }
  obtenerAdmins(usuarios) {
    usuarios.forEach(element => {
      if (element.tipoUsuario === "Admin") {
        this.administradores.push(element);
        console.log(this.administradores);
      }
    });
  }

}
