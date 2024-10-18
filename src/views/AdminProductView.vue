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
                :disabled="editProductMode"
            >
                <template #label>
                    <span class="name">Nouveau Produit</span>
                </template>
                <template #default>
                    <span class="price">+</span>
                </template>
            </ProductComp>
            <li v-else>
                <ProductForm
                    :fields="formFields" 
                    :submitButtonText="'Ajouter'"
                    @success="newProduct"
                />
                <button class="cancel" @click="newProductMode = false">Annuler</button>
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

            <div class="product-editor" v-show="!newProductMode">
                <h3 style="margin-bottom: 1em;">Editer un Produit</h3>

                <ProductForm
                    :fields="formFields"
                    :submitButtonText="'Editer'"
                    @success="updateProduct"
                />

                <button @click="deleteProduct">Supprimer</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import ListerComp from '@/components/ListerComp.vue';
import ProductComp from '@/components/products/ProductComp.vue';
import ProductForm from '@/components/products/form/ProductForm.vue';
import { computed, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { requiredText, requiredPositiveNumber } from '@/helpers/ValidationHelper';

const store = useStore();

const sales = ref(false);
const newProductMode = ref(false);
const editProductMode = ref(false);

const formFields = reactive([
    { 
        placeholder: 'Nom Produit...', 
        type: 'text', 
        value: null,
        rules: [requiredText] 
    }, 
    {
        placeholder: 'Prix Produit...', 
        type: 'number', 
        value: null,
        rules: [requiredPositiveNumber]
    }
]);

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

const selectedIndex = ref(null);
const selectedId = ref(null);
const selectProduct = payload => {
    if(!newProductMode.value) {
        editProductMode.value = true;

        selectedIndex.value = payload.index;
        selectedId.value = payload.id;
        const storeProd = store.getters['products/getProduct'](payload.index);

        formFields[0].value = storeProd.name;
        formFields[1].value = storeProd.price;
    }
}
const updateProduct = result => {
    if(selectedIndex.value != null) {
        store.dispatch('products/updateProduct', { 
            id: selectedId.value,
            name: result[0], 
            price: result[1]
        });

        selectedId.value = null;
        selectedIndex.value = null;
        editProductMode.value = false;
        formFields[0].value = null;
        formFields[1].value = null;
    } 
}
const deleteProduct = () => {
    if(selectedIndex.value) {
        store.dispatch('products/removeProduct', selectedId.value);
        selectedId.value = null;
        selectedIndex.value = null;
        editProductMode.value = false;
        formFields[0].value = null;
        formFields[1].value = null;
    }
}
const newProduct = result => {
    const product = {};
    const keys = ['name', 'price']; // <- peut etre recupéré depuis une DTO ou interface
    
    for(var i = 0; i < result.length; i++) {
        product[keys[i]] = result[i];
    }

    store.dispatch('products/addProduct', product);
    
    formFields.forEach(field => field.value = null);
    newProductMode.value = false;
}
</script>

<style lang="scss">
@import '@/scss/GlobalStyle.scss';

.lister {
    background: #6b662a;
    box-shadow: 1px 2px 3px rgba(0,0,0,0.2);
    margin-bottom: 30px;
    padding: 10px 20px;
    color: black;

    .cancel {
        @include button;
        margin-top: 1em;
    }

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
            @include button;
        }
    }
}

</style>