import { Component, OnInit } from '@angular/core';
import { ProductsListService } from '../products-list.service';
import { Router } from '@angular/router';
import { Product } from '../product.interface';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.scss']
})
export class BuyProductComponent implements OnInit {

  constructor(public productService: ProductsListService, private router: Router) { }

  ngOnInit() {
  }

}
