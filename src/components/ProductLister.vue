<template>
    <div class="lister">
        <h2>Liste de produits</h2>

        <ul>
            <li v-for="product in listeSoldes">
                <span class="name">{{ product.name }}</span>
                <span class="price">{{ product.price }}€</span>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const productList = computed(() => store.state.products);
const listeSoldes = computed(() => {
    var soldes = store.state.products.map(p => {
        return {
            name: `**${p.name}**`,
            price: parseHalfPrice(p.price)
        }
    });
    return soldes;
});

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

</script>

<style>

.lister {
    background: #6b662a;
    box-shadow: 1px 2px 3px rgba(0,0,0,0.2);
    margin-bottom: 30px;
    padding: 10px 20px;
    color: black;

    ul {
        padding: 0;

        li{
            display: inline-block;
            margin-right: 10px;
            margin-top: 10px;
            padding: 20px;
            background: rgba(255, 255, 255, 0.432);
        }

        .price{
            font-weight: bold;
            color: #e8260c;
            margin-left: 4px;
        }
    }
}

</style>