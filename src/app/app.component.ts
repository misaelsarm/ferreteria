import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  loggedIn = true;
  title = 'ferreteria';
  tipoUsuario: string;

  constructor(
    private auth: AuthService,
    private firestore: AngularFirestore,
    private firebaseAuth: AngularFireAuth
  ) {

  }
  ngOnInit(): void {
    this.firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        const document = this.firestore.collection('Users').doc(user.uid);
        document.get().subscribe((doc) => {
          this.tipoUsuario = doc.data().tipoUsuario;
          console.log(doc.data().tipoUsuario);
        });
      } else {
        console.log('not logged in');
      }
    });
  }
}
