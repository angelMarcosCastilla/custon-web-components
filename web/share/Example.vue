<script setup lang="ts">
import { onMounted } from "vue";

const props = defineProps({
  url: String,
});

onMounted(() => {
  const baseRoute = "/" + props.url;
  import(baseRoute).then((module) => {
    console.log(module, "module");
  });
});
</script>

<template>
  <slot></slot>
</template>
