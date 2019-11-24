import { Component } from '@angular/core';
import { FirestoreService } from '../../core/services/firestore.service';


@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.scss']
})
export class BuyProductComponent {

  constructor(private firestoreService: FirestoreService) {
  }
}
