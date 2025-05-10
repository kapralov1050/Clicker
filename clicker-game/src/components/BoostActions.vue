<template>
    <div>
        <button 
            :class="{ falling: gameStore.isBonusFalling }"
            :style="{ right: gameStore.fallingBonusCoordinate}"
            @click="handleBonusCatch(gameStore.randomlySelectedBonus)" 
            v-if="gameStore.isBonusFalling" 
            :disabled="gameStore.bonusCooldown > 0"
        >
            Случайный Бонус!
        </button>
    </div>
</template>


<script setup lang='ts'>
import { useGameStore } from '@/stores/game';
import type { Bonus } from '@/types/common';

const gameStore = useGameStore()

const emit = defineEmits<{
  (e: 'catch', bonus: Bonus): void
}>()

const handleBonusCatch = (bonus: Bonus) => {
    emit('catch', gameStore.randomlySelectedBonus)
}
</script>


<style scoped lang='scss'>
* {
  font-family: 'Roboto', sans-serif;
}

body {
  user-select: none;
}

.falling {
    width: auto;
    height: auto;
    z-index: 100;
    margin: 1rem;
    padding: 1.5rem;
    font-weight: bold;
    color: #fff;
    background-color: rgb(228, 138, 35);
    position: absolute;
    top: -100px;
    animation: fall 6s;
    border: none;
    border-radius: 1rem;
    cursor: pointer;
    box-shadow: 0 6px 12px rgba(63, 63, 63, 0.3);
}

@keyframes fall {
0% {
    top: -100px;
    opacity: 1;
}
75% {
    opacity: 1;
}  
100% {
    top: 100vh;
    opacity: 0;
} 
}
</style>