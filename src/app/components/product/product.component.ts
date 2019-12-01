import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrentUser } from '../../core/services/current-user.service';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import {Product} from '../../product.interface';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public product: Product;
  public userID = CurrentUser.user.uid;
  public id = this.route.snapshot.paramMap.get('id');

  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.firestoreService.getProductById(this.id).subscribe(product => this.product = product);
  }

  public buyProduct() {
    this.firestoreService.buyProduct(this.id, this.userID);
  }

}
