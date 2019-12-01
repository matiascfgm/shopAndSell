export interface Product {
  uid: string;
  id: string;
  title: string;
  description: string;
  brand: string;
  price: number;
  condition: ProductCondition;
  sold: boolean;
  date: { seconds: number };
  soldDate: { seconds: number };
  buyerId: string;
  image: {
    url: string;
    delete: string;
  };
}

interface ProductCondition {
  used: boolean; // true used false new
  description: string; // null if condition.used = false
}
