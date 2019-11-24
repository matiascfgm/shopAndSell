import {Component, OnInit} from '@angular/core';
import {ProductsListService} from '../../products-list.service';
import {Router} from '@angular/router';
import {Product} from '../../product.interface';
import {FirestoreService} from '../../core/services/firestore.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.scss']
})
export class BuyProductComponent implements OnInit {

  public products$ = new Subject<Product[]>();

  constructor(private firestoreService: FirestoreService, private router: Router) {
  }

  ngOnInit() {
    this.firestoreService.getAllProducts().subscribe(products => this.products$.next(products));
  }
}
