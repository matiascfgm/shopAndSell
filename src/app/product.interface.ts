export interface Product {
    title: string,
    description: string,
    brand: string,
    price: number,
    condition: {
        used: boolean, // true used false new
        conditionDescription: string, // null if condition.used = false
    }, 
}