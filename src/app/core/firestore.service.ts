import {Injectable, ChangeDetectorRef} from '@angular/core';
import {Product} from '../product.interface';
import {of, Observable, BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  public products$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(private db: AngularFirestore) {
    this.getAllNewProducts().subscribe((newProducts) => {
      this.products$.next(newProducts);
    });
  }

  public addProductToFirestore(product: Product) {
    console.log('add product service');
    product.productID =  this.db.createId();
    return this.db.collection('newProducts').add(product);
  }

  public getProductsByUserId(uid: string) {
    return this.db.collection<Product>('newProducts').doc(uid).snapshotChanges().pipe(
      map(action => {
        return {id: action.payload.id, ...action.payload.data()} as Product;
      }));
  }

  public getAllNewProducts(): Observable<Product[]> {
    return this.db.collection<Product>('newProducts').snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          return {id: action.payload.doc.id, ...action.payload.doc.data()};
        });
      }));
  }
}
