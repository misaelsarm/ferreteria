import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario: UsuarioModel = new UsuarioModel();

  tipoUsuario: 'string';

  constructor(private firebaseAuth: AngularFireAuth, private firestore: AngularFirestore) {
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
    return cred;
  }
}


