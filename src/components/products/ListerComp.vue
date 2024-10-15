<template>
    <ul :class="{ admin : isAdmin }">
        <li v-for="product in products">
            <span class="name">{{ product.name }}</span>
            <span class="price">{{ product.price }}€</span>
        </li>
    </ul>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const products = computed(() => store.getters.getProducts);

const props = defineProps({
    isAdmin: {
        type: Boolean, 
        default: false
    }
});
</script>

<!--Style issue solved with mixin later-->
<style scoped>

ul {
    padding: 0;
    list-style-type: none;

    li {
        margin-right: 10px;
        margin-top: 10px;
        padding: 20px;
        background: rgba(255, 255, 255, 0.151);

        .price {
            font-weight: bold;
            color: #bf97db;
            display: block;
        }
    }
}

ul.admin {
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

</style>