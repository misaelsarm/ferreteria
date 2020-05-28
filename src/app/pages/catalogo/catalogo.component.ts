import { Component, OnInit } from '@angular/core';
import { FerreteriaService } from 'src/app/services/ferreteria.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {

  showModal = false;
  total = 0;
  productos = [];

  productosOrdenados = [];
  constructor(private ferreteriaService: FerreteriaService) { }

  ngOnInit(): void {
    this.ferreteriaService.obtenerProductos().subscribe(items => {
      this.productos = items;
      console.log(this.productos);
    });
  }

  ordernar(producto) {
    this.productosOrdenados.push(producto);
  }

  verPedido() {
    this.showModal = !this.showModal;
    console.log(this.productosOrdenados);
    this.productosOrdenados.forEach((producto) => {
      let cantidad = parseFloat(producto.precio)
      this.total = this.total + cantidad;
    })
    console.log(this.total);
  }

  confirmarPedido() {
    console.log(this.productosOrdenados);
  }

  cancelar() {
    this.productosOrdenados = [];
    this.total = 0;
    this.showModal = !this.showModal;
  }



}
