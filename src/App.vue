<template>
  <ProductLister :productList="products"/>
  <ProductViewer :products="products"/>
</template>

<script setup>
import ProductLister from './components/ProductLister.vue';
import ProductViewer from './components/ProductViewer.vue';
</script>