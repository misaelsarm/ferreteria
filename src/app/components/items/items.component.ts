import { Component, OnInit } from '@angular/core';
import { FerreteriaService } from 'src/app/services/ferreteria.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  constructor(public ferreteriaService: FerreteriaService) {
  }

  ngOnInit(): void {
  }

}
