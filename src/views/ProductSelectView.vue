<template>
    <div class="viewer">
        <h2>Produits disponible</h2>

        <div style="display: flex; gap: 10%;">
            <ListerComp 
                @product-selected="addToCart"
                style="width: 50%;"
            />
            <UserCartComp/>
        </div>
    </div>
</template>

<script setup>
import UserCartComp from '@/components/cart/UserCartComp.vue';
import ListerComp from '@/components/ListerComp.vue';
import { useStore } from 'vuex';

const store = useStore();

const addToCart = index => {
    const product = store.getters['products/getProduct'](index);

    if(product) {
        store.dispatch('cart/putInCart', product.name);
    }
}
</script>

<style>

.viewer {
    background: #0c3772c2;
    box-shadow: 1px 2px 3px rgba(0,0,0,0.2);
    margin-bottom: 30px;
    padding: 10px 20px;
    color: white;
}

</style>