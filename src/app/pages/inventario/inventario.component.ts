import { Component, OnInit } from '@angular/core';
import {NgModule} from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Item } from 'src/app/models/item.model';


@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})


export class InventarioComponent implements OnInit {

  item = new Item();
  
  constructor() { }

  ngOnInit(): void {
  }

OnclickSubmit(formData){
  alert("Item Name: " + formData.Name);
}

}

