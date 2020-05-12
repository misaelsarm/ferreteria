import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent  {
  loggedIn = true;
  title = 'ferreteria';

  constructor(private auth: AuthService) {
    this.auth.usuarioActual();
    /* setTimeout(() => {
      console.log(this.auth.logged);
      if (this.auth.logged) {
        this.loggedIn = this.auth.logged;
      } else {
        this.loggedIn = false;
      }

    }, 1000); */
  }

}
