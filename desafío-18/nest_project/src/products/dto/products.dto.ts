import { IsNotEmpty, IsString, IsNumber} from "class-validator";

export class ProductDTO{
    @IsNotEmpty()
    @IsString()
    _id: String;

    @IsNotEmpty()
    @IsString()
    name: String;
    
    @IsNotEmpty()
    @IsString()
    description: String;
    
    @IsNotEmpty()
    @IsNumber()
    price: Number;
    
    @IsNotEmpty()
    @IsNumber()
    stock: Number
}