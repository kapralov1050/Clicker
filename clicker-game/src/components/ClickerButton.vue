<template>
  <button @click="$emit('increase')" > 
    <img :src="`${gameStore.currentSkin}`"/>
  </button>
</template>


<script setup lang='ts'>
import { useGameStore } from '@/stores/game';

const gameStore = useGameStore()
</script>


<style scoped lang='scss'>
button {
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
  border: none;
  cursor: pointer;
  filter: brightness(1.15);
  transition: all 0.2s ease;
}

img {
 object-fit: none;
  -webkit-user-drag: none;
}

button:active {
  transform: translateY(0.5rem) translateX(0.5rem) scale(1.05);
  background: radial-gradient(rgb(245, 191, 110), white)
}
</style>