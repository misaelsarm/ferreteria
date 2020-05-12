import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { FerreteriaService } from 'src/app/services/ferreteria.service';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})

export class InventarioComponent implements OnInit {

  item = new Item();

  constructor(private afs: AngularFirestore) { }

  ngOnInit(): void {
  }

  OnclickSubmit() {
    this.afs.collection('Products').doc('djsdsjsajskasj').set({
      nombre: this.item.nombre,
      descripcion: this.item.descripcion
    });
  }


}

