import {Component, OnInit} from '@angular/core';
import {ProductsListService} from '../products-list.service';
import {Router} from '@angular/router';
import {Product} from '../product.interface';
import {FirestoreService} from '../core/firestore.service';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.scss']
})
export class BuyProductComponent implements OnInit {

  public product: Product;

  constructor(private firestoreService: FirestoreService, private router: Router) {
  }

  ngOnInit() {
  }
  public markProductAsSold(id: string) {
    this.firestoreService.markProductAsSold(id);
  }
}
