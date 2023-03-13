import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProdSchema, ProdCollectionName } from './dto/products.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: ProdCollectionName, schema: ProdSchema }])],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
