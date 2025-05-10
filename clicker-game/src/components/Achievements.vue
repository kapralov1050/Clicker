<template>
  <button @click="toggleAchievementsList"> Достижения </button>
  <div class="achievements" v-show="isAchievementsListOpen">
    <h1> Достижения </h1>
    <p v-for="ach in gameStore.receivedAchievements">
      {{ ach.achievement }}
    </p>
  </div>
</template>


<script setup lang='ts'>
import { useGameStore } from '@/stores/game';
import type { Achievement } from '@/types/common';
import { ref, watch } from 'vue';

const gameStore = useGameStore()

const isAchievementsListOpen = ref(false)

const toggleAchievementsList = () => {
  isAchievementsListOpen.value = !isAchievementsListOpen.value
}

const achievementsList = ref<Achievement[]>([
  {
    achievement: '"Hello, World!" — Сделал первый клик.',
    required: () => gameStore.maxCurrency >= 1
  },
  {
    achievement: '"Бесконечный цикл" — Кликнул 100 раз.',
    required: () => gameStore.maxCurrency > 100
  },
  {
    achievement: '"Пассивный заработок" — Получил первый автоклик.',
    required: () => gameStore.autoClick > 0
  },
  {
    achievement: '"Зачем спать? Есть кофе" — Достиг 5 уровня (и 5-й чашки кофе).',
    required: () => gameStore.currentLevel >= 5
  },
  {
    achievement: '"Я дебажил это 5 часов..." — Получил достижение случайно.',
    required: () => Math.random() < 0.01
  },
  {
    achievement: '"Рефакторинг личности" — Сменил 10 скинов.',
    required: () => gameStore.currentLevel >= 8
  },
  {
    achievement: '"Сингулярность близка" — Автоклики кликают быстрее, чем ты.',
    required: () => gameStore.autoClick > gameStore.manualClick
  },
  {
    achievement: '"Быдлокодер -> Senior" — Прошёл весь путь эволюции (из обезьяны в архитектора).',
    required: () => gameStore.currentLevel === 20
  },
  {
    achievement: '"А где документация?" — Кликнул 404 раза.',
    required: () => gameStore.maxCurrency >= 404
  },
  {
    achievement: '"Поменял стек технологий" — Сбросил все улучшения и начал заново.',
    required: () => gameStore.maxCurrency === -1
  }
])

watch(() => [
    gameStore.autoClick,
    gameStore.currentLevel,
    gameStore.manualClick,
    gameStore.maxCurrency
  ], () => { 
  let fulflled = achievementsList.value.filter( ach => ach.required())

  fulflled.forEach(ach => {
    if(!gameStore.receivedAchievements.some(( r => r.achievement === ach.achievement ))) {
      gameStore.receivedAchievements.push(ach)
    }
  })
})
</script>


<style scoped lang='scss'>
.achievements {
  position: absolute;
  z-index: 1000;
  width: 30rem;
  max-height: 20rem;
  overflow-y: scroll;
  padding: 1rem 2rem;
  color: rgb(44, 44, 44);
  background-color: rgb(223, 223, 223);
  border-radius: 1rem;
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.3);
  top: 70%;
  left: 35%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

button {
  background-color: rgb(33, 125, 187);
  color: white;
  border-radius: 0.5rem;
  outline: none;
  border: none;
  margin: 2rem;
  padding: 1rem;
}
</style>