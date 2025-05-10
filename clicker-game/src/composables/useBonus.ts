import { useGameStore } from "@/stores/game"
import type { Bonus } from "@/types/common"

export const useBonus = () => {
  const gameStore = useGameStore()

  function activateBonus(bonus: Bonus) {
    if (gameStore.bonusCooldown > 0) return

    gameStore.isBonusFalling = false
    gameStore.isBonusActive = true
    gameStore.bonusName = bonus.name
    bonus.action()

    gameStore.bonusDuration = bonus.duration
    gameStore.bonusCooldown = bonus.cooldown

    let nextBonusIndex
    
    nextBonusIndex = Math.floor(Math.random() * gameStore.bonuses.length)
    gameStore.randomlySelectedBonus = gameStore.bonuses[nextBonusIndex]
    
    let timerId: number

    timerId = setInterval(() => {
      if (gameStore.bonusDuration === 0) {
        gameStore.isBonusActive = false
        clearInterval(timerId)
        bonus.end()
        timerId = setInterval(() => {
          if (gameStore.bonusCooldown === 0)  {
            clearInterval(timerId)
          } else {
            gameStore.bonusCooldown--
          }
        }, 1000)
      } else {
        gameStore.bonusDuration--
      }
    }, 1000)
  }

  return { activateBonus }
}