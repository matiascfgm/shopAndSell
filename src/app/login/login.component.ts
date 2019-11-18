import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  
  constructor(private authService: AuthService, private afAuth: AngularFireAuth) {
    this.afAuth.auth.signOut();
    
    this.loginForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
   }

  ngOnInit() {
  }

  public signInWithGoogle() {
    this.authService.signInWithGoogle();
  }

  public signInWithUserPassword() {
    const value = this.loginForm.value
    this.authService.signInWithUserPassword(value.userName ,value.password);
  }

}
