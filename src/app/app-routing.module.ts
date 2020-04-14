import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BuscarComponent } from './components/buscar/buscar.component';
import { AjustesComponent } from './components/ajustes/ajustes.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { ItemsComponent } from './components/items/items.component';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  { path: 'inicio', component: HomeComponent },
  { path: 'buscar', component: BuscarComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: 'ajustes', component: AjustesComponent },
  { path: 'producto/:id', component: ItemDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
