import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import type { Achievement, Bonus, LevelProp, Profit } from '@/types/common'
import { Levels } from '@/constants'
import { throttle } from 'lodash';

export const useGameStore = defineStore('gameStore', () => {
  
  const autoClick = ref(0)
  const manualClick = ref(1)
  const luckyChance = ref(0.2)
  const xp = ref(0)
  const currency = ref(0)
  const maxCurrency = ref(0)
  const currentClickRate = ref(0)
  const currentColor = ref('')
  const currentSkin = ref('/icons/1.png')
  const clickCounter = ref(0)
  const boughtUpgrades = ref<string[]>([])
  const receivedAchievements = ref<Achievement[]>([])

  const bonuses: Bonus[] = [
    {
        name: 'Двойной клик',
        duration: Math.floor(Math.random() * (30 - 1)) + 1,
        cooldown: 25,
        action: () => manualClick.value *= 2,
        end: () => manualClick.value /=2
    },
    {
        name: 'Двойной автоклик',
        duration: Math.floor(Math.random() * (30 - 1)) + 1,
        cooldown: 15,
        action: () => autoClick.value *= 2,
        end: () => autoClick.value /=2
    },  
    {
        name: 'Шанс критического клика +30%',
        duration: Math.floor(Math.random() * (30 - 1)) + 1,
        cooldown: 30,
        action: () => luckyChance.value +=0.3,
        end: () => luckyChance.value -=0.3
    },   
]

  const randomlySelectedBonus = ref<Bonus>(bonuses[0])
  const isBonusActive = ref(false)
  const bonusName = ref('')
  const bonusCooldown = ref(0)
  const bonusDuration = ref(0)
  const isBonusFalling = ref(false)
  const fallingBonusCoordinate = ref('65vw')
  
  const isBonusDropped = computed(() => {
    const dropChance = 0.3
    if (currentClickRate.value > 5 && bonusCooldown.value === 0) {
      return Math.random() > dropChance
    } else {
      return false
    }
  })

  const formattedXp = computed(() => xp.value.toFixed(1))
  const formattedCurrency = computed(() => currency.value.toFixed(1))

  const savedProgress = computed(() => ({
    score: currency.value,
    maxScore: maxCurrency.value,
    clickStep: autoClick.value,
    upgrades: boughtUpgrades.value
  }))

  const cpsValue = computed(() => autoClick.value + currentClickRate.value)

  const currentLevel = computed(() => {
    return Levels.reduce((acc, level, index) => {
      return xp.value >= level.requiredCurrency ? index : acc
    }, 0)
  })

  const currentLevelProgress = computed(() => {
    const levelEnd = Levels[currentLevel.value + 1].requiredCurrency
    const levelStart = Levels[currentLevel.value].requiredCurrency
    return ((xp.value - levelStart)/(levelEnd - levelStart)) * 400
  })

  const currentProfit = computed((): Profit => {
    const profitObj = Levels[currentLevel.value]
    const { profitReceived } = profitObj
    return profitReceived
  })

  const leftToNextLevel = computed(() => Levels[currentLevel.value + 1].requiredCurrency)

  watch(currentProfit, (newVal: Profit) => {
    const {bonus, color, skin} = newVal
    currentColor.value = color
    manualClick.value += bonus 
    if (skin) currentSkin.value = skin
  })

  watch(
    savedProgress,
    throttle((newValue) => {
      localStorage.setItem("score", JSON.stringify(newValue))
    }, 1000)
  )


  watch(isBonusDropped, (newValue, oldValue) => {
      isBonusFalling.value = true
      setTimeout(() => {
        isBonusFalling.value = false
        fallingBonusCoordinate.value = (Math.floor(Math.random() * (65 - 25)) + 25) + "vw"
      }, 6000)
    }
  )
  
  return { 
    xp,
    formattedXp,
    manualClick,
    cpsValue, 
    autoClick, 
    luckyChance,
    currency, 
    currentClickRate, 
    clickCounter, 
    boughtUpgrades, 
    receivedAchievements,
    formattedCurrency, 
    savedProgress, 
    currentLevel,
    currentLevelProgress,
    currentSkin,
    leftToNextLevel,
    maxCurrency, 
    currentColor,
    bonuses,
    randomlySelectedBonus,
    isBonusActive,
    bonusDuration,
    bonusCooldown,
    bonusName,
    isBonusDropped,
    isBonusFalling,
    fallingBonusCoordinate
  }
})
