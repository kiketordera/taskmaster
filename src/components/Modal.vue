<template>
    <teleport to="body">
      <div class="modal-overlay" @click.self="close">
        <transition name="fade">
          <div class="modal-content" @click.stop>
            <button class="modal-close-button" @click="close">&times;</button>
            <slot />
          </div>
        </transition>
      </div>
    </teleport>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'Modal',
    emits: ['close'],
    setup(_, { emit }) {
      const close = () => {
        emit('close');
      };
  
      return {
        close,
      };
    },
  });
  </script>

  <style lang="scss" scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background-color: $background-color;
    padding: 20px;
    border-radius: 8px;
    position: relative;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
    .modal-close-button {
      position: absolute;
      top: 10px;
      right: 15px;
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: $brown;
    }
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>