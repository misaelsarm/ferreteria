import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FerreteriaService } from 'src/app/services/ferreteria.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  productos = [];

  constructor(private auth: AuthService, private ferreteriaService: FerreteriaService, private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.toastr.success('');
  }

}
