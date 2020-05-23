import { Component, OnInit, Input } from '@angular/core';
import { FerreteriaService } from 'src/app/services/ferreteria.service';

@Component({
  selector: 'app-producto-lista',
  templateUrl: './producto-lista.component.html',
  styleUrls: ['./producto-lista.component.scss']
})
export class ProductoListaComponent implements OnInit {

  @Input() producto: any;

  constructor(public ferreteriaService: FerreteriaService) {
  }

  ngOnInit(): void {
  }

}
