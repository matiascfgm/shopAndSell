import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { Product } from '../../interfaces/product.interface';
import { CurrentUser } from '../../core/services/current-user.service';
import { FirestoreService } from '../../core/services/firestore.service';
import {ImgurApiService} from '../../core/services/imgur.service';
import {Config} from '../../core/config';
import {GenerateDataService} from '../../generate-data/generate-data.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
})
export class NewProductComponent implements OnInit {

  public newProductForm: FormGroup;
  public currentUserId = CurrentUser.user.uid;

  public sellingProducts$: Observable<Product[]> = this.firestoreService.getAllProductsByUserId(
    this.currentUserId, false);
  public soldProducts$: Observable<Product[]> = this.firestoreService.getAllProductsByUserId(this.currentUserId, true);

  public readonly message = {
    notSelling: 'You\'re not selling any products',
    notSold: 'You don\'t have any sold products'
  };

  private productImage: File = null;

  public constructor(
    private router: Router,
    private firestoreService: FirestoreService,
    private imgurService: ImgurApiService,

    private gds: GenerateDataService // ONLY FOR DEVELOPMENT!!!
  ) {

    // ONLY FOR DEVELOPMENT!!!
    if (window.location.href.match(/\?generate=1/)) { // new-product?generate=1
      this.gds.firestoreService = this.firestoreService;
      this.gds.generate();
    }

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
        description: new FormControl({value: '', disabled: true}, Validators.required),
      }),
      sold: new FormControl(false),
      date: new FormControl(new Date()),
      image: new FormControl({url: Config.noProductImage, deletehash: null})
    });

  }
  get title() { return this.newProductForm.get('title'); }
  get description() { return this.newProductForm.get('description'); }
  get brand() { return this.newProductForm.get('brand'); }
  get price() { return this.newProductForm.get('price'); }
  get conditionDescription() { return this.newProductForm.get('condition.description'); }

  public ngOnInit() {  }

  public onImageSelect(image: File) {
    this.productImage = image;
  }

  public saveForm() {
    const product: Product = this.newProductForm.value;
    if (this.productImage) {
      console.log('image', this.productImage);
      this.imgurService.upload(this.productImage).subscribe((imgur: {data: {link: string, deletehash: string}}) => {
        console.log(imgur);
        product.image = {url: imgur.data.link, delete: imgur.data.deletehash};
        this.createProduct(product);
      });
    } else {
      this.createProduct(product);
    }
  }

  public createProduct(product: Product) {
    console.log('createProduct()');
    this.firestoreService.saveProduct(product);
    this.router.navigate(['/']);
  }

  // new product condition by user ( used or new )
  usedProductToggle(usedControl: any) {
    const control: FormControl = this.newProductForm.get(['condition', 'description']) as FormControl;
    usedControl.value ? control.enable() : control.disable();
  }

}
