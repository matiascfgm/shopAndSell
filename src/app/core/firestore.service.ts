import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import { FB } from '../collections.enum';
import {Product} from '../product.interface';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private afs: AngularFirestore) {
  }

  public saveProduct(product: Product): void {
    console.log('add product service()');
    console.log('product to save', product);
    this.afs.collection(FB.Products).add(product);
  }

  public markProductAsSold(id: string) {
    console.log('productSold()');
    this.getProductById(id).subscribe(product => {
      this.afs.collection('products').doc(id).update({...product, sold: true});
    });
  }

  public getProductById(id: string): Observable<Product> {
    // TODO - find why this is crashing. en otras palabras, cuales son los Types correctos
    // @ts-ignore (ignora los errores de typescript)
    return this.afs.doc(`products/${id}`).get();
  }

  /**
   * TODO - need to implement
   */
  // public deleteProductById(id: string) {
  //   console.log('need to implement - deleteProductById()');
  // }

  public getAllProducts(sold: boolean = false): Observable<Product[]> {
    const products$: AngularFirestoreCollection<any> = this.afs.collection('products', ref => ref.where('sold', '==', sold));

    return products$.valueChanges().pipe(
      // take(1), // unsubscribe after first request is completed!
    );
  }

  public getAllProductsByUserId(id: string, sold: boolean = false): Observable<any> {

    const products$: AngularFirestoreCollection<any> = this.afs.collection('products',  (ref) => {
      ref.where('uid', '==', id);

      // if we send 'sold' as true/false, it filters. if we send 'sold' as null, returns sold AND unsold products.
      if (sold !== null) {
        ref.where('sold', '==', sold);
      }

      return ref;
    });

    return products$.valueChanges().pipe(
      // take(1), // unsubscribe after first request is completed!
      map((results) => {
        console.log('results?', results);
        return results;
      })
    );
  }
}
