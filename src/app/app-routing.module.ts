import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { AjustesComponent } from './pages/ajustes/ajustes.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { ItemsComponent } from './components/items/items.component';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { InventarioComponent } from './pages/inventario/inventario.component';


const routes: Routes = [
  { path: 'inicio', component: HomeComponent },
  { path: 'buscar', component: BuscarComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: 'inventario', component: InventarioComponent },
  { path: 'ajustes', component: AjustesComponent },
  { path: 'producto/:id', component: ItemDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'registro' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
