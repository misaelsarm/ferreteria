import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario: UsuarioModel = new UsuarioModel();

  constructor() { }
}
