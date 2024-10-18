<template>
    <div>
        <h3>Panier</h3>
        <span v-if="cart.length > 0">Total: {{ total }}€</span>

        <ul>
            <li v-for="cartItem in cart">
                <span>{{ cartItem.name }}</span>
                <span>x{{ cartItem.count }}</span>
                <span>Article: {{ cartItem.cost }}€</span>
            </li>
        </ul>

        <button @click="store.dispatch('cart/pay')">Payer</button>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const cart = computed(() => { 
    const storeCart = store.getters['cart/getCart'];

    return storeCart.map(item => {
        const cost = store.getters['products/findProductPrice'](item.name);
        return {
            name: item.name, 
            count: item.count, 
            cost: cost*item.count
        }
    });
});

const total = computed(() => {
    var value = 0;
    cart.value.forEach(item => {
        value += item.cost
    });

    return value;
});

</script>

<style lang="scss" scoped>
@import '@/scss/GlobalStyle.scss';

li {
    display: flex;
    gap: 1em;
}

button {
    @include button;
}

</style>