import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { faker } from "@faker-js/faker";
faker.locale = "es";

export const createRandomProducts = () => {
  try {
    const productos: any[] = [];
    for (let i = 0; i < 5; i++) {
      productos.push({
        id: uuidv4(),
        timestamp: moment().format("DD/MM/YYYY, HH:mm"),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: faker.random.numeric(5),
        thumbnail: faker.image.imageUrl(),
        price: faker.commerce.price(),
        stock: faker.random.numeric(2),
      });
    }
    return productos;
  } catch (error) {
    console.error(error);
  }
};
