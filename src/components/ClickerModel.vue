<template>
  <div class="canvas-container">
    <TresCanvas>
      <TresPerspectiveCamera :position="[3, 3, 3]" />
      <OrbitControls
        :enablePan="false"
        :enableRotate="false"
      />

      <Suspense>
        <GLTFModel
          path="/3d model/scene.glb"
          :scale="[modelScale.x, modelScale.y, modelScale.z]"
          :rotation="[-0.5, rotationY, 0.05]"
          @click="handleClick"
        /> 
      </Suspense>

      <TresAmbientLight :intensity="1" />
      <TresDirectionalLight 
        :position="[0, 8, 4]" 
        :intensity="1.5"
      />
    </TresCanvas>
  </div>
</template>


<script setup lang="ts">
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { OrbitControls, GLTFModel } from '@tresjs/cientos'
import { computed, onUnmounted, reactive, ref } from 'vue'
import gsap from 'gsap'
import { useGameStore } from '@/stores/game'

const gameStore = useGameStore()

const emit = defineEmits(['increase'])

const modelScale = reactive({x: 1, y: 1, z: 1})
const rotationY = ref(0)
const isScaling = ref(false)

const rotationSpeed = computed(() => {
  return gameStore.autoClick * 0.2 + gameStore.cpsValue * 0.02
})

const { onLoop } = useRenderLoop()
onLoop(({ delta }) => {
    rotationY.value += delta * rotationSpeed.value
})

function handleClick(){
  emit('increase')


  if (isScaling.value) return
  isScaling.value = true

  gsap.to(modelScale, {
    x: 0.95,
    y: 0.95,
    z: 0.95,
    duration: 0.05,
    yoyo: true,
    repeat: 1,
    onComplete: () => {
      isScaling.value = false
    }
  })
}

onUnmounted(() => {
  onLoop(() => {})
})
</script>


<style scoped lang='scss'>
.canvas-container {
  width: 250px;
  height: 250px;
}
</style>