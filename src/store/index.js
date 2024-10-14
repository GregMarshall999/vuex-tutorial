import { createStore } from "vuex";

const state = {
    products: [
        { name: 'Bananes', price: 2 },
        { name: 'Pommes', price: 1 },
        { name: 'Salade', price: 3 },
        { name: 'Abricots', price: 2.33 }
    ]
};

const getters = {
    saleProducts: state => {
        var soldes = state.products.map(p => {
            return {
                name: `**${p.name}**`,
                price: parseHalfPrice(p.price)
            }
        });
        return soldes;
    }
};

const parseHalfPrice = price => {
    var hp = price / 2;

    if(hp % 1 != 0) {
        var precision = hp.toPrecision(3)

        if(precision.split('.')[1].length > 2) {
            return precision.substring(0, precision.split('.')[0].length + 3); //2 + le '.'
        }
        
        return precision.toString();
    }

    return hp;
};

const store = createStore({
    state, 
    getters
});

export default store;