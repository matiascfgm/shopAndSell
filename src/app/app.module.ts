import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationGuard } from './core/guards/auth.guard';
import { NewProductComponent } from './pages/new-product/new-product.component';
import { BuyProductComponent } from './pages/buy-product/buy-product.component';
import { NavBarComponent } from './core/pages/nav-bar/nav-bar.component';
import { LoginComponent } from './pages/login/login.component';


import { MaterialModule } from './style/material.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { TextFieldModule } from '@angular/cdk/text-field';
import { HomeComponent } from './pages/home/home.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { AccountComponent } from './pages/account/account.component';
import { MatChipsModule } from '@angular/material/chips';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTableModule} from '@angular/material/table';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


import { LoginResolver } from './pages/login/login.resolver';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { SeeProductComponent } from './pages/see-product/see-product.component';
import {ProductComponent} from './components/product/product.component';


@NgModule({
  declarations: [
    AppComponent,
    NewProductComponent,
    BuyProductComponent,
    NavBarComponent,
    HomeComponent,
    AccountComponent,
    LoginComponent,
    ProductTableComponent,
    SeeProductComponent,
    ProductComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
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
    MatTableModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    AuthenticationGuard,
    LoginResolver,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
