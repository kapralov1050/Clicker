<template>
  <div class="container no-selection">
    <img :src="`${backgroundImageLink}`" class="bg-image">
    <div class="content" v-show="isTurnedOn">
      <BoostActions @catch="activateBonus"/>
      <div class="main-field">
        <div class="main-field__block">
          <img :src="gameStore.currentSkin" width="300px" height="300px"/>
          <p 
            v-show="gameStore.isBonusActive" 
            :class="{bonus: gameStore.isBonusActive}"
          >
            {{ gameStore.bonusName }}
          </p>
          <p v-show="gameStore.isBonusActive">
            {{ gameStore.bonusName }} {{ gameStore.bonusDuration }}
          </p>
        </div>
        <div class="main-field__block">
          <p>Вы зарабатываете {{ gameStore.cpsValue.toFixed(1) }} опыта в секунду</p>
          <p class="main-field__currency">{{ gameStore.formattedCurrency }}</p>
          <ProgressBar :progress="gameStore.currentLevelProgress"/>
          <p>Уровень: {{ gameStore.currentLevel }}</p>
          <ClickerModel @increase="increaseValue"/>
          <PlayerAchievements />
        </div>
      </div>
      <div class="shop">
        <h2>Стек</h2>
        <UpgradesPanel @buy="buyUpgrade"/>
      </div>
    </div>
    <button class="help-buttons reset" @click="handleReset">
      Reset
    </button>
    <button class="help-buttons power-button" @click="toggleBackground">
      {{ isTurnedOn ? "Off" : "On" }}
    </button>
  </div>
</template>


<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { useGameStore } from "./stores/game";
import { useAutoClick } from "./composables/useAutoClick";
import { useManualCLick } from "./composables/useManualClick";
import { useUpgrades } from "./composables/useUpgrades";
import UpgradesPanel from "./components/UpgradesPanel.vue";
import ProgressBar from "./components/ProgressBar.vue";
import BoostActions from "./components/BoostActions.vue";
import { useBonus } from "./composables/useBonus";
import PlayerAchievements from "./components/PlayerAchievements.vue";
import ClickerModel from "./components/ClickerModel.vue";

const gameStore = useGameStore();

const { clickerLoop } = useAutoClick();
const { increaseValue } = useManualCLick();
const { buyUpgrade } = useUpgrades();
const { activateBonus } = useBonus();

const handleReset = () => {
  localStorage.removeItem("score");
  gameStore.xp = 0;
  gameStore.currency = 0;
  gameStore.autoClick = 0.1;
  gameStore.maxCurrency = -1;
  gameStore.currentColor = "gray";
  gameStore.boughtUpgrades = [];
  gameStore.currentSkin = "/icons/1.png";
  gameStore.receivedAchievements = [];
};

const backgroundImageLink = ref("../icons/background3-inactive.png");
const isTurnedOn = ref(false);

const toggleBackground = () => {
  if (isTurnedOn.value) {
    backgroundImageLink.value = "../icons/background3-inactive.png";
  } else {
    backgroundImageLink.value = "../icons/background2-active.png";
  }

  isTurnedOn.value = !isTurnedOn.value;
};

let intervalId: number;

onMounted(() => {
  clickerLoop();

  const savedState = JSON.parse(localStorage.getItem("score") || "null");
  const { 
          score,
          maxScore,
          autoclick,
          upgrades,
          xp,
          currentSkin,
          currentColor,
          achievements
         } = savedState;

  gameStore.currency = score;
  gameStore.autoClick = autoclick;
  gameStore.boughtUpgrades = upgrades;
  gameStore.maxCurrency = maxScore;
  gameStore.xp = xp;
  gameStore.currentSkin = currentSkin;
  gameStore.currentColor = currentColor;
  gameStore.receivedAchievements = achievements;

  intervalId = setInterval(() => {
    gameStore.currentClickRate = gameStore.clickCounter;
    gameStore.xp += gameStore.autoClick * 0.2;
    gameStore.clickCounter = 0;
  }, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>


<style scoped lang="scss">
* {
  font-family: "Roboto", sans-serif;
}

.no-selection {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.container {
  position: fixed;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}

.bg-image {
  position: fixed;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
  top: 0;
  left: 0;
}

.content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding-bottom: 15rem;
  width: 1200px;
  margin: 0 auto;
}

.achievements {
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.main-field {
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  gap: 1rem;

  &__block {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: rgb(99, 99, 99);
  }

  &__currency {
    font-size: 1.5rem;
  }
}

.shop {
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  color: rgb(68, 68, 68);
}

.progress-bar {
  width: 400px;
  height: 50px;
  border: 1px solid rgb(207, 207, 207);
  box-shadow: 5px 5px 15px rgba(75, 75, 75, 0.3);
}

.help-buttons {
  width: 80px;
  height: 40px;
  position: absolute;
  outline: none;
  border: 1px solid rgb(117, 117, 117);
  box-shadow: 3px 5px rgb(65, 65, 65);
  color: rgb(221, 217, 214);
  font-size: 1.3rem;
  padding: 0.3rem;
  border-radius: 10px;
  bottom: 16%;
}

.help-buttons:active {
  box-shadow: none;
  background-color: rgb(126, 126, 126);
}

.power-button {
  background-color: rgb(190, 87, 87);
  right: 53%;
}

.reset {
  right: 47%;
  background-color: rgb(107, 107, 107);
}

.bonus {
  position: absolute;
  font-size: 1.8rem;
  font-weight: 900;
  color: #fff;
  background: rgb(11, 143, 196);
  padding: 0.5rem 1.5rem;
  border-radius: 2rem;
  border: 3px solid #fff;
  box-shadow: 
    inset 0 0 15px rgba(255, 255, 255, 0.5);
  animation: 
    float-up 1.5s ease-out forwards,
    pulse 0.8s infinite alternate;
  z-index: 1000;
  white-space: nowrap;
}

@keyframes float-up {
  0% { 
    transform: translateY(0) scale(0.8);
    opacity: 0.5;
  }
  50% {
    transform: translateY(-50px) scale(1.1);
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) scale(1);
    opacity: 0;
  }
}
</style>