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
    const item1 = new Item(57392937568, 'Martillo', 139, 'assets/img/martillo.PNG', 'Forjada de acero al cromo vanadio dos veces más resistente al desgaste.', 'Truper', true, 25);
    const item2 = new Item(57392937589, 'Martillo', 139, 'assets/img/martillo.PNG', 'Forjada de acero al cromo vanadio dos veces más resistente al desgaste.', 'Truper', true, 25);
    const item3 = new Item(57392937578, 'Martillo', 139, 'assets/img/martillo.PNG', 'Forjada de acero al cromo vanadio dos veces más resistente al desgaste.', 'Truper', true, 25);
    const item4 = new Item(57392993758, 'Martillo', 139, 'assets/img/martillo.PNG', 'Forjada de acero al cromo vanadio dos veces más resistente al desgaste.', 'Truper', true, 25);
    const item5 = new Item(57392937568, 'Martillo', 139, 'assets/img/martillo.PNG', 'Forjada de acero al cromo vanadio dos veces más resistente al desgaste.', 'Truper', true, 25);
    const item6 = new Item(57392937589, 'Martillo', 139, 'assets/img/martillo.PNG', 'Forjada de acero al cromo vanadio dos veces más resistente al desgaste.', 'Truper', true, 25);
    const item7 = new Item(57392937578, 'Martillo', 139, 'assets/img/martillo.PNG', 'Forjada de acero al cromo vanadio dos veces más resistente al desgaste.', 'Truper', true, 25);
    const item8 = new Item(57392993758, 'Martillo', 139, 'assets/img/martillo.PNG', 'Forjada de acero al cromo vanadio dos veces más resistente al desgaste.', 'Truper', true, 25);
    /* const item2 = new Item(2, 'Desarmador', 29, 'assets/img/desarmador.PNG');
    const item3 = new Item(3, 'Brocha', 40, 'assets/img/brocha.PNG');
    const item4 = new Item(4, 'Pinzas', 99, 'assets/img/pinzas.PNG'); */
    this.items.push(item1, item2, item3, item4, item5, item6, item7, item8);
    console.log(this.items);
  }

  obtenerProducto(id: number) {
    return this.items.find(item => {
      return item.id === id;
    })
  }


}
