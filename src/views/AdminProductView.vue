<template>
    <div class="lister">
        <h2>Tableau Admin Produits</h2>

        <ListerComp 
            :isAdmin="true"
            @productSelected="selectProduct">
            <ProductComp 
                v-if="!newProductMode" 
                :index="productCount"
                @selected="newProductMode = true"
            >
                <template #label>
                    <span class="name">Nouveau Produit</span>
                </template>
                <template #default>
                    <span class="price">+</span>
                </template>
            </ProductComp>
            <li v-else>
                <form @submit.prevent="newProduct">
                    <input 
                        type="text" 
                        placeholder="Nom Produit..." 
                        required
                        v-model="product.name"
                    />
                    <input 
                        type="number" 
                        placeholder="Prix Produit..." 
                        required
                        v-model="product.price"
                    />
                    <button type="submit">Ajouter</button>
                </form>
            </li>
        </ListerComp>

        <div class="admin-tools">
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

            <div class="product-editor">
                <form @submit.prevent="updateProduct">
                    <h3>Editer un Produit</h3>
                    <input type="text" v-model="selectedProduct.name" placeholder="Nom Produit"/>
                    <input type="number" v-model="selectedProduct.price" placeholder="Prix Produit"/>
                    <button type="submit">Editer</button>               
                </form>
                <button @click="deleteProduct">Supprimer</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import ListerComp from '@/components/ListerComp.vue';
import ProductComp from '@/components/products/ProductComp.vue';
import { computed, reactive, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const sales = ref(false);

const productCount = computed(() => store.getters['products/countProducts']);

const updateSales = () => {
    store.dispatch('products/updateSales', sales.value);
};
const agmentPrice = amout => {
    store.dispatch('products/augmentPrice', amout);
};
const reduicePrice = () => {
    store.dispatch('products/reducePrice');
};

const selectedProduct = reactive({
    name: '', 
    price: 0
});
const selectedIndex = ref(null);
const selectedId = ref(null);
const selectProduct = payload => {
    selectedIndex.value = payload.index;
    selectedId.value = payload.id;
    const storeProd = store.getters['products/getProduct'](payload.index);

    selectedProduct.name = storeProd.name;
    selectedProduct.price = storeProd.price;
}
const updateProduct = () => {
    if(selectedIndex.value != null) {
        store.dispatch('products/updateProduct', { 
            id: selectedId.value,
            name: selectedProduct.name, 
            price: selectedProduct.price
        });

        selectedId.value = null;
        selectedIndex.value = null;
        selectedProduct.name = '';
        selectedProduct.price = 0;
    } 
}
const deleteProduct = () => {
    if(selectedIndex.value) {
        store.dispatch('products/removeProduct', selectedId.value);
        selectedId.value = null;
        selectedIndex.value = null;
        selectedProduct.name = '';
        selectedProduct.price = 0;
    }
}
const newProductMode = ref(false);
const product = reactive({
    name: null, 
    price: null
});
const newProduct = () => {
    store.dispatch('products/addProduct', product);
    newProductMode.value = false;
}

</script>

<style>

.lister {
    background: #6b662a;
    box-shadow: 1px 2px 3px rgba(0,0,0,0.2);
    margin-bottom: 30px;
    padding: 10px 20px;
    color: black;

    .admin-tools {
        background: rgba(255, 255, 255, 0.432);
        margin-top: 1em;
        padding: 20px;
        display: flex;
        gap: 10%;

        .admin-controls {
            display: flex;
            flex-direction: column;
            gap: 1em;
            border-right: solid 2px rgb(105, 105, 105);
            padding-right: 10%;

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
        }

        .product-editor {
            form {
                display: flex;
                flex-direction: column;
                gap: 1em;
                margin-bottom: 1em;

                input {
                    border: none;
                    font-size: 16px;
                }
            }
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