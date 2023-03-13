import { IsNotEmpty, IsString, IsNumber} from "class-validator";

export class CreateProduct{
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