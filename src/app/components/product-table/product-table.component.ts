import {Component, Input, OnInit} from '@angular/core';
import { Subject } from 'rxjs';
import {CurrentUser} from '../../core/services/current-user.service';
import {FirestoreService} from '../../core/services/firestore.service';
import {Product} from '../../product.interface';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnInit {

  @Input()
  public columns = ['actions', 'title', 'description', 'brand', 'price', 'used', 'conditionDescription'];

  @Input()
  public products$ = new Subject<Product[]>();

  /**
   * If set to true, it will mark the 'sold' columns with a red background.
   */
  @Input()
  public coloring: boolean = false;

  public userID = CurrentUser.user.uid;

  constructor(private firestoreService: FirestoreService) { }

  public onMarkAsSold(id: string) {
    this.firestoreService.toggleProductStatus(id, true);
  }

  public sellAgain(id: string) {
    this.firestoreService.toggleProductStatus(id, false);
  }
  ngOnInit() {
  }

}
