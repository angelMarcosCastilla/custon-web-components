<script setup lang="ts">
import { onMounted } from "vue";

const props = defineProps({
  url: String,
});

onMounted(() => {
  const baseRoute = "http://127.0.0.1:5500/src/" + props.url;
  import(baseRoute).then((module) => {
    console.log(module, "module");
  });
});
</script>

<template>
  <slot></slot>
</template>
