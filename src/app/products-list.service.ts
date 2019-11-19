import { Injectable } from '@angular/core';
import { Product } from './product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsListService {
  public avaliableProducts: Product[] = [
    {
      uid: 'pruebadeid',
      title: 'prueba',
      description: 'prueba description',
      price: 4,
      brand: 'eg',
      condition: {
        used: true,
        conditionDescription: 'a lot',
      },
    }
  ];
}
