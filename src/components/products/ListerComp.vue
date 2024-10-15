<template>
    <ul :class="isAdmin ? 'admin' : 'default'">
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
<style lang="scss" scoped>
@import '../../scss/ProductsStyle.scss';

.admin {
    @include product-style(
        $li-display: inline-block, 
        $li-background: rgba(255, 255, 255, 0.432), 
        $li_price-display: initial,
        $li_price-color: #e8260c, 
        $li_price-marginLeft: 4px
    );
}
.default {
    @include product-style;
}

</style>