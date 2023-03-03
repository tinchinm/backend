
export default class ProductsDTO {
    id:string;
    title:string;
    description:string;
    price:number;
    constructor({_id,title, description, price}:any) {
        this.id    = _id
        this.title = title
        this.description = description
        this.price = price
    }
}

export function asDto(products:any) {
    if(Array.isArray(products))
        return products.map(prod => new ProductsDTO(prod))
    else
        return new ProductsDTO(products)
}