import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ProductsListService } from '../products-list.service';
import { Product } from '../product.interface';
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  // public newId: number = this.productService.avaliableProducts.length + 1;
  public newProductForm: FormGroup;
  constructor(public productService: ProductsListService, private router: Router, private cdRef:ChangeDetectorRef) {
    this.newProductForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      price: new FormControl(''),
      brand: new FormControl(''),
      condition: new FormGroup({
        used: new FormControl(''),
        conditionDescription: new FormControl(''),
      }),
    })
   }
  ngOnInit() {
  }

  createProduct (){
    console.log('createProduct()');
    const product:Product = this.newProductForm.value;
    this.productService.avaliableProducts.push(product);   
    this.router.navigate(['/']);
  }

  // new product condition by user ( used or new )
  usedProductFunction(condition) {
    this.newProductForm.value.condition.used = (condition.value =="true"); // convert to boolean
    console.log(this.newProductForm.value.condition.used)
 }
}
