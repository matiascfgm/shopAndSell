import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Observable } from 'rxjs';
import { Product } from 'src/app/interfaces/product.interface';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { CurrentUser } from 'src/app/core/services/current-user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  public userID = CurrentUser.user.uid;
  public currentUserId = CurrentUser.user.uid;
  public userPurchasedProducts$: Observable<Product[]> = this.firestoreService.getUserPurchasedProducts(
    this.currentUserId);

  constructor(private authService: AuthService, private firestoreService: FirestoreService) { }

  ngOnInit() {
  }

}
