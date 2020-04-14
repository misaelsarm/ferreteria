import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FerreteriaService } from 'src/app/services/ferreteria.service';
import { Item } from 'src/app/models/item.model';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {

  item: Item;
  constructor(private route: ActivatedRoute, public ferreteriaService: FerreteriaService) {
    const id = +this.route.snapshot.paramMap.get('id');
    this.item = ferreteriaService.obtenerProducto(id);
    console.log(this.item);
  }

  ngOnInit(): void {

  }


}
