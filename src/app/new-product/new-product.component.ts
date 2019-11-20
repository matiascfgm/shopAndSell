import {Component, OnInit, ChangeDetectorRef, Directive, Input, ViewChild} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators, NgControl} from '@angular/forms';
import {ProductsListService} from '../products-list.service';
import {Product} from '../product.interface';
import {Router} from '@angular/router';
import {AuthService, CurrentUser} from '../core/auth.service';
import {FirestoreService} from '../core/firestore.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
})
export class NewProductComponent implements OnInit {

  public newProductForm: FormGroup;
  public currentUserId = CurrentUser.user.uid;
  constructor(
    public productService: ProductsListService,
    private router: Router, private cdRef: ChangeDetectorRef,
    private authService: AuthService,
    private firestoreService: FirestoreService) {

    this.newProductForm = new FormGroup({
      uid: new FormControl(CurrentUser.user.uid),
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

  ngOnInit() {  }

  createProduct() {
    console.log('createProduct()');
    const product: Product = this.newProductForm.value;
    this.firestoreService.addProductToFirestore(product);
    this.router.navigate(['/']);
  }

  // new product condition by user ( used or new )
  usedProductToggle(usedControl: any) {
    const control: FormControl = this.newProductForm.get(['condition', 'conditionDescription']) as FormControl;
    usedControl.value ? control.enable() : control.disable();
  }
}
