import { createProduct, deleteProduct, findProducts, updateProduct } from "@/service/product.service";
import products from "@/store/products";
import { beforeEach, describe, expect, it } from "vitest";
import { createStore } from "vuex";

vi.mock('@/service/product.service', () => ({
    findProducts: vi.fn(), 
    updateProduct: vi.fn(),
    deleteProduct: vi.fn(),
    createProduct: vi.fn(),
}));

describe('Product Store', () => {
    let store;

    beforeEach(async () => {
        vi.mocked(findProducts).mockResolvedValue({ data: [] });
        vi.mocked(updateProduct).mockResolvedValue({ status: 200 });
        vi.mocked(deleteProduct).mockResolvedValue({ status: 200 });
        vi.mocked(createProduct).mockResolvedValue({ status: 201 });

        store = createStore({
            modules: {
                products
            }
        });
        store.commit('products/setSales', false);
    });

    it('should start with an empty products array', () => {
        expect(store.state.products.products).toEqual([]);
    });

    it('should commit setProducts mutation', () => {
        const mockProducts = [{ name: 'Banana', price: 1 }];
        store.commit('products/setProducts', mockProducts);
        expect(store.state.products.products).toEqual(mockProducts);
    });

    it('should commit setSales mutation', () => {
        store.commit('products/setSales', true);
        expect(store.state.products.sales).toBe(true);
    });

    it('should return products from getProducts getter', () => {
        const mockProducts = [{ name: 'Banana', price: 1 }];
        store.commit('products/setProducts', mockProducts);
        expect(store.getters['products/getProducts']).toEqual(mockProducts);
    });

    it('should dispatch loadProducts action and commit setProducts', async () => {
        const mockProducts = [{ name: 'Banana', price: 1 }];
    
        vi.mocked(findProducts).mockResolvedValueOnce({ data: mockProducts });
    
        await store.dispatch('products/loadProducts');
        expect(store.state.products.products).toEqual(mockProducts);
    });

    it('should call updateProduct service method in augmentPrice action', async () => {
        const mockProducts = [{ id: 1, name: 'Banana', price: 1 }];
        store.commit('products/setProducts', mockProducts);
    
        await store.dispatch('products/augmentPrice', 1);
        expect(vi.mocked(updateProduct)).toHaveBeenCalledWith(1, { id: 1, name: 'Banana', price: 2 });
    });

    it('should call deleteProduct service method in removeProduct action', async () => {
        vi.mocked(deleteProduct).mockResolvedValueOnce({ status: 200 });
        await store.dispatch('products/removeProduct', 1);
        expect(deleteProduct).toHaveBeenCalledWith(1);
    });
    
    it('should call createProduct service method in addProduct action', async () => {
        vi.mocked(createProduct).mockResolvedValueOnce({ status: 201 });
        await store.dispatch('products/addProduct', { name: 'Orange', price: 1 });
        expect(createProduct).toHaveBeenCalledWith({ name: 'Orange', price: 1 });
    });
});