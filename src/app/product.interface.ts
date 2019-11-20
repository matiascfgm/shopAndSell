export interface Product {
    uid: string;
    productID: string;
    title: string;
    description: string;
    brand: string;
    price: number;
    condition: {
        used: boolean, // true used false new
        conditionDescription: string, // null if condition.used = false
    };
}
