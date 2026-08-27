<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="about-page">
    <h2>서비스 소개</h2>
    <p>
      이 앱은 여러 도시의 실시간 날씨를 검색하고, 즐겨찾기와 온도순 정렬로 한눈에 확인할 수 있는
      날씨 대시보드입니다.
    </p>
    <RouterLink to="/">메인 대시보드로 돌아가기</RouterLink>
  </div>
</template>

<style scoped>
.about-page {
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
  text-align: center;
}

.about-page p {
  max-width: 480px;
  line-height: 1.6;
  color: #555;
}
</style>
