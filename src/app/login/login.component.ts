import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  public signInWithGoogle() {
    this.authService.signInWithGoogle();
  }

  public signInWithUserPassword() {
    this.authService.signInWithUserPassword('matiascfgm@gmail.com','Qwerty1');
  }

}
