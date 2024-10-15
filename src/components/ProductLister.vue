<template>
    <div class="lister">
        <h2>Tableau Admin Produits</h2>

        <ul>
            <li v-for="product in products">
                <span class="name">{{ product.name }}</span>
                <span class="price">{{ product.price }}€</span>
            </li>
        </ul>

        <div class="admin-controls">
            <h3>Contrôlles Admin</h3>
            <label class="sales-toggle">
                Activer les soldes
                <!--Show update wrong order with @click then correct to @change-->
                <input type="checkbox" 
                    v-model="sales" 
                    @change="updateSales"/>
                <span class="checkmark"></span>
            </label>
            <button @click="agmentPrice(4)">Augmenter Prix</button>
            <button @click="reduicePrice">Réduire Prix</button>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const sales = ref(false);
const products = computed(() => store.getters.getProducts);

const updateSales = () => {
    console.log(sales.value)
    store.dispatch('updateSales', sales.value);
};
const agmentPrice = amout => {
    store.dispatch('augmentPrice', amout);
};
const reduicePrice = () => {
    store.dispatch('reducePrice');
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

    .admin-controls {
        background: rgba(255, 255, 255, 0.432);
        margin-top: 1em;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 1em;

        .sales-toggle {
            display: block;
            position: relative;
            padding-left: 35px;
            margin-bottom: 12px;
            cursor: pointer;
            font-size: 16px;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;

            input {
                position: absolute;
                opacity: 0;
                cursor: pointer;
                height: 0;
                width: 0;
            }

            .checkmark {
                position: absolute;
                top: 0;
                left: 0;
                height: 25px;
                width: 25px;
                background-color: #eee;
            }
            .checkmark:after {
                content: "";
                position: absolute;
                display: none;
                left: 9px;
                top: 5px;
                width: 5px;
                height: 10px;
                border: solid white;
                border-width: 0 3px 3px 0;
                -webkit-transform: rotate(45deg);
                -ms-transform: rotate(45deg);
                transform: rotate(45deg);
            }
        }
        .sales-toggle:hover input ~ .checkmark {
            background-color: #ccc;
        }
        .sales-toggle input:checked ~ .checkmark {
            background-color: #6b662a;
        }
        .sales-toggle input:checked ~ .checkmark:after {
            display: block;
        }

        button {
            width: fit-content;
            padding: 10px;
            border-radius: 0;
            border: none;
        }
    }
}

</style>