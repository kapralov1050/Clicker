<template>
  <button 
    :style="{ background: `linear-gradient
    (360deg, ${gameStore.currentColor} 10%, white 60%, white 100%)`}" 
    @click="handleClick($event)"
  >
    <img :src="gameStore.currentSkin" />
    <div
      :class="{clicked: isClickAnimated}" 
      :style="`
      top: ${clickCoordY}px; 
      left: ${clickCoordX}px`"
      @animationend="isClickAnimated = false"
    > 
      +{{ gameStore.manualClick }} 
    </div>
  </button>
</template>


<script setup lang="ts">
import { useGameStore } from '@/stores/game';
import { ref } from 'vue';

const emit = defineEmits(['increase'])

const isClickAnimated = ref(false)
const clickCoordX = ref(0)
const clickCoordY = ref(0)

function handleClick (event: MouseEvent) {
  emit('increase')

  const button = event.currentTarget as HTMLElement
  const rect = button.getBoundingClientRect()

  clickCoordX.value = +(event.clientX - rect.left).toFixed(0)
  clickCoordY.value = +(event.clientY - rect.top).toFixed(0)

  if (isClickAnimated.value) return
  isClickAnimated.value = true
}

const gameStore = useGameStore();
</script>


<style scoped lang="scss">
button {
  height: 300px;
  height: 300px;
  position: relative;
  font-weight: bold;
  color: #fff;
  border: none;
  cursor: pointer;
  filter: brightness(1.15);
  transition: all 0.2s ease-out;
}

img {
  object-fit:cover;
  -webkit-user-drag: none;
}

button:active {
  transform: translateY(0.5rem) translateX(0.5rem) scale(1.05);
}

.clicked {
  text-align: center;
  font-size: 2rem;
  position: absolute;
  color:  rgb(122, 70, 40);
  animation: click 250ms;
  will-change: transform;
}

@keyframes click {
  0% {
    opacity: 0;
    transform: translateX(-20px);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(-60px) translateX(-20px);
  }
}
</style>