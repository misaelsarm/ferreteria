import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FerreteriaService } from 'src/app/services/ferreteria.service';
import { Producto } from 'src/app/models/producto.model';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.scss']
})
export class ProductoDetalleComponent implements OnInit {

  producto;
  constructor(private route: ActivatedRoute, public ferreteriaService: FerreteriaService) {
    const id = +this.route.snapshot.paramMap.get('id');
    //this.producto = ferreteriaService.obtenerProducto(id);
    console.log(this.producto);
  }

  ngOnInit(): void {

  }


}
