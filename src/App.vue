<script setup>
import { RouterLink, RouterView } from 'vue-router'
import UnitToggle from './components/weather/UnitToggle.vue'
</script>

<template>
  <nav class="nav-bar">
    <div class="nav-links">
      <RouterLink to="/">홈</RouterLink>
      <RouterLink to="/about">소개</RouterLink>
      <RouterLink to="/favorites">즐겨찾기</RouterLink>
    </div>
    <UnitToggle />
  </nav>
  <RouterView />
</template>

<style scoped>
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 64px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
}

.nav-links {
  display: flex;
  gap: 16px;
}

.nav-links a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

.nav-links a:hover {
  color: #42b883;
}
</style>
