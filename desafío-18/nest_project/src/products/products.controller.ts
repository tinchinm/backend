import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProdDocument } from './dto/products.schema';
import { CreateProduct } from './dto/save-products.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService){}

    @Get('/')
        getProducts(): Promise<ProdDocument[]>{
            return this.productsService.getProducts();
        }
    
    @Get('/:id')
        getById(@Param('id') prodId:String):Promise<ProdDocument>{
            return this.productsService.getById(prodId);
        }

    @Post('/')
        saveProduct(@Body()prod:CreateProduct): Promise<ProdDocument>{
            return this.productsService.saveProduct(prod);
        }

    @Put('/:id')
        updateProduct(@Param('id') prodId:String, @Body() prod:ProdDocument): Promise<ProdDocument>{
            return this.productsService.updateProduct(prodId, prod);
        }
    
    @Delete('/:id')
        deleteProduct(@Param('id') prodId:String): Promise<ProdDocument>{
            return this.productsService.deleteProduct(prodId);
        }
    
}
