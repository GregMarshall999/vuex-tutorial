<template>
    <ul :class="isAdmin ? 'admin' : 'default'">
        <ProductComp 
            v-for="(product, index) in products"
            :index="index"
            @selected="propSelected"
        >
            <template #label>
                <span class="name">{{ product.name }}</span>
            </template>
            <template #default>
                <span class="price">{{ product.price }}€</span>
            </template>
        </ProductComp>
        <slot></slot>
    </ul>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import ProductComp from './products/ProductComp.vue';

const store = useStore();
const products = computed(() => store.getters.getProducts);

const props = defineProps({
    isAdmin: {
        type: Boolean, 
        default: false
    }
});
const emit = defineEmits(['productSelected']);

const propSelected = index => {
    emit('productSelected', index);
};
</script>

<!--Style issue solved with mixin later-->
<style lang="scss">
@import '@/scss/ProductsStyle.scss';

.admin {
    @include product-style(
        $li-display: inline-block, 
        $li-background: rgba(255, 255, 255, 0.432),
        $li_hover-background:  rgba(255, 255, 255, 0.205),
        $li_price-display: initial,
        $li_price-color: #e8260c, 
        $li_price-marginLeft: 4px
    );
}
.default {
    @include product-style;
}

</style>