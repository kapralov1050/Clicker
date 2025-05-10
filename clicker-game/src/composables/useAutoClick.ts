import { useGameStore } from "@/stores/game"

export const useAutoClick = () => {
  const gameStore = useGameStore()

  let lastTime = performance.now()

  function clickerLoop() {
    const now = performance.now()
    const difference = now - lastTime
    lastTime = now

    gameStore.currency += gameStore.autoClick * (difference / 1000)

  if (gameStore.currency > gameStore.maxCurrency) {
    gameStore.maxCurrency = gameStore.currency
  }

    requestAnimationFrame(clickerLoop)
  }

  return { clickerLoop }
}
