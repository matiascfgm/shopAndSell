import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewProductComponent } from './new-product/new-product.component';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MaterialModule } from './style/material.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { TextFieldModule } from '@angular/cdk/text-field';
import { HomeComponent } from './home/home.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { AccountComponent } from './account/account.component';
import { MatChipsModule } from '@angular/material/chips';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  declarations: [
    AppComponent,
    NewProductComponent,
    BuyProductComponent,
    NavBarComponent,
    HomeComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    TextFieldModule,
    MatTabsModule,
    MatListModule,
    MatChipsModule,
    MatMenuModule,
    MatIconModule,
    MatStepperModule,
    MatCardModule,
    MatTooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
