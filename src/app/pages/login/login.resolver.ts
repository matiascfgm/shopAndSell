import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class LoginResolver implements Resolve<any> {
    constructor(private afAuth: AngularFireAuth) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        return this.afAuth.auth.signOut();
    }
}
