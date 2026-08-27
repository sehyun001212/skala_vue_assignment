import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFavoriteStore = defineStore('favorite', () => {
  const favoriteCities = ref([])

  const toggleFavorite = (id) => {
    if (favoriteCities.value.includes(id)) {
      favoriteCities.value = favoriteCities.value.filter((favId) => favId !== id)
    } else {
      favoriteCities.value.push(id)
    }
  }

  return { favoriteCities, toggleFavorite }
})
