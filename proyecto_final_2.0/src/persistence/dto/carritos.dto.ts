export default class ChartsDTO {
    id:string;
    products:[];
    constructor({_id, products}:any) {
        this.id    = _id
        this.products = products
    }
}

export function asDto(charts:any) {
    if(Array.isArray(charts))
        return charts.map(prod => new ChartsDTO(prod))
    else
        return new ChartsDTO(charts)
}