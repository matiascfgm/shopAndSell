import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { FB } from '../../collections.enum';
import { Product } from '../../product.interface';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private afs: AngularFirestore) {
  }

  public saveProduct(product: Product): Promise<any> {
    console.log('add product service()');
    console.log('product to save', product);
    return this.afs.collection(FB.Products).add(product).then((result) => {
      const productId = result.id;
      // this.afs.collection(FB.Products).doc(productId).update({...product, id: productId});
      this.updateProduct({ ...product, id: productId });
    });
  }

  public toggleProductStatus(id: string, markAsSold: boolean) {
    console.log('togglePoductStatus()');
    this.getProductById(id).subscribe(product => {
      this.afs.collection('products').doc(id).update({ ...product, sold: markAsSold });
    });
  }

  public getProductById(id: string, sold: boolean = false): Observable<Product> {
    // TODO - find why this is crashing. en otras palabras, cuales son los Types correctos
    // @ts-ignore (ignora los errores de typescript)
    return this.afs.doc(`products/${id}`).valueChanges().pipe(take(1));
  }

  /**
   * TODO - need to implement
   */
  // public deleteProductById(id: string) {
  //   console.log('need to implement - deleteProductById()');
  // }

  /**
   * Updates a product in the FireBase database
   * @param product - The product being updated.
   */
  public updateProduct(product: Product): Promise<any> {
    return this.afs.collection(FB.Products).doc(product.id).update(product);
  }

  public getAllProducts(sold: boolean = false): Observable<Product[]> {
    const products$: AngularFirestoreCollection<any>
      = this.afs.collection('products', ref => ref.where('sold', '==', sold));

    return products$.valueChanges();
  }

  public getAllProductsByUserId(id: string, sold: boolean = false): Observable<Product[]> {
    const products$: AngularFirestoreCollection<any> = this.afs.collection(FB.Products, (ref) => {
      // if we send 'sold' as true/false, it filters. if we send 'sold' as null, returns sold AND unsold products.
      if (sold !== null) {
        return ref
          .where('uid', '==', id)
          .where('sold', '==', sold);
      }

      return ref.where('uid', '==', id);
    });

    return products$.valueChanges();
  }
}
