<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import axios from 'axios'
import { useFavoriteStore } from '../stores/favoriteStore'
import { useConfigStore } from '../stores/configStore'
import BaseDashboardCard from '../components/weather/BaseDashboardCard.vue'

const favoriteStore = useFavoriteStore()
const configStore = useConfigStore()

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

const weatherList = ref([])
const isLoading = ref(true)

const fetchWeatherData = async () => {
  const results = []
  for (const city of cityList) {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city.key,
        appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
        units: 'metric',
        lang: 'kr',
      },
    })
    results.push({
      id: city.key,
      name: city.koreanName,
      temp: Math.round(response.data.main.temp),
      status: response.data.weather[0].description,
    })
  }
  weatherList.value = results
  isLoading.value = false
}

onMounted(() => {
  fetchWeatherData()
})

const favoriteWeatherList = computed(() => {
  return weatherList.value.filter((weather) => favoriteStore.favoriteCities.includes(weather.id))
})
</script>

<template>
  <div class="favorite-page">
    <h2>즐겨찾기한 도시</h2>

    <BaseDashboardCard>
      <div class="favorite-list" v-loading="isLoading">
        <div class="favorite-card" v-for="weather in favoriteWeatherList" :key="weather.id">
          <h3>{{ weather.name }}</h3>
          <p>{{ weather.temp }}{{ configStore.unitSymbol }}</p>
          <p>{{ weather.status }}</p>
          <el-tag v-if="weather.temp >= 25" type="danger">🔥 더움 (25도 이상)</el-tag>
          <el-tag v-else type="primary">❄️ 선선함 (25도 미만)</el-tag>
        </div>
        <p v-if="!isLoading && favoriteWeatherList.length === 0" class="no-result">
          즐겨찾기한 도시가 없습니다.
        </p>
      </div>
    </BaseDashboardCard>

    <RouterLink to="/" class="back-link">메인으로 돌아가기</RouterLink>
  </div>
</template>

<style scoped>
.favorite-page {
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

.favorite-page h2 {
  width: 100%;
  max-width: 960px;
  font-size: 32px;
  margin-bottom: 24px;
  text-align: center;
}

.favorite-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: flex-start;
  max-width: 700px;
  min-height: 220px;
  width: 100%;
  margin: 0 auto;
}

.favorite-card {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  width: 220px;
  box-sizing: border-box;
}

.no-result {
  width: 100%;
  text-align: center;
  padding: 24px;
  color: #999;
  font-style: italic;
}

.back-link {
  margin-top: 16px;
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

.back-link:hover {
  color: #42b883;
}
</style>
