import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormControl, Validators, MinLengthValidator } from '@angular/forms';
import { User } from '../interfaces/user';

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
      password: new FormControl('', Validators.minLength(8)),
      userName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      emailVerified: new FormControl(false),
      uid: new FormControl('pruebaID'),
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
    let value = this.signUpForm.value;
    /*const newUserData: User = {
      uid: value.uid,
      email: value.email,
      userName: value.name,
      lastName: value.lastName,
      emailVerified: value.emailVerified
    };*/
    const newUserData: User = {
      uid: 'idexample',
      email: 'emailexample@gmail.com',
      userName: 'userNameExdample',
      lastName: 'lastnameExample',
      emailVerified: false
    };
    this.authService.SignUp(newUserData, 'value.password');
  }

  public addToFirebase(){
    console.log('add to firebase 1')
    const newUserData: User = {
      uid: 'idexample',
      email: 'emailexample',
      userName: 'userNameExdample',
      lastName: 'lastnameExample',
      emailVerified: false
    };
    // this.authService.addToFirebase(newUserData);
  }

}
