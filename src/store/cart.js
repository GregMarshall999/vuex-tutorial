const state = {
    userCart: new Map()
};

const getters = {
    getCart: state => {
        return Array.from(
            state.userCart, 
            ([name, count]) => ({ name, count })
        );
    }
};

const mutations = {
    addToCart: (state, payload) => {
        var count = 1;
        if(state.userCart.has(payload)) {
            count = state.userCart.get(payload) + 1;
        }

        state.userCart.set(payload, count);
    }, 
    clearCart: state => {
        state.userCart.clear();
    }
};

const actions = {
    putInCart: (context, payload) => {
        context.commit('addToCart', payload);
    }, 
    pay: context => {
        context.commit('clearCart');
    }
};

export default {
    namespaced: true, 
    state, 
    getters, 
    mutations, 
    actions
}