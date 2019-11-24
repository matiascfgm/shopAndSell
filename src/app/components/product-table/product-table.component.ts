import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CurrentUser } from '../../core/services/current-user.service';
import { FirestoreService } from '../../core/services/firestore.service';
import { Product } from '../../product.interface';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnInit {

  @Input()
  public columns = ['actions', 'title', 'description', 'brand', 'price', 'used', 'conditionDescription'];

  /**
   * An observable that we subscribe to, in order to get the products
   */
  @Input()
  public products$: Observable<Product[]>;

  /**
   * The array of products for the table.
   */
  public products: Product[] = null;

  /**
   * If set to true, it will mark the 'sold' columns with a red background.
   */
  @Input()
  public coloring: boolean = false;

  /**
   * A message to show if there are no elements in the table.
   */
  @Input()
  public noProductsMessage: string = 'No Products';

  /**
   * The ID of the current user.
   */
  public userID = CurrentUser.user.uid;

  /**
   * Keep the Observable {@see products$} active until the component is destroyed
   */
  private destroy$ = new Subject<boolean>();

  public constructor(private firestoreService: FirestoreService) { }

  public onMarkAsSold(id: string) {
    this.firestoreService.toggleProductStatus(id, true);
  }

  public sellAgain(id: string) {
    this.firestoreService.toggleProductStatus(id, false);
  }
  ngOnInit() {
    // subscribe to the observable as soon as the Component is mounted.
    this.products$.pipe(
      takeUntil(this.destroy$) // stop the Subscription when the component is destroyed
    ).subscribe((products) => this.products = products);
  }

}
