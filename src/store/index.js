import { createStore } from "vuex";
import { parseHalfPrice } from "@/helpers/ProductHelper";

const state = {
    products: [
        { name: 'Bananes', price: 2 },
        { name: 'Pommes', price: 1 },
        { name: 'Salade', price: 3 },
        { name: 'Abricots', price: 2.33 }
    ], 
    sales: false
};

const getters = {
    getProducts: state => {
        if(!state.sales) {
            return state.products;
        }

        var soldes = state.products.map(p => {
            return {
                name: `**${p.name}**`,
                price: parseHalfPrice(p.price)
            }
        });
        return soldes;
    }, 
    getProduct: state => payload => {
        return state.products[payload];
    }
};

//Ex No ASYNC usage difficult debug tracking
const mutations = {
    setSales: (state, payload) => {
        state.sales = payload; //eventually payload bool check
    },
    augmentPrice: (state, payload) => {
        state.products.forEach(p => p.price += payload);
    },
    reducePrice: state => {
        state.products.forEach(p => p.price -= 1);
    }, 
    setProduct: (state, payload) => {
        state.products[payload.index] = payload.product;
    }, 
    deleteProduct: (state, payload) => {
        state.products.splice(payload, 1);
    }
};

const actions = {
    updateSales: (context, payload) => {
        setTimeout(() => {
            context.commit('setSales', payload);
        }, 1000);
    },
    augmentPrice: (context, payload) => {
        setTimeout(() => {
            context.commit('augmentPrice', payload);
        }, 2000);
    },
    reducePrice: context => {
        setTimeout(() => {
            context.commit('reducePrice');
        }, 3000);
    }, 
    updateProduct: (context, payload) => {
        setTimeout(() => {
            context.commit('setProduct', payload);
        }, 1000);
    }, 
    removeProduct: (context, payload) => {
        setTimeout(() => {
            context.commit('deleteProduct', payload);
        }, 1200);
    }
};

const store = createStore({
    strict: true, //<-prevents state modification outside of mutation calls
    state, 
    getters, 
    mutations, 
    actions
});

export default store;