<script setup>
import { ref, computed, watch, watchEffect, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useFavoriteStore } from '../stores/favoriteStore'
import BaseDashboardCard from '../components/weather/BaseDashboardCard.vue'
import SearchBar from '../components/weather/SearchBar.vue'
import WeatherCard from '../components/weather/WeatherCard.vue'
import { ElMessage } from 'element-plus'
import TemperatureChart from '../components/weather/TemperatureChart.vue'

const router = useRouter()

const favoriteStore = useFavoriteStore()

const weatherList = ref([])
const isLoading = ref(true)

const cityList = [
  { key: 'Seoul', koreanName: '서울' },
  { key: 'Busan', koreanName: '부산' },
  { key: 'Incheon', koreanName: '인천' },
  { key: 'Daegu', koreanName: '대구' },
  { key: 'Daejeon', koreanName: '대전' },
  { key: 'Gwangju', koreanName: '광주' },
  { key: 'Suwon', koreanName: '수원' },
  { key: 'Jeju', koreanName: '제주' },
  { key: 'Wonju', koreanName: '원주' },
  { key: 'Gangneung', koreanName: '강릉' },
  { key: 'Chuncheon', koreanName: '춘천' },
  { key: 'Yangyang', koreanName: '양양' },
]

const getDustLevel = (pm10) => {
  if (pm10 <= 30) return '좋음'
  if (pm10 <= 80) return '보통'
  if (pm10 <= 150) return '나쁨'
  return '매우나쁨'
}

const fetchWeatherData = async () => {
  const results = []
  for (const city of cityList) {
    const weatherResponse = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city.key,
        appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
        units: 'metric',
        lang: 'kr',
      },
    })

    const { lat, lon } = weatherResponse.data.coord

    const pollutionResponse = await axios.get(
      'https://api.openweathermap.org/data/2.5/air_pollution',
      {
        params: {
          lat: lat,
          lon: lon,
          appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
        },
      },
    )

    const pm10 = pollutionResponse.data.list[0].components.pm10

    results.push({
      id: city.key,
      name: city.koreanName,
      temp: Math.round(weatherResponse.data.main.temp),
      status: weatherResponse.data.weather[0].description,
      humidity: weatherResponse.data.main.humidity,
      dust: getDustLevel(pm10),
    })
  }
  weatherList.value = results
  isLoading.value = false
}

onMounted(() => {
  fetchWeatherData()
})

const searchQuery = ref('')
const selectedCityInfo = ref('')
const openId = ref('')
const sortOrder = ref('asc')

const filteredWeatherList = computed(() => {
  return weatherList.value.filter((weather) => weather.name.includes(searchQuery.value))
})

const sortedWeatherList = computed(() => {
  return [...filteredWeatherList.value].sort((a, b) => {
    const aFav = favoriteStore.favoriteCities.includes(a.id) ? 1 : 0
    const bFav = favoriteStore.favoriteCities.includes(b.id) ? 1 : 0
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
  () => favoriteStore.favoriteCities,
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

const goToDetail = (id) => {
  router.push('/weather/' + id)
}

const toggleDetail = (id) => {
  openId.value = openId.value === id ? '' : id
}

const handleToggleFavorite = (id) => {
  favoriteStore.toggleFavorite(id)
  if (favoriteStore.favoriteCities.includes(id)) {
    ElMessage.success('즐겨찾기에 추가되었습니다.')
  } else {
    ElMessage.info('즐겨찾기가 해제되었습니다.')
  }
}
</script>

<template>
  <div class="weather-home">
    <h2>오늘의 날씨🌈</h2>

    <BaseDashboardCard>
      <SearchBar :search-query="searchQuery" @update-query="updateQuery" />
    </BaseDashboardCard>

    <p class="status-bar">{{ selectedCityInfo }}</p>

    <BaseDashboardCard>
      <div
        class="weather-list"
        v-loading="isLoading"
        element-loading-text="날씨 정보를 불러오는 중입니다..."
      >
        <WeatherCard
          v-for="weather in sortedWeatherList"
          :key="weather.id"
          :weather="weather"
          :is-open="openId === weather.id"
          :is-favorite="favoriteStore.favoriteCities.includes(weather.id)"
          @select-card="selectCity"
          @click-detail="goToDetail(weather.id)"
          @toggle-detail="toggleDetail"
          @toggle-favorite="handleToggleFavorite"
        />
        <p v-if="!isLoading && sortedWeatherList.length === 0" class="no-result">
          검색 결과가 일치하는 도시가 없습니다.
        </p>
      </div>
    </BaseDashboardCard>

    <div
      v-loading="isLoading"
      element-loading-text="도시별 온도를 비교하는 중입니다..."
      class="chart-loading-wrapper"
    >
      <TemperatureChart :weather-list="sortedWeatherList" />
    </div>
  </div>
</template>

<style scoped>
.weather-home {
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

.weather-home h2 {
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

.weather-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  align-items: flex-start;
  max-width: 700px;
  min-height: 220px;
  width: 100%;
  margin: 0 auto;
}

.no-result {
  width: 100%;
  text-align: center;
  padding: 24px;
  color: #999;
  font-style: italic;
}

.chart-loading-wrapper {
  width: 100%;
  max-width: 960px;
  min-height: 300px;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 24px;
  box-sizing: border-box;
}
</style>
