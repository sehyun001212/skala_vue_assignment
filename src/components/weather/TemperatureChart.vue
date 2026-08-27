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

const chartData = computed(() => {
  return {
    labels: props.weatherList.map((weather) => weather.name),
    datasets: [
      {
        label: '온도 (°C)',
        backgroundColor: '#42b883',
        data: props.weatherList.map((weather) => weather.temp),
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
