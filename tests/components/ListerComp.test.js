import ListerComp from "@/components/ListerComp.vue";
import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import { createStore } from "vuex";

describe('Lister Component tests', () => {
    let productsMock;
    let store;

    beforeEach(() => {
        productsMock = [
            { id: '1', name: 'Product 1', price: 10 },
            { id: '2', name: 'Product 2', price: 20 },
        ];
        
        store = createStore({
            getters: {
                'products/getProducts': () => productsMock
            }
        });
    });

    it('renders the list with the correct class when isAdmin is true', () => {
        const wrapper = mount(ListerComp, {
            global: {
                plugins: [store]
            },
            props: {
                isAdmin: true
            }
        });

        expect(wrapper.find('ul').classes()).toContain('admin');
    });

    it('renders the list with the default class when isAdmin is false', () => {
        const wrapper = mount(ListerComp, {
            global: {
                plugins: [store]
            },
            props: {
                isAdmin: false
            }
        });

        expect(wrapper.find('ul').classes()).toContain('default');
    });

    it('renders products with correct slot content', () => {
        const wrapper = mount(ListerComp, {
            global: {
                plugins: [store]
            },
            props: {
                isAdmin: false
            }
        });

        const productComps = wrapper.findAllComponents({ name: 'ProductComp' });
        expect(productComps.length).toBe(productsMock.length);

        productComps.forEach((productComp, index) => {
            expect(productComp.find('.name').text()).toBe(productsMock[index].name);
            expect(productComp.find('.price').text()).toBe(`${productsMock[index].price}€`);
        });
    });

    it('emits productSelected event when a product is selected', async () => {
        const wrapper = mount(ListerComp, {
            global: {
                plugins: [store]
            },
            props: {
                isAdmin: false
            }
        });

        const productComp = wrapper.findComponent({ name: 'ProductComp' });

        await productComp.vm.$emit('selected', { index: 0, id: '1' });

        expect(wrapper.emitted('productSelected')).toHaveLength(1);
        expect(wrapper.emitted('productSelected')[0]).toEqual([{ index: 0, id: '1' }]);
    });
});