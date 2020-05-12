import { Component, OnInit } from '@angular/core';
import { NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Item } from 'src/app/models/item.model';
import { FerreteriaService } from 'src/app/services/ferreteria.service';


@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})


export class InventarioComponent implements OnInit {

  item = new Item();

  constructor(private ferreteria: FerreteriaService) { }

  ngOnInit(): void {
  }

  OnclickSubmit(formData) {
    this.ferreteria.agregarItem(this.item)
    console.log(formData);
  }


}

