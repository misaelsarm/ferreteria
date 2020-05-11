import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario: UsuarioModel = new UsuarioModel();

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';

  private docUrl = 'https://ferreteria-32f85.firebaseio.com';

  private apiKey = 'AIzaSyAeIcbapWy-Tg6OT7sQZR850BW5uGBdRZc';
  userToken: string;

  constructor(private http: HttpClient, private firebaseAuth: AngularFireAuth) {
    this.leerToken();
  }

  login(usuario: UsuarioModel) {
    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };

    return this.http.post(`${this.url}signInWithPassword?key=${this.apiKey}`, authData).pipe(
      map(resp => {
        this.guardarToken(resp['idToken']);
        return resp;
      })
    );
  }

  validarLogin() {
    let user = this.firebaseAuth.currentUser;
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  nuevoUsuario(usuario: UsuarioModel) {
    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };

    return this.http.post(`${this.url}signUp?key=${this.apiKey}`, authData).pipe(
      map(resp => {
        this.guardarToken(resp['idToken']);
        return resp;
      })
    );
  }

  guardarUsuario(usuario: UsuarioModel) {
    return this.http.post(`${this.docUrl}/Users.json`, usuario);
  }

  private guardarToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken)
  }

  leerToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
  }
}
