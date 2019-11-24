import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

import { Subject } from 'rxjs';

import {Product} from '../product.interface';
import { CurrentUser } from '../current-user.service';
import {FirestoreService} from '../core/firestore.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
})
export class NewProductComponent implements OnInit {

  public newProductForm: FormGroup;
  public currentUserId = CurrentUser.user.uid;

  public products$ = new Subject<Product[]>();

  constructor(
    private router: Router,
    private firestoreService: FirestoreService
  ) {

    this.firestoreService.getAllProductsByUserId(this.currentUserId).subscribe((products) => this.products$.next(products))

    this.products$.subscribe(hello => console.log('hello', hello));

    this.newProductForm = new FormGroup({
      uid: new FormControl(CurrentUser.user.uid),
      title: new FormControl('', [
        Validators.minLength(2),
        Validators.required,
      ]),
      description: new FormControl('', [
        Validators.minLength(2),
        Validators.required,
      ]),
      brand: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      condition: new FormGroup({
        used: new FormControl(false),
        conditionDescription: new FormControl({value: '', disabled: true}, Validators.required),
      }),
      sold: new FormControl(false)
    });
  }
  get title() { return this.newProductForm.get('title'); }
  get description() { return this.newProductForm.get('description'); }
  get brand() { return this.newProductForm.get('brand'); }
  get price() { return this.newProductForm.get('price'); }
  get conditionDescription() { return this.newProductForm.get('condition.conditionDescription'); }
  ngOnInit() {  }

  createProduct() {
    console.log('createProduct()');
    const product: Product = this.newProductForm.value;
    this.firestoreService.saveProduct(product);
    this.router.navigate(['/']);
  }

  // new product condition by user ( used or new )
  usedProductToggle(usedControl: any) {
    const control: FormControl = this.newProductForm.get(['condition', 'conditionDescription']) as FormControl;
    usedControl.value ? control.enable() : control.disable();
  }

}
