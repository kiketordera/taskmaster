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
  @import "../../styles/variables.scss";
  
  .empty-state {
    text-align: center;
    color: $text-color;
    font-style: italic;
    padding: 20px 0;
  }
  </style>