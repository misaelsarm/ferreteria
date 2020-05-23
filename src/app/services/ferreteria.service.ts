import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FerreteriaService {

  productsCollection: AngularFirestoreCollection<Item>;
  products: Observable<any>;

  usersCollection: AngularFirestoreCollection<any>;
  users: Observable<any>;


  constructor(private angularFirestore: AngularFirestore) {
    this.getProductsCollection();
    this.getUsersCollection();
  }

  registrarProducto(item: Item) {
    this.productsCollection.add(item);
  }

  obtenerProductos() {
    return this.products;
  }

  obtenerUsuarios() {
    return this.users;
  }


  getProductsCollection() {
    this.productsCollection = this.angularFirestore.collection('Products');
    this.products = this.productsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as any;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  getUsersCollection() {
    this.usersCollection = this.angularFirestore.collection('Users');
    this.users = this.usersCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as any;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }
}
