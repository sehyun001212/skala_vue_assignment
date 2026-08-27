<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="not-found">
    <h2>404</h2>
    <p>요청하신 페이지를 찾을 수 없습니다.</p>
    <RouterLink to="/">메인으로 돌아가기</RouterLink>
  </div>
</template>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background-color: #eef3fb;
  font-family: sans-serif;
}

.not-found h2 {
  font-size: 48px;
  margin: 0;
}
</style>
