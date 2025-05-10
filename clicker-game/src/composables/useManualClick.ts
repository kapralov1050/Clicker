import { useGameStore } from "@/stores/game"

export const useManualCLick = () => {
  const gameStore = useGameStore()

  function increaseValue() {
    const isBonusChance = Math.random() < gameStore.luckyChance
    gameStore.xp += gameStore.manualClick
    gameStore.currency += isBonusChance ? gameStore.manualClick * 3 : gameStore.manualClick
    gameStore.clickCounter += isBonusChance ? gameStore.manualClick * 3 : gameStore.manualClick
  }

  return { increaseValue }
}



