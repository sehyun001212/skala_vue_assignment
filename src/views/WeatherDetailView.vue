<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import axios from 'axios'
import { useConfigStore } from '../stores/configStore'

const route = useRoute()
const configStore = useConfigStore()

const cityInfo = ref(null)
const isLoading = ref(true)
const cityIntro = ref('')

const cityNameMap = {
  Seoul: '서울특별시',
  Busan: '부산광역시',
  Incheon: '인천광역시',
  Daegu: '대구광역시',
  Daejeon: '대전광역시',
  Gwangju: '광주광역시',
  Suwon: '수원시',
  Jeju: '제주시',
  Wonju: '원주시',
  Gangneung: '강릉시',
  Chuncheon: '춘천시',
  Yangyang: '양양군',
}

const fetchCityIntro = async (cityId) => {
  try {
    const koreanFullName = cityNameMap[cityId] || cityId
    const response = await axios.get(
      `https://ko.wikipedia.org/api/rest_v1/page/summary/${koreanFullName}`,
    )
    cityIntro.value = response.data.extract
  } catch (error) {
    console.log('도시 소개 불러오기 실패:', error.message)
    cityIntro.value = '도시 소개 정보를 불러올 수 없습니다.'
  }
}

const fetchCityDetail = async () => {
  const cityId = route.params.cityId

  const weatherResponse = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      q: cityId,
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

  cityInfo.value = {
    name: weatherResponse.data.name,
    temp: Math.round(weatherResponse.data.main.temp),
    status: weatherResponse.data.weather[0].description,
    humidity: weatherResponse.data.main.humidity,
    dust: pollutionResponse.data.list[0].components.pm10,
  }

  isLoading.value = false

  fetchCityIntro(cityId)
}

onMounted(() => {
  fetchCityDetail()
})

const displayTemp = computed(() => {
  if (!cityInfo.value) return 0
  const rawTemp = cityInfo.value.temp
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }
  return rawTemp
})
</script>

<template>
  <div class="detail-page">
    <div v-if="cityInfo" class="detail-card">
      <h2>{{ cityInfo.name }} 상세 기상관측 정보</h2>
      <p>온도: {{ displayTemp }}{{ configStore.unitSymbol }}</p>
      <p>날씨: {{ cityInfo.status }}</p>
      <p>습도: {{ cityInfo.humidity }}%</p>
      <p>미세먼지(PM10): {{ cityInfo.dust }}㎍/m³</p>
      <p class="city-intro">{{ cityIntro }}</p>
    </div>
    <p v-else-if="!isLoading">해당 도시 정보를 찾을 수 없습니다.</p>
    <RouterLink to="/">메인으로 돌아가기</RouterLink>
  </div>
</template>

<style scoped>
.detail-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 48px;
  background-color: #eef3fb;
  font-family: sans-serif;
  box-sizing: border-box;
}

.detail-card {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  text-align: center;
  max-width: 480px;
}

.detail-card p {
  margin: 8px 0;
}

.city-intro {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #eee;
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  text-align: left;
}
</style>
