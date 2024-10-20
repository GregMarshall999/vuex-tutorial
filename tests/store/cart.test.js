import cart from "@/store/cart";
import { beforeEach, describe, expect, it } from "vitest";
import { createStore } from "vuex";

describe('Cart Store', () => {
    let store;

    beforeEach(() => {
        store = createStore({
            modules: {
                cart
            }
        })
    });

    it('should start with empty cart', () => {
        expect(store.state.cart.userCart.size).toBe(0);
    });

    it('should add items to the cart', () => {
        store.commit('cart/addToCart', 'Banana');
        expect(store.state.cart.userCart.get('Banana')).toBe(1);
    
        store.commit('cart/addToCart', 'Banana');
        expect(store.state.cart.userCart.get('Banana')).toBe(2);
    });

    it('should clear the cart', () => {
        store.commit('cart/addToCart', 'Banana');
        store.commit('cart/clearCart');
        expect(store.state.cart.userCart.size).toBe(0);
    });

    it('should return the correct cart items from getter', () => {
        store.commit('cart/addToCart', 'Apple');
        const cartItems = store.getters['cart/getCart'];
        expect(cartItems).toEqual([{ name: 'Apple', count: 1 }]);
    });

    it('should dispatch putInCart action and commit addToCart mutation', async () => {
        await store.dispatch('cart/putInCart', 'Orange');
        expect(store.state.cart.userCart.get('Orange')).toBe(1);
    });

    it('should dispatch pay action and commit clearCart mutation', async () => {
        store.commit('cart/addToCart', 'Apple');
        await store.dispatch('cart/pay');
        expect(store.state.cart.userCart.size).toBe(0);
    });
});