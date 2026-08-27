<script setup>
defineProps({
  sortOrder: String,
})

const emit = defineEmits(['toggle-sort'])
</script>

<template>
  <button class="sort-btn" @click="emit('toggle-sort')">
    {{ sortOrder === 'asc' ? '🔼 온도 낮은 순' : '🔽 온도 높은 순' }}
  </button>
</template>

<style scoped>
.sort-btn {
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 20px;
  background-color: #ffffff;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.2s;
}

.sort-btn:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
