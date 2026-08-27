<script setup>
defineProps({
  weather: Object,
  isOpen: Boolean,
  isFavorite: Boolean,
})

const emit = defineEmits(['select-card', 'click-detail', 'toggle-detail', 'toggle-favorite'])
</script>

<template>
  <div class="weather-card" @click="emit('select-card', weather.name)">
    <button @click.stop="emit('toggle-favorite', weather.id)" class="favorite-btn">
      {{ isFavorite ? '⭐' : '☆' }}
    </button>
    <h3>{{ weather.name }}</h3>
    <p>{{ weather.temp }}°C</p>
    <p>{{ weather.status }}</p>
    <p v-if="weather.temp >= 25" class="hot">🔥 더움 (25도 이상)</p>
    <p v-else class="cool">❄️ 선선함 (25도 미만)</p>
    <button @click.stop="emit('click-detail', weather.name, weather.status)">상세보기</button>
    <button @click.stop="emit('toggle-detail', weather.id)">상세정보 펼치기</button>
    <p v-show="isOpen" class="extra-info">
      {{ weather.name }} 상세정보 - 온도: {{ weather.temp }}°C / 날씨: {{ weather.status }} / 습도:
      {{ weather.humidity }}% / 미세먼지: {{ weather.dust }}
    </p>
  </div>
</template>

<style scoped>
.weather-card {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  width: 220px;
  box-sizing: border-box;
  position: relative;
}

.weather-card:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
}

.weather-card h3 {
  margin: 0 24px 4px 0;
}

.weather-card button {
  margin-top: 8px;
  margin-right: 8px;
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #ffffff;
  cursor: pointer;
}

.favorite-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
}

.hot {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 999px;
  background-color: #ffe0e0;
  color: #d32f2f;
  font-size: 13px;
}

.cool {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 999px;
  background-color: #e0f0ff;
  color: #1976d2;
  font-size: 13px;
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
