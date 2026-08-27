<script setup>
import { computed } from 'vue'
import { useConfigStore } from '../../stores/configStore'

const configStore = useConfigStore()

const props = defineProps({
  weather: Object,
  isOpen: Boolean,
  isFavorite: Boolean,
})

const emit = defineEmits(['select-card', 'click-detail', 'toggle-detail', 'toggle-favorite'])

const displayTemp = computed(() => {
  const rawTemp = props.weather.temp
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }
  return rawTemp
})
</script>

<template>
  <el-card class="weather-card" shadow="hover" @click="emit('select-card', weather.name)">
    <el-button circle text class="favorite-btn" @click.stop="emit('toggle-favorite', weather.id)">
      {{ isFavorite ? '⭐' : '☆' }}
    </el-button>

    <h3>{{ weather.name }}</h3>
    <p>{{ displayTemp }}{{ configStore.unitSymbol }}</p>
    <p>{{ weather.status }}</p>

    <el-tag v-if="weather.temp >= 25" type="danger">🔥 더움 (25도 이상)</el-tag>
    <el-tag v-else type="primary">❄️ 선선함 (25도 미만)</el-tag>

    <div class="button-group">
      <el-button size="small" @click.stop="emit('click-detail', weather.id)">상세보기</el-button>
      <el-button size="small" @click.stop="emit('toggle-detail', weather.id)"
        >상세정보 펼치기</el-button
      >
    </div>

    <p v-show="isOpen" class="extra-info">
      {{ weather.name }} 상세정보 - 온도: {{ displayTemp }}{{ configStore.unitSymbol }} / 날씨:
      {{ weather.status }} / 습도: {{ weather.humidity }}% / 미세먼지: {{ weather.dust }}
    </p>
  </el-card>
</template>

<style scoped>
.weather-card {
  width: 220px;
  position: relative;
}

.weather-card h3 {
  margin: 0 24px 4px 0;
}

.favorite-btn {
  position: absolute;
  top: 8px;
  right: 8px;
}

.button-group {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.extra-info {
  margin-top: 8px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 8px;
  font-size: 14px;
  color: #555;
}
</style>
