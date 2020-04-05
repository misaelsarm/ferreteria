import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class FerreteriaService {

  items: Item[] = [];

  constructor() {
    this.agregarItem();
  }

  agregarItem() {
    const item1 = new Item(1, 'Martillo', 139, 'assets/img/martillo.PNG');
    const item2 = new Item(2, 'Desarmador', 29, 'assets/img/desarmador.PNG');
    const item3 = new Item(3, 'Brocha', 40, 'assets/img/brocha.PNG');
    const item4 = new Item(4, 'Pinzas', 99, 'assets/img/pinzas.PNG');
    this.items.push(item1, item2, item3, item4);
    console.log(this.items);
  }

  obtenerProducto(id: number) {
    return this.items.find(items => {
      return items.id === id;
    })
  }


}
