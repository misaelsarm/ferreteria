import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() loggedIn;

  constructor(private auth: AuthService, private route: Router, private firebaseAuth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  logOut() {
    this.firebaseAuth.signOut();
    this.route.navigateByUrl('login');

  }

}
