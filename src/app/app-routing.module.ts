import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NewProductComponent } from './new-product/new-product.component';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { AccountComponent } from './account/account.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // empty path redirects to /home declared below
  { path: 'home', component: HomeComponent },
  { path: 'new-product', component: NewProductComponent },
  { path: 'buy-product', component: BuyProductComponent },
  { path: 'account', component: AccountComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
