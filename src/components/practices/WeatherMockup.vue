<script setup>
import { ref, computed, watch, watchEffect } from 'vue'

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음', humidity: 55, dust: '좋음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비', humidity: 80, dust: '나쁨' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름', humidity: 65, dust: '보통' },
  { id: 'city_04', name: '제주', temp: 22, status: '흐림', humidity: 70, dust: '좋음' },
])
const searchQuery = ref('')
const selectedCityInfo = ref('')

const filteredWeatherList = computed(() => {
  return weatherList.value.filter((weather) => weather.name.includes(searchQuery.value))
})
watch(selectedCityInfo, (newValue, oldValue) => {
  console.log(`🏙️ [watch] 상태바 변경 감지: [${oldValue}] ➡️ [${newValue}]`)
})
watchEffect(() => {
  console.log(`🔍 [watchEffect] 검색어 변경 감지: "${searchQuery.value}"`)
})

const selectCity = (cityName) => {
  selectedCityInfo.value = `${cityName}이 선택되었습니다.`
}
const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}
const openId = ref('')
const toggleDetail = (id) => {
  openId.value = openId.value === id ? '' : id
}

const favoriteCities = ref([])
const toggleFavorite = (id) => {
  if (favoriteCities.value.includes(id)) {
    favoriteCities.value = favoriteCities.value.filter((favId) => favId !== id)
  } else {
    favoriteCities.value.push(id)
  }
}
watch(
  favoriteCities,
  (newValue) => {
    console.log(`⭐ [watch] 즐겨찾기 목록 변경됨:`, newValue)
  },
  { deep: true },
)

const sortedByFavorite = computed(() => {
  return [...filteredWeatherList.value].sort((a, b) => {
    const aFav = favoriteCities.value.includes(a.id) ? 1 : 0
    const bFav = favoriteCities.value.includes(b.id) ? 1 : 0
    return bFav - aFav
  })
})
</script>

<template>
  <div class="weather-mockup">
    <h2>오늘의 날씨🌈</h2>
    <div class="search-box">
      <label>도시 검색: </label>
      <input
        type="text"
        :value="searchQuery"
        @input="searchQuery = $event.target.value"
        placeholder="도시 이름 입력"
      />
      <p>입력한 도시: {{ searchQuery }}</p>
    </div>
    <p class="status-bar">{{ selectedCityInfo }}</p>
    <div class="weather-list">
      <div
        class="weather-card"
        v-for="weather in sortedByFavorite"
        :key="weather.id"
        @click="selectCity(weather.name)"
      >
        <button @click.stop="toggleFavorite(weather.id)" class="favorite-btn">
          {{ favoriteCities.includes(weather.id) ? '⭐' : '☆' }}
        </button>
        <h3>{{ weather.name }}</h3>
        <p>{{ weather.temp }}°C</p>
        <p>{{ weather.status }}</p>
        <p v-if="weather.temp >= 25" class="hot">🔥 더움 (25도 이상)</p>
        <p v-else class="cool">❄️ 선선함 (25도 미만)</p>
        <button @click.stop="showDetail(weather.name, weather.status)">상세보기</button>
        <button @click.stop="toggleDetail(weather.id)">상세정보 펼치기</button>
        <p v-show="openId === weather.id" class="extra-info">
          {{ weather.name }} 상세정보 - 온도: {{ weather.temp }}°C / 날씨: {{ weather.status }} /
          습도: {{ weather.humidity }}% / 미세먼지: {{ weather.dust }}
        </p>
      </div>
      <p v-if="sortedByFavorite.length === 0" class="no-result">
        검색 결과가 일치하는 도시가 없습니다.
      </p>
    </div>
  </div>
</template>

<style scoped>
.weather-mockup {
  width: 100%;
  min-height: 100vh;
  padding: 48px 64px;
  background-color: #eef3fb;
  font-family: sans-serif;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.weather-mockup h2 {
  width: 100%;
  max-width: 960px;
  font-size: 32px;
  margin-bottom: 24px;
  text-align: center;
}

.search-box {
  width: 100%;
  max-width: 960px;
  box-sizing: border-box;
  background-color: #ffffff;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 16px;
}

.search-box input {
  width: 100%;
  box-sizing: border-box;
  padding: 8px 12px;
  margin-top: 6px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
}

.status-bar {
  width: 100%;
  max-width: 960px;
  box-sizing: border-box;
  min-height: 20px;
  padding: 10px 16px;
  margin-bottom: 24px;
  background-color: #eaf7ea;
  color: #2e7d32;
  border-radius: 8px;
  font-weight: bold;
  text-align: center;
}

.weather-list {
  width: 100%;
  max-width: 960px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  align-items: flex-start;
}

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
  margin: 0 0 4px;
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

.no-result {
  width: 100%;
  text-align: center;
  padding: 24px;
  color: #999;
  font-style: italic;
}
</style>
