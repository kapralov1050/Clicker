<template>
  <div class="panel-buttons">
    <template 
      v-for="upgrade in upgrades" 
      :key="upgrade.title"
    >
      <button
        class="panel-buttons__button"
        :class="{ available: gameStore.currency > upgrade.price }"
        @click="handleBuy(upgrade)"
        v-if="!isBought(upgrade.title)"
        :disabled="gameStore.maxCurrency < upgrade.price"
      >
        <p>{{ upgrade.title }}</p>
        <p>{{ `требуется ${upgrade.price} опыта` }}</p>
      </button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { upgrades } from '@/constants';
import { useGameStore } from '@/stores/game';
import type { Upgrade } from '@/types/common';

const gameStore = useGameStore();

const emit = defineEmits<{
  (e: 'buy', upgrade: Upgrade): void;
}>();

const handleBuy = (upgrade: Upgrade) => {
  emit('buy', upgrade);
};

function isBought(upgrade: string): boolean {
  return gameStore.boughtUpgrades.includes(upgrade);
}
</script>

<style scoped lang="scss">
.panel-buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 1rem;
  
  &__button {
    font-weight: bold;
    color: #fff;
    background-color: rgb(122, 70, 40);
    border: none;
    border-radius: 1rem;
    cursor: pointer;
    box-shadow: 0 6px 6px rgba(63, 63, 63, 0.3);
    padding: 0.8rem;
    transition: background-color 0.2s ease;

    &:disabled {
      opacity: 0.7;
      cursor: default;
    }
  }
}

.available {
  background-color: rgb(206, 120, 71);
}
</style>