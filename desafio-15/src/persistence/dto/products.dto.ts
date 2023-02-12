
export default class ProductsDTO {
    title:string;
    price:number;
    constructor({title, price}:any) {
        this.title = title
        this.price = price
    }
}

export function asDto(products:any) {
    if(Array.isArray(products))
        return products.map(prod => new ProductsDTO(prod))
    else
        return new ProductsDTO(products)
}