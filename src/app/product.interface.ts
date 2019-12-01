export interface Product {
    uid: string;
    id: string;
    title: string;
    description: string;
    brand: string;
    price: number;
    condition: {
        used: boolean, // true used false new
        conditionDescription: string, // null if condition.used = false
    };
    sold: boolean;
    date: {seconds: number};
    soldDate: {seconds: number};
    buyerId: string;
}

