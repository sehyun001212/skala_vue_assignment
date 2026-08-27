<script setup>
import { ref, computed, watch, watchEffect } from 'vue'
import BaseDashboardCard from './BaseDashboardCard.vue'
import SearchBar from './SearchBar.vue'
import WeatherCard from './WeatherCard.vue'
import SortControl from './SortControl.vue'

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음', humidity: 55, dust: '좋음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비', humidity: 80, dust: '나쁨' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름', humidity: 65, dust: '보통' },
  { id: 'city_04', name: '제주', temp: 22, status: '흐림', humidity: 70, dust: '좋음' },
])
const searchQuery = ref('')
const selectedCityInfo = ref('')
const openId = ref('')
const favoriteCities = ref([])
const sortOrder = ref('asc')

const filteredWeatherList = computed(() => {
  return weatherList.value.filter((weather) => weather.name.includes(searchQuery.value))
})

const sortedWeatherList = computed(() => {
  return [...filteredWeatherList.value].sort((a, b) => {
    const aFav = favoriteCities.value.includes(a.id) ? 1 : 0
    const bFav = favoriteCities.value.includes(b.id) ? 1 : 0

    if (aFav !== bFav) {
      return bFav - aFav
    }

    return sortOrder.value === 'asc' ? a.temp - b.temp : b.temp - a.temp
  })
})

watch(selectedCityInfo, (newValue, oldValue) => {
  console.log(`[watch] 상태바 변경 감지: [${oldValue}] ➡️ [${newValue}]`)
})

watchEffect(() => {
  console.log(`[watchEffect] 검색어 변경 감지: "${searchQuery.value}"`)
})

watch(
  favoriteCities,
  (newValue) => {
    console.log(`⭐ [watch] 즐겨찾기 목록 변경됨:`, newValue)
  },
  { deep: true },
)

const updateQuery = (value) => {
  searchQuery.value = value
}

const selectCity = (cityName) => {
  selectedCityInfo.value = `${cityName}이 선택되었습니다.`
}

const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}

const toggleDetail = (id) => {
  openId.value = openId.value === id ? '' : id
}

const toggleFavorite = (id) => {
  if (favoriteCities.value.includes(id)) {
    favoriteCities.value = favoriteCities.value.filter((favId) => favId !== id)
  } else {
    favoriteCities.value.push(id)
  }
}

const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}
</script>

<template>
  <div class="weather-parent">
    <h2>오늘의 날씨🌈</h2>

    <BaseDashboardCard>
      <SearchBar :search-query="searchQuery" @update-query="updateQuery" />
    </BaseDashboardCard>

    <p class="status-bar">{{ selectedCityInfo }}</p>

    <div class="sort-control-wrapper">
      <SortControl :sort-order="sortOrder" @toggle-sort="toggleSortOrder" />
    </div>

    <BaseDashboardCard>
      <div class="weather-list">
        <WeatherCard
          v-for="weather in sortedWeatherList"
          :key="weather.id"
          :weather="weather"
          :is-open="openId === weather.id"
          :is-favorite="favoriteCities.includes(weather.id)"
          @select-card="selectCity"
          @click-detail="showDetail"
          @toggle-detail="toggleDetail"
          @toggle-favorite="toggleFavorite"
        />
        <p v-if="sortedWeatherList.length === 0" class="no-result">
          검색 결과가 일치하는 도시가 없습니다.
        </p>
      </div>
    </BaseDashboardCard>
  </div>
</template>

<style scoped>
.weather-parent {
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

.weather-parent h2 {
  width: 100%;
  max-width: 960px;
  font-size: 32px;
  margin-bottom: 24px;
  text-align: center;
}

.status-bar {
  width: 100%;
  max-width: 960px;
  box-sizing: border-box;
  min-height: 20px;
  padding: 10px 16px;
  margin-bottom: 16px;
  background-color: #eaf7ea;
  color: #2e7d32;
  border-radius: 8px;
  font-weight: bold;
  text-align: center;
}

.sort-control-wrapper {
  width: 100%;
  max-width: 960px;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
}

.weather-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  align-items: flex-start;
  max-width: 700px;
  margin: 0 auto;
}

.no-result {
  width: 100%;
  text-align: center;
  padding: 24px;
  color: #999;
  font-style: italic;
}
</style>
