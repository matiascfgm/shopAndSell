import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { NewProductComponent } from './pages/new-product/new-product.component';
import { BuyProductComponent } from './pages/buy-product/buy-product.component';
import { AccountComponent } from './pages/account/account.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthenticationGuard } from './core/guards/auth.guard';


const routes: Routes = [
  {
    path: '', canActivate: [AuthenticationGuard], children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' }, // empty path redirects to /home declared below
      { path: 'home', component: HomeComponent },
      { path: 'new-product', component: NewProductComponent },
      { path: 'buy-product', component: BuyProductComponent },
      { path: 'account', component: AccountComponent },
    ]
  },
  { path: 'login', component: LoginComponent}, // resolve: [LoginResolver]   before loading LoginComponent will resolve LoginResolver
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
