<script setup lang="ts">
import { onMounted } from "vue";

const props = defineProps({
  url: String,
});

onMounted(() => {
  const baseRoute = `${window.location.origin}/${props.url}`;
  console.log(baseRoute);
  import(baseRoute).then((module) => {
    console.log(module, "module");
  });
});
</script>

<template>
  <slot></slot>
</template>
