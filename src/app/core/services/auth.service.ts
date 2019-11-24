import {Router} from '@angular/router';
import {Injectable, NgZone} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, DocumentSnapshot} from '@angular/fire/firestore';

import * as firebase from 'firebase/app';

import {Observable} from 'rxjs';
import {take, map} from 'rxjs/operators';

import {User} from '../../interfaces/user';
import { FB } from '../../collections.enum';
import {DefaultRoutes} from '../../enums/default.routes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userData: User = JSON.parse(localStorage.getItem('user')) || {} as User; // Save logged in user data

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {

    /**
     * If the user logs out, delete the "localStorage" (which is a $_SESSION).
     */
    this.afAuth.authState.subscribe(firebaseUser => {
      if (!firebaseUser) {
        localStorage.setItem('user', null);
      }
    });


    // get the first option that's not FALSY.
    // const isVerified = user.emailVerified || user.isAdmin || this.userData.signedUpWithGoodle;
    // const displayName = user.name || user.username || user.email || 'anomymous user';

  }

  // Returns true when user is looged in and email is verified
  public get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }

  public signInWithGoogle() {
    return this.authLogin(new firebase.auth.GoogleAuthProvider());
  }

  /**
   * Auth logic for all the social sign-in
   */
  public authLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate([DefaultRoutes.OnLogin]);
        });

        this.persistUserData(
          this.createUserDataFromFirebase(result.user)
        );
        this.saveUserData(this.userData);

      }).catch(this.showError);
  }


  // sign in with user password
  public signInWithUserPassword(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {

        // we can get the user by using the UID or by using the EMAIL. UID is always safer
        this.getUserByUid(result.user.uid).subscribe((doc) => {
          // here we get the WHOLE information of the user, as stored in our database.

          this.saveUserData(doc.data() as User);

          this.ngZone.run(() => {
            this.router.navigate([DefaultRoutes.OnLogin]);
          });

        });

      }).catch(this.showError);
  }

  // Sign up with email/password
  public signUp(signupData: { email: string; name: string; userName: string; password: string; }) {

    // We sign up. If the user is duplicated, we receive an Error
    this.afAuth.auth.createUserWithEmailAndPassword(signupData.email, signupData.password)
      .then((result) => {
        // we just signed a NEW USER up.
        console.log('You have been successfully registered!', result.user.uid);

        this.ngZone.run(() => {
          this.router.navigate([DefaultRoutes.OnSignup]);
        });

        // It's a new user, so we create the User object and persist it in our database.
        const user: User = {
          uid: result.user.uid,
          name: signupData.name,
          userName: signupData.userName,
          email: signupData.email,
          emailVerified: false,
        };
        this.persistUserData(user);

        this.saveUserData(user);

      }).catch(this.showError);
  }

  /**
   * Setting up user data when sign in with username/password,
   * sign up with username/password and sign in with social auth
   * provider in Firestore database using AngularFirestore + AngularFirestoreDocument service
   */
  public persistUserData(user: User) {
    // save in FireBase
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    return userRef.set(user, {
      merge: true
    });
  }

  /**
   * Given an email, searches for the user in the database.
   * @param email
   * @unused - we are not using this function.
   */
  public getUserByEmail(email: string): Observable<User> {

    const userRef: AngularFirestoreCollection<any> = this.afs.collection(FB.Users, ref => ref.where('email' as keyof User, '==', email));

    return userRef.valueChanges().pipe(
      take(1), // unsubscribe after first request is completed!

      // map: the "subscribe(...)" returns what the 'map' function returns.
      map((userList) => userList.length ? userList[0] : null) // return first user (if there are results) or null (if there are no results)
    );
  }

  /**
   * Given an uid, searches for the user in the database.
   * @param uid
   * @unused - we are not using this function.
   */
  public getUserByUid(uid: string): Observable<DocumentSnapshot<User>> {

    // TODO - find why this is crashing. en otras palabras, cuales son los Types correctos
    // @ts-ignore (ignora los errores de typescript)
    return this.afs.doc(`users/${uid}`).get();
  }

  public onLogout() {
    return this.afAuth.auth.signOut().then(() => {
      this.router.navigate([DefaultRoutes.OnLogOut]);
    });
  }

  private createUserDataFromFirebase(firebaseUser: firebase.User): User {
    return this.userData = {
      uid: firebaseUser.uid,
      userName: null,
      email: firebaseUser.email,
      emailVerified: firebaseUser.emailVerified,
      name: firebaseUser.displayName
    } as User;
  }

  // tenemos que escribirlo con 'arrow notation' (o 'arrow function') porque metimos la funcion "implicita" en el "catch"
  private showError = (error) => {
    console.error('error', error);

    window.alert(error.error);

    // console.log(this); // ya que es 'arrow notation', 'this' hace referencia a AuthService (y no a this.afAuth.auth, lo cual seria raro)
  };

  /**
   * "T" es un "parametro", es decir, un tipo de INTERFACE. Se puede definir para cada funcion.
   * @example Si pido getDocResponse<User>, devuelve un User. Si pido getDocResponse<Animal> ... etc.
   * @param response
   */
  private getDocResponse<T>(response): T {
    return response.map(a => {
      const data = a.payload.doc.data() as T;
      // @ts-ignore
      data.id = a.payload.doc.id;
      return data as T;
    });

  }

  /**
   * Unify saving data in the Frontend, to make sure we don't forget anything
   */
  private saveUserData(user: User) {
    // save in Property of AuthService
    this.userData = user;

    // save in local storage so it's still available when we reload, open new tab, come next day...
    localStorage.setItem('user', JSON.stringify(user));
  }
}
