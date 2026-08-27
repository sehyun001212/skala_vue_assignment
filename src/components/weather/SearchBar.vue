<script setup>
defineProps({
  searchQuery: String,
})

const emit = defineEmits(['update-query'])
</script>

<template>
  <div class="search-bar">
    <label>도시 검색: </label>
    <el-input
      :model-value="searchQuery"
      @update:model-value="(value) => emit('update-query', value)"
      placeholder="도시 이름 입력"
    />
    <p>입력한 도시: {{ searchQuery }}</p>
  </div>
</template>

<style scoped>
.search-bar input {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 14px;
  margin-top: 6px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 15px;
}
.search-bar p {
  margin-top: 12px;
}
</style>
