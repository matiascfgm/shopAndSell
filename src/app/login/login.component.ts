import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormControl, Validators, MinLengthValidator } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public signUpForm: FormGroup;
  
  constructor(private authService: AuthService, private afAuth: AngularFireAuth) {
    this.afAuth.auth.signOut();
    
    /** login form */
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    /** sign up form */
    this.signUpForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.minLength(8))
    })
   }

  ngOnInit() {
  }

  public signInWithGoogle() {
    this.authService.signInWithGoogle();
  }

  public signInWithUserPassword() {
    const value = this.loginForm.value
    this.authService.signInWithUserPassword(value.email ,value.password);
  }

  public signUpWithEmail() {
    const value = this.signUpForm.value
    this.authService.SignUp(value.email, value.password);
  }

}
