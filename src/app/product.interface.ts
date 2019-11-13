export interface Product {
    title: string,
    description: string,
    price: number,
    brand: string,
    condition: {
        used: boolean, // true used false new
        conditionDescription: string, // null if condition.used = false
    }, 
}