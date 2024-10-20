import UserCartComp from "@/components/cart/UserCartComp.vue";
import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createStore } from "vuex";

describe('User Cart Component test', () => {
    let store;

    const cartModule = {
        namespaced: true,
        getters: {
            getCart: () => [
                { name: 'Banane', count: 2 },
                { name: 'Pomme', count: 1 }
            ]
        },
        actions: {
            pay: vi.fn() //mock pay
        }
    };

    const productsModule = {
        namespaced: true,
        getters: {
            findProductPrice: () => (productName) => {
                const prices = { Banane: 1, Pomme: 2 };
                return prices[productName];
            }
        }
    };

    beforeEach(() => {
        store = createStore({
            modules: {
                cart: cartModule,
                products: productsModule
            }
        });
    });

    it('renders the correct number of cart items', () => {
        const wrapper = mount(UserCartComp, {
            global: {
                plugins: [store]
            }
        });

        const listItems = wrapper.findAll('li');
        expect(listItems.length).toBe(2); // 2 items in the cart
    });

    it('displays correct item names, counts, and costs', () => {
        const wrapper = mount(UserCartComp, {
            global: {
                plugins: [store]
            }
        });

        const listItems = wrapper.findAll('li');
        expect(listItems[0].text()).toContain('Banane');
        expect(listItems[0].text()).toContain('x2');
        expect(listItems[0].text()).toContain('Article: 2€');

        expect(listItems[1].text()).toContain('Pomme');
        expect(listItems[1].text()).toContain('x1');
        expect(listItems[1].text()).toContain('Article: 2€');
    });

    it('displays the correct total cost', () => {
        const wrapper = mount(UserCartComp, {
            global: {
                plugins: [store]
            }
        });

        const totalSpan = wrapper.find('span');
        expect(totalSpan.text()).toContain('Total: 4€'); // 2*1 + 1*2
    });

    it('dispatches the pay action on button click', async () => {
        const wrapper = mount(UserCartComp, {
            global: {
                plugins: [store]
            }
        });

        const payButton = wrapper.find('button');
        await payButton.trigger('click');

        expect(cartModule.actions.pay).toHaveBeenCalled();
    });
});