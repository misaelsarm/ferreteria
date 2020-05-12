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

  agregarItem(this.item) {
    const productCollection = this.afs.collection('Products');
    productCollection.add({
      Name: this.item.nombre,
      Description: this.item.descripcion,
    });

    console.log(this.items);
  }

  obtenerProducto(id: number) {
    return this.items.find(item => {
      return item.id === id;
    })
  }




}

