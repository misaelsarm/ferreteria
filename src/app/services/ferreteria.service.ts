import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FerreteriaService {

  item = new Item();
  items: Item[] = [];

  constructor(private afs: AngularFirestore) {

    // this.agregarItem();
  }

  agregarItem(item: Item) {
    this.afs.collection('Products').doc('id').set({
      nombre: this.item.nombre,
      descripcion: this.item.descripcion
    });


    // const item2 = new item(57392937589, 'martillo', 139, 'assets/img/martillo.png', 'forjada de acero al cromo vanadio dos veces más resistente al desgaste.', 'truper', true, 25);
    // const item3 = new item(57392937578, 'martillo', 139, 'assets/img/martillo.png', 'forjada de acero al cromo vanadio dos veces más resistente al desgaste.', 'truper', true, 25);
    // const item4 = new item(57392993758, 'martillo', 139, 'assets/img/martillo.png', 'forjada de acero al cromo vanadio dos veces más resistente al desgaste.', 'truper', true, 25);
    // const item5 = new item(57392937568, 'martillo', 139, 'assets/img/martillo.png', 'forjada de acero al cromo vanadio dos veces más resistente al desgaste.', 'truper', true, 25);
    // const item6 = new item(57392937589, 'martillo', 139, 'assets/img/martillo.png', 'forjada de acero al cromo vanadio dos veces más resistente al desgaste.', 'truper', true, 25);
    // const item7 = new item(57392937578, 'martillo', 139, 'assets/img/martillo.png', 'forjada de acero al cromo vanadio dos veces más resistente al desgaste.', 'truper', true, 25);
    // const item8 = new item(57392993758, 'martillo', 139, 'assets/img/martillo.png', 'forjada de acero al cromo vanadio dos veces más resistente al desgaste.', 'truper', true, 25);
    /* const item2 = new Item(2, 'Desarmador', 29, 'assets/img/desarmador.PNG');
    const item3 = new Item(3, 'Brocha', 40, 'assets/img/brocha.PNG');
    const item4 = new Item(4, 'Pinzas', 99, 'assets/img/pinzas.PNG'); */

    console.log(this.items);
  }

  obtenerProducto(id: number) {
    return this.items.find(item => {
      return item.id === id;
    })
  }




}

