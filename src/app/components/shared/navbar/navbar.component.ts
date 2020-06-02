import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  tipoUsuario: string;
  usuarioActual: string;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.currentUser().subscribe((user) => {
      console.log(user);
      if (user) {
        const document = this.firestore.collection('Users').doc(user.uid);
        document.get().subscribe((doc) => {
          this.tipoUsuario = doc.data().tipoUsuario;
          this.usuarioActual = doc.data().nombreCompleto;
        });
      }
    });
  }

  logOut() {
    this.firebaseAuth.signOut().then(() => {
      window.location.href = '#/login';
    });
  }
}
