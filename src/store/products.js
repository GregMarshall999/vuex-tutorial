import { parseHalfPrice } from "@/helpers/ProductHelper";
import { findProducts, updateProduct, deleteProduct, createProduct } from "@/service/product.service";

const state = {
    products: [], 
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
    setProducts: (state, payload) => {
        state.products = payload;
    }
};

const actions = {
    loadProducts: context => {
        findProducts()
            .then(res => {
                context.commit('setProducts', res.data)
            })
            .catch(error => {
                console.error('Error loading products', error);
            });
    },
    updateSales: (context, payload) => {
        setTimeout(() => {
            context.commit('setSales', payload);
        }, 1000);
    },
    augmentPrice: async (context, payload) => { //TODO with reduce, place in helper
        const prods = context.getters.getProducts
            .map((p) => {
                return {
                    id: p.id, 
                    name: p.name, 
                    price: p.price
                };
            }); //cannot edit state from actions
        
        for(var p of prods) {
            p.price += payload
            await updateProduct(p.id, p);
        }

        context.dispatch('loadProducts');
    },
    reducePrice: async context => {
        const prods = context.getters.getProducts
            .map((p) => {
                return {
                    id: p.id, 
                    name: p.name, 
                    price: p.price
                };
            });
        
        for(var p of prods) {
            p.price -= 1
            await updateProduct(p.id, p);
        }

        context.dispatch('loadProducts');
    }, 
    updateProduct: async (context, payload) => {
        updateProduct(payload.id, payload).then(res => {
            if(res.status == 200) { //ATTENTION, validation non exaustive
                context.dispatch('loadProducts');
            }            
        });
    }, 
    removeProduct: (context, payload) => {
        deleteProduct(payload).then(res => {
            if(res.status == 200) {
                context.dispatch('loadProducts');
            }
        });
    }, 
    addProduct: (context, payload) => {        
        const prod = {
            name: payload.name, 
            price: payload.price
        }

        createProduct(prod).then(res => {
            if(res.status == 201) {
                context.dispatch('loadProducts');
            }
        });
    }
};

export default {
    namespaced: true, 
    state, 
    getters, 
    mutations, 
    actions
}