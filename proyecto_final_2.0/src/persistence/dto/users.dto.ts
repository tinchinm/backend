export default class ProductsDTO {
    id:String;
    name:String;
    phone:String;
    mail:String;
    constructor({_id,name, phone, mail}:any) {
        this.id    = _id
        this.name = name
        this.phone = phone
        this.mail = mail
    }
}

export function asDto(users:any) {
    if(Array.isArray(users))
        return users.map(prod => new ProductsDTO(prod))
    else
        return new ProductsDTO(users)
}