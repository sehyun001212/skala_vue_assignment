<script setup>
import { RouterLink } from 'vue-router'
import BaseDashboardCard from '../components/weather/BaseDashboardCard.vue'
</script>

<template>
  <div class="about-page">
    <h2>서비스 소개</h2>

    <BaseDashboardCard>
      <p>
        이 앱은 여러 도시의 실시간 날씨를 검색하고, 즐겨찾기와 온도순 정렬로 한눈에 확인할 수 있는
        날씨 대시보드입니다.
      </p>
    </BaseDashboardCard>

    <RouterLink to="/" class="back-link">메인 대시보드로 돌아가기</RouterLink>
  </div>
</template>

<style scoped>
.about-page {
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

.about-page h2 {
  width: 100%;
  max-width: 960px;
  font-size: 32px;
  margin-bottom: 24px;
  text-align: center;
}

.about-page p {
  line-height: 1.6;
  color: #555;
  text-align: center;
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
