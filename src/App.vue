<template>
  <AdminProductView/>
  <ProductSelectView/>
</template>

<script setup>
import AdminProductView from './views/AdminProductView.vue';
import ProductSelectView from './views/ProductSelectView.vue';
import { useStore } from 'vuex';
import { onBeforeMount } from 'vue';

const store = useStore();
onBeforeMount(() => {
  store.dispatch('products/loadProducts');
});
</script>