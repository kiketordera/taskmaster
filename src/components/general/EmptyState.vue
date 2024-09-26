<template>
    <div class="empty-state">
      <slot />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  
  export default defineComponent({
    name: "EmptyState",
  });
  </script>
  
  <style lang="scss" scoped>  
  .empty-state {
    text-align: center;
    color: $pink;
    font-family: $regular;
    padding: 20px 0;
  }
  </style>