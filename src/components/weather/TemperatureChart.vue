<script setup>
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps({
  weatherList: Array,
})

const SKY_BLUE = { r: 135, g: 206, b: 235 }
const RED = { r: 255, g: 0, b: 0 }

const getBarColor = (temp, minTemp, maxTemp) => {
  const ratio = maxTemp === minTemp ? 0.5 : (temp - minTemp) / (maxTemp - minTemp)
  const r = Math.round(SKY_BLUE.r + (RED.r - SKY_BLUE.r) * ratio)
  const g = Math.round(SKY_BLUE.g + (RED.g - SKY_BLUE.g) * ratio)
  const b = Math.round(SKY_BLUE.b + (RED.b - SKY_BLUE.b) * ratio)
  return `rgb(${r}, ${g}, ${b})`
}

const chartData = computed(() => {
  const temps = props.weatherList.map((weather) => weather.temp)
  const minTemp = Math.min(...temps)
  const maxTemp = Math.max(...temps)

  return {
    labels: props.weatherList.map((weather) => weather.name),
    datasets: [
      {
        label: '온도 (°C)',
        backgroundColor: temps.map((temp) => getBarColor(temp, minTemp, maxTemp)),
        data: temps,
      },
    ],
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: '도시별 온도 비교',
      font: {
        size: 18,
      },
    },
  },
}
</script>

<template>
  <div class="chart-wrapper">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped>
.chart-wrapper {
  width: 100%;
  max-width: 960px;
  height: 300px;
  background-color: #ffffff;
  padding: 24px;
  border-radius: 12px;
  margin-bottom: 24px;
  box-sizing: border-box;
}
</style>
