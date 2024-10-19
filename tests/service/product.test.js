import { describe, beforeEach, afterEach, it, expect } from "vitest";
import axios from "axios";
import MockAdapter from 'axios-mock-adapter';
import { findProducts, updateProduct, deleteProduct, createProduct } from "@/service/productService";

describe('Product Service', () => {
    let mock;

    beforeEach(() => mock = new MockAdapter(axios));

    afterEach(() => mock.reset());

    it('should fetch products', async () => {
        const products = [
            { id: 1, name: 'Banana' }, 
            { id: 2, name: 'Apple' }
        ];

        mock.onGet('http://localhost:3000/products').reply(200, products);

        const res = await findProducts();
        expect(res.data).toEqual(products);
    });

    it('should update a product', async () => {
        const updatedProduct = { id: 1, name: 'Updated Banana' };
        mock.onPut('http://localhost:3000/products/1').reply(200, updatedProduct);

        const response = await updateProduct(1, updatedProduct);
        expect(response.data).toEqual(updatedProduct);
    });

    it('should delete a product', async () => {
        mock.onDelete('http://localhost:3000/products/1').reply(200);
    
        const response = await deleteProduct(1);
        expect(response.status).toBe(200);
    });

    it('should create a product', async () => {
        const newProduct = { name: 'Orange' };
        mock.onPost('http://localhost:3000/products').reply(201, newProduct);
    
        const response = await createProduct(newProduct);
        expect(response.data).toEqual(newProduct);
    });
});