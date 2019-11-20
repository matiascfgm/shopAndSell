import { Injectable } from '@angular/core';
import { Product } from './product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsListService {
  public avaliableProducts: Product[];
}
