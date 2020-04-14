import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-nav-bar',
  templateUrl: './user-nav-bar.component.html',
  styleUrls: ['./user-nav-bar.component.scss']
})
export class UserNavBarComponent implements OnInit {

  verLista: boolean;
  verCuadricula: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  mostrarLista() {
    this.verLista = true;
    this.verCuadricula = false;
    console.log("Vista de lista")
  }

  mostrarCuadricula() {
    this.verLista = false;
    this.verCuadricula = true;
    console.log("Vista de cuadricula")
  }

}
