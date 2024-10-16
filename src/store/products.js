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
    }, 
    countProducts: state => {
        return state.products.length;
    }, 
    findProductPrice: state => payload => {
        const cost = state.products.filter(p => { 
            if(p.name == payload) {
                return p.price;
            } 
        });

        if(cost.length == 1) {
            //Show console log here for complexity load
            if(state.sales) {
                return parseHalfPrice(cost[0].price);
            }
            else {
                return cost[0].price;
            }
        }
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
    }, 
    pushProduct: (state, payload) => {
        state.products.push(payload);
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
    }, 
    addProduct: (context, payload) => {
        setTimeout(() => {
            context.commit('pushProduct', payload);
        }, 1500);
    }
};

export default {
    namespaced: true, 
    state, 
    getters, 
    mutations, 
    actions
}