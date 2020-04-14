import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { AjustesComponent } from './components/ajustes/ajustes.component';
import { BuscarComponent } from './components/buscar/buscar.component';
import { ItemsComponent } from './components/items/items.component';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { UserNavBarComponent } from './components/shared/user-nav-bar/user-nav-bar.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PedidosComponent,
    AjustesComponent,
    BuscarComponent,
    ItemsComponent,
    ItemDetailComponent,
    UserNavBarComponent,
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
