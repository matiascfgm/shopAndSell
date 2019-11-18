import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { DefaultRoutes } from '../enums/default.routes';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  public readonly onLogin = '/' + DefaultRoutes.OnLogin;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  public logout() {
    this.authService.logout();
  }
}
