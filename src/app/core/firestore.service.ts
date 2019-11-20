import {Injectable, ChangeDetectorRef} from '@angular/core';
import {Product} from '../product.interface';
import {of, Observable, BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {AngularFirestore, DocumentSnapshot} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  public products$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  public get products(): Product[] {
    return this.products$.getValue();
  }

  constructor(private db: AngularFirestore) {
    this.getAllNewProducts().subscribe((newProducts) => {
      this.products$.next(newProducts);
    });
  }

  public addProductToFirestore(product: Product, collectionName) {
    console.log('add product service');
    return this.db.collection(collectionName).add(product);
  }

  public getProductById(id: string): Product { // esto es MUUUY cutre pero no se me ocurre otra manera
    const shortProduct = this.products$.getValue();
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < shortProduct.length; i++) {
      if (shortProduct[i].id === id) {
        return shortProduct[i];
      }
    }
  }

  public markProductAsSold(id: string) {
    console.log('productSold()');
    this.deleteProductFromDb(id);
  }

  public deleteProductFromDb(id: string) {
    console.log('removeProductFromDb()');
    const productSold = this.getProductById(id);
    this.addProductToFirestore(productSold, 'soldProducts');
    this.db.collection('newProducts').doc(productSold.id).delete();
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
