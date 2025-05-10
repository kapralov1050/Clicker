import type { Upgrade } from "@/types/common";
import { useGameStore } from "@/stores/game";

export const useUpgrades = () => {
  const gameStore = useGameStore()

  function buyUpgrade (upgrade: Upgrade) {
    if(gameStore.boughtUpgrades.includes(upgrade.title)) return
    if(upgrade.price > gameStore.currency) return

    gameStore.currency -= upgrade.price
    gameStore.xp += upgrade.price * 0.5
    gameStore.autoClick += upgrade.effect
    gameStore.boughtUpgrades.push(upgrade.title)
  }

  return { buyUpgrade }
}



