import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from './auth.service';
import { DefaultRoutes } from '../enums/default.routes';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  /**
   * Check if the user is authorized to access the route
   *
   * @param route
   * @param state
   * @returns {boolean}
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn) {
      return true;
    }
    this.router.navigate([DefaultRoutes.OnUnauthorized], { queryParams: { returnUrl: state.url } });
    return;
  }
}