import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FerreteriaService } from 'src/app/services/ferreteria.service';
import { Producto } from 'src/app/models/producto.model';

@Component({
  selector: 'app-producto-lista',
  templateUrl: './producto-lista.component.html',
  styleUrls: ['./producto-lista.component.scss']
})
export class ProductoListaComponent implements OnInit {

  @Input() producto: any;
  @Input() imgUrl: any;
  @Input() tipoUsuario: any;
  @Output() verProducto = new EventEmitter();

  constructor(public ferreteriaService: FerreteriaService) {
  }

  ngOnInit(): void {
  }

  ver(producto: Producto) {
    this.verProducto.emit(producto);
  }
}
