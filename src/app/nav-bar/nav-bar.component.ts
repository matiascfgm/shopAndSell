import {Component, OnInit} from '@angular/core';
import {AuthService} from '../core/auth.service';
import {DefaultRoutes} from '../enums/default.routes';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  public readonly onLogin = '/' + DefaultRoutes.OnLogin;
  public menus: { name: string, key: string }[] = [];

  constructor(public authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.menus = [
      {name: 'Home', key: 'home'},
      {name: 'Shop', key: 'buy-product'},
      {name: 'Sell', key: 'new-product'},
      {name: 'Account', key: 'account'},
    ];
  }


  public onLogout() {
    this.authService.onLogout();
  }

  onMenuClick(key: string): void {
    this.router.navigate([key]);
  }

}
