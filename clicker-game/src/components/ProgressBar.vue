<template>
  <div class="progress-bar">
    <div class="progress-bar__item" :style="progressBarStyle">
    </div>
  </div>
</template>


<script setup lang='ts'>
import { useGameStore } from '@/stores/game';
import { computed } from 'vue';

const props = defineProps<{progress: number}>()
const gameStore = useGameStore()

const progressBarStyle = computed(() => {
  return {
    width: props.progress + 'px',
    background: `linear-gradient(90deg, white, ${gameStore.currentColor})`
  }
})
</script>


<style scoped lang='scss'>
.progress-bar {
  width: 400px;
  height: 50px;

  &__item {
    height: 100%;
    border: none;
  }
}
</style>