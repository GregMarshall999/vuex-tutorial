<template>
  <ProductLister :productList="products"/>
  <ProductViewer :products="products"/>
</template>

<script setup>
import ProductLister from './components/ProductLister.vue';
import ProductViewer from './components/ProductViewer.vue';
import { ref } from 'vue';

const products = ref([
  { name: 'Bananes', price: 2 },
  { name: 'Pommes', price: 1 },
  { name: 'Salade', price: 3 },
  { name: 'Abricots', price: 2 }
]);

</script>