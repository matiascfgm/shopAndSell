import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { DefaultRoutes } from '../enums/default.routes';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: User = JSON.parse(localStorage.getItem('user')); // Save logged in user data

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      console.log('subcribed to auth', user);
      if (user) {
        this.userData.uid = user.uid;
        this.userData.email = user.email;
        this.userData.userName = this.splitFullName(user.displayName, 0);
        this.userData.lastName = this.splitFullName(user.displayName, 1);
        this.userData.emailVerified = user.emailVerified;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', null);
      }
    });

  }

  // Returns true when user is looged in and email is verified
  public get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }

  public signInWithGoogle() {
    return this.authLogin(new firebase.auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  authLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate([DefaultRoutes.OnLogin]);
        })
        this.setUserData(result.user);
      }).catch((error) => {
        window.alert(error)
      })
  }

  // sign in with user password
  public signInWithUserPassword(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate([DefaultRoutes.OnLogin]);
        });
        this.setUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Sign up with email/password
  SignUp(newUserData: User, newUserPassword: string) {
    this.addEmailUserToFirebase(newUserData);
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${newUserData.uid}`);
    return this.afAuth.auth.createUserWithEmailAndPassword(newUserData.email, newUserPassword)
      .then((result) => {
        console.log(result)
        window.alert("You have been successfully registered!");
        this.router.navigate([DefaultRoutes.OnLogin]);
        userRef.set(newUserData, {
          merge: true
        })
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  /**
   * Setting up user data when sign in with username/password, 
   * sign up with username/password and sign in with social auth  
   * provider in Firestore database using AngularFirestore + AngularFirestoreDocument service
  */
  public setUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      userName: this.splitFullName(user.displayName, 0),
      lastName: this.splitFullName(user.displayName, 1),
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }
  public splitFullName(displayName: string, position: number) {
    return displayName.split(' ')[position];
  }

  public logout() {
    return this.afAuth.auth.signOut().then(() => {
      this.router.navigate([DefaultRoutes.OnLogOut]);
    })
  }

  public addEmailUserToFirebase(newUserData: User) {
    console.log('add to firebase 2')
    var ref = this.afs.collection("users");
    this.afs.collection('users').add(newUserData);
    console.log('end')
  }
}
