import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { AjustesComponent } from './pages/ajustes/ajustes.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { ProductoListaComponent } from './components/producto-lista/producto-lista.component';
import { ItemDetailComponent } from './components/producto-detalle/producto-detalle.component';
import { UserNavBarComponent } from './components/shared/user-nav-bar/user-nav-bar.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PedidosComponent,
    AjustesComponent,
    BuscarComponent,
    ProductoListaComponent,
    ItemDetailComponent,
    UserNavBarComponent,
    LoginComponent,
    RegistroComponent,
    InventarioComponent,
    UsuariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
