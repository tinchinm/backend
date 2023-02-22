import { ProductsModel } from "../persistence/daos/mongo/models/products.model";
import app from "../services/server";
import request from "supertest";

describe ('Test de Api ABM de Productos', () => {

    it ('Deberia crear un nuevo producto', async () => {
        const prod = {
            title: "Lapiz Negro",
		    description: "Otro Lapiz",
		    price: "138",
		    stock: "8"
        }
        const response = await request(app)
        .post('/api/productos')
        .send(prod)
        expect(response.status).toBe(200)
        expect(response.body.title).toBe(prod.title)
        expect(response.body.description).toBe(prod.description)
        expect(response.body.price).toBe(prod.price)
        expect(response.body.stock).toBe(prod.stock)
    })

    it ('Debería traer todos los productos', async () => {
        const prod = {
            title: "Lapiz Negro",
		    description: "Otro Lapiz",
		    price: "138",
		    stock: "8"
        }
        await ProductsModel.create(prod)
        const response = await request(app)
        .get('/api/productos')
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
    })

    it ('Debería actualizar un producto', async () => {
        const prod = {
            title: "Lapiz Negro",
		    description: "Otro Lapiz",
		    price: "138",
		    stock: "8"
        }
        const response = await ProductsModel.create(prod)
        const prodUpdate = {
            title: "Lapiz Negro",
		    description: "Otro Lapiz",
		    price: "123",
		    stock: "3"
        }
        const responseUpdate = await request(app)
        .put(`/api/productos/${response._id}`)
        .send(prodUpdate)
        expect(responseUpdate.status).toBe(200)
    })

    it ('Debería eliminar un producto', async () => {
        const prod = {
            title: "Lapiz Negro",
		    description: "Otro Lapiz",
		    price: "138",
		    stock: "8"
        }
        const response = await ProductsModel.create(prod)
        const responseDelete = await request(app)
        .delete(`/api/productos/${response._id}`)
        expect(responseDelete.status).toBe(200)
    })
})