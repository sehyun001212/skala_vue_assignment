<script setup></script>

<template>
  <div class="dashboard-card">
    <slot></slot>
  </div>
</template>

<style scoped>
.dashboard-card {
  width: 100%;
  max-width: 960px;
  box-sizing: border-box;
  background-color: #ffffff;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 16px;
}
</style>
