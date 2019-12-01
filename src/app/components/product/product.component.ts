import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { CurrentUser } from '../../core/services/current-user.service';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import {Product} from '../../interfaces/product.interface';
import {DefaultRoutes} from '../../enums/default.routes';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public product: Product;
  public userID = CurrentUser.user.uid;
  public id = this.route.snapshot.paramMap.get('id');

  public get canBuy(): boolean {
    return !this.product.sold && this.product.uid !== this.userID;
  }
  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.firestoreService.getProductById(this.id).subscribe(product => this.product = product);
  }

  public buyProduct() {
    this.firestoreService.buyProduct(this.id, this.userID);
    console.log(this.router)
    this.router.navigate([DefaultRoutes.OnBuy])
  }

}
