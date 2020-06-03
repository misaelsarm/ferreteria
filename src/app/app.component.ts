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
  title = 'ferreteria';
  tipoUsuario: string;

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {

  }
  ngOnInit(): void {
    this.authService.currentUser().subscribe((user) => {
      if (user) {
        const document = this.firestore.collection('Users').doc(user.uid);
        document.get().subscribe((doc) => {
          this.tipoUsuario = doc.data().tipoUsuario;
        });
      }
    });
  }
}
