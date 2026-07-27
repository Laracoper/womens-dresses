<script setup>
import { ref, computed } from 'vue'
import { generateProducts } from './products'

// Получаем массив из 299 платьев
const allProducts = generateProducts()

// Состояние фильтров (реактивные массивы для чекбоксов)
const selectedCategories = ref([])
const selectedSizes = ref([])
const selectedColors = ref([])
const maxPrice = ref(12000)
const sortBy = ref('popular') // Сортировка по умолчанию

// Списки для рендеринга чекбоксов в интерфейсе
const categoriesList = ['Мини-юбка', 'Вечернее платье', 'Миди-платье', 'Макси-платье', 'Коктейльное платье']
const sizesList = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL']
const colorsList = ['black', 'red', 'white', 'blue', 'beige', 'pink']

// Логика фильтрации и сортировки (Вычисляемое свойство)
const filteredProducts = computed(() => {
  let result = allProducts

  // 1. Фильтр по категориям
  if (selectedCategories.value.length > 0) {
    result = result.filter(p => selectedCategories.value.includes(p.category))
  }

  // 2. Фильтр по размерам (хотя бы один размер совпадает)
  if (selectedSizes.value.length > 0) {
    result = result.filter(p => p.sizes.some(s => selectedSizes.value.includes(s)))
  }

  // 3. Фильтр по цветам (хотя бы один цвет совпадает)
  if (selectedColors.value.length > 0) {
    result = result.filter(p => p.colors.some(c => selectedColors.value.includes(c)))
  }

  // 4. Фильтр по цене
  result = result.filter(p => p.price <= maxPrice.value)

  // 5. Сортировка
  if (sortBy.value === 'low-to-high') {
    result.sort((a, b) => a.price - b.price)
  } else if (sortBy.value === 'high-to-low') {
    result.sort((a, b) => b.price - a.price)
  } else if (sortBy.value === 'popular') {
    result.sort((a, b) => b.rating - a.rating)
  }

  return result
})

// Функция сброса всех фильтров
const resetFilters = () => {
  selectedCategories.value = []
  selectedSizes.value = []
  selectedColors.value = []
  maxPrice.value = 12000
  sortBy.value = 'popular'
}
</script>

<template>
  <div class="shop-container">
    <header class="header">
      <h1>DressCode — Магазин платьев</h1>
    </header>

    <div class="main-layout">
      <!-- Панель Фильтров -->
      <aside class="sidebar">
        <h3>Фильтры</h3>
        <button @click="resetFilters" class="btn-reset">Сбросить все</button>

        <!-- Категории -->
        <div class="filter-group">
          <h4>Категория</h4>
          <label v-for="cat in categoriesList" :key="cat" class="checkbox-label">
            <input type="checkbox" :value="cat" v-model="selectedCategories"> {{ cat }}
          </label>
        </div>

        <!-- Размеры -->
        <div class="filter-group">
          <h4>Размер</h4>
          <label v-for="size in sizesList" :key="size" class="checkbox-label">
            <input type="checkbox" :value="size" v-model="selectedSizes"> {{ size }}
          </label>
        </div>

        <!-- Цвета -->
        <div class="filter-group">
          <h4>Цвет</h4>
          <label v-for="color in colorsList" :key="color" class="checkbox-label">
            <input type="checkbox" :value="color" v-model="selectedColors"> {{ color }}
          </label>
        </div>

        <!-- Цена -->
        <div class="filter-group">
          <h4>Макс. цена: {{ maxPrice }} руб.</h4>
          <input type="range" min="1500" max="12000" step="500" v-model.number="maxPrice" class="range-slider">
        </div>
      </aside>

      <!-- Контентная зона -->
      <main class="content">
        <div class="toolbar">
          <p>Найдено товаров: <b>{{ filteredProducts.length }}</b></p>
          <select v-model="sortBy" class="sort-select">
            <option value="popular">По популярности</option>
            <option value="low-to-high">Сначала дешевые</option>
            <option value="high-to-low">Сначала дорогие</option>
          </select>
        </div>

        <!-- Сетка товаров -->
        <div class="products-grid">
          <div v-for="product in filteredProducts" :key="product.id" class="product-card">
            <img :src="product.image" :alt="product.name" class="product-img">
            <div class="product-info">
              <h5>{{ product.name }}</h5>
              <p class="product-meta">Размеры: {{ product.sizes.join(', ') }}</p>
              <div class="product-footer">
                <span class="price">{{ product.price }} ₽</span>
                <span class="rating">⭐ {{ product.rating }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Базовые стили для быстрой проверки работоспособности */
.shop-container { font-family: sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; }
.header { border-bottom: 2px solid #eee; padding-bottom: 20px; margin-bottom: 20px; }
.main-layout { display: flex; gap: 30px; }
.sidebar { width: 250px; flex-shrink: 0; }
.content { flex-grow: 1; }
.filter-group { margin-bottom: 25px; display: flex; flex-direction: column; gap: 8px; }
.checkbox-label { display: flex; align-items: center; gap: 8px; cursor: pointer; }
.toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; }
.product-card { border: 1px solid #ddd; border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; }
.product-img { width: 100%; height: 280px; object-fit: cover; }
.product-info { padding: 12px; display: flex; flex-direction: column; flex-grow: 1; justify-content: space-between; }
.product-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 10px; }
.price { font-weight: bold; color: #e91e63; }
.btn-reset { margin-bottom: 15px; padding: 6px; cursor: pointer; }
.range-slider { width: 100%; }
</style>
