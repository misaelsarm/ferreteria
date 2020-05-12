import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth/';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-user-nav-bar',
  templateUrl: './user-nav-bar.component.html',
  styleUrls: ['./user-nav-bar.component.scss']
})
export class UserNavBarComponent implements OnInit {

  currentUser = '';
  verLista: boolean;
  verCuadricula: boolean;

  constructor(private auth: AngularFireAuth, private afs: AngularFirestore) {
    const user = this.auth.user;
    user.subscribe((resp) => {
      if (resp) {
        const name = this.afs.collection('Users').doc(resp.uid);
        name.get().toPromise().then((doc) => {
          const data = doc.data();
          this.currentUser = data.nombreCompleto;
        });
      }
    })
  }

  ngOnInit(): void {
  }

  mostrarLista() {
    this.verLista = true;
    this.verCuadricula = false;
    console.log("Vista de lista")
  }

  mostrarCuadricula() {
    this.verLista = false;
    this.verCuadricula = true;
    console.log("Vista de cuadricula")
  }

}
