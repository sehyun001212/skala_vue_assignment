<script setup>
import { useConfigStore } from '../../stores/configStore'

const configStore = useConfigStore()
</script>

<template>
  <button class="unit-toggler" @click="configStore.toggleUnit">
    {{ configStore.unit === 'celsius' ? '℉' : '℃' }} 로 보기
  </button>
</template>

<style scoped>
.unit-toggler {
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 20px;
  background-color: #ffffff;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
}
</style>
