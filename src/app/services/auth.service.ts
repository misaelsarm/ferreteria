import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario: UsuarioModel = new UsuarioModel();

  logged: boolean;

  uid: string;

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';

  private docUrl = 'https://ferreteria-32f85.firebaseio.com';

  private apiKey = 'AIzaSyAeIcbapWy-Tg6OT7sQZR850BW5uGBdRZc';
  userToken: string;

  constructor(private http: HttpClient, private firebaseAuth: AngularFireAuth) {
  }

  async login(usuario: UsuarioModel) {
    const authData = {
      email: usuario.email,
      password: usuario.password,
    };
    const cred = await this.firebaseAuth.signInWithEmailAndPassword(authData.email, authData.password);
    return cred;
  }

  async nuevoUsuario(usuario: UsuarioModel) {
    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };

    const cred = await this.firebaseAuth.createUserWithEmailAndPassword(authData.email, authData.password);
    //console.log(cred);
    return cred;

    /* return this.http.post(`${this.url}signUp?key=${this.apiKey}`, authData).pipe(
      map(resp => {
        this.guardarToken(resp['idToken']);
        return resp;
      })
    ); */
  }

  /* private guardarToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken)
  }

  leerToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
  } */

  usuarioActual() {
    const user = this.firebaseAuth.user.subscribe((resp) => {
      //console.log(resp);
      if (resp) {
        this.logged = true;
        this.uid = resp.uid;
        //console.log(this.uid)
      } else {
        this.logged = false;
      }
    })
  }

}


