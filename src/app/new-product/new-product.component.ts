import { Component, OnInit, ChangeDetectorRef, Directive, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgControl } from '@angular/forms';
import { ProductsListService } from '../products-list.service';
import { Product } from '../product.interface';
import { Router } from "@angular/router";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
})
export class NewProductComponent implements OnInit {

  // public newId: number = this.productService.avaliableProducts.length + 1;
  public newProductForm: FormGroup;
  constructor(public productService: ProductsListService, private router: Router, private cdRef: ChangeDetectorRef) {
    this.newProductForm = new FormGroup({
      title: new FormControl('', [
        Validators.minLength(2),
      ]),
      description: new FormControl('', [
        Validators.minLength(2),
      ]),
      brand: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      condition: new FormGroup({
        used: new FormControl(false),
        conditionDescription: new FormControl({value: '', disabled: true}, Validators.required),
      }),
    });
  }
  ngOnInit() { }

  createProduct() {
    console.log('createProduct()');
    const product: Product = this.newProductForm.value;
    this.productService.avaliableProducts.push(product);
    this.router.navigate(['/']);
  }

  // new product condition by user ( used or new )
  usedProductToggle(usedControl: any) {
    const control: FormControl = this.newProductForm.get(['condition', 'conditionDescription']) as FormControl;
    usedControl.value ? control.enable() : control.disable();
  }
}
