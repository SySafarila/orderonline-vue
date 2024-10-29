<script setup lang="ts">
import { onMounted, watch } from "vue";
import axios from 'axios'
import backend from '../backend.json'

const route = useRoute()
const pokemons = ref<{ name: string; url: string }[]>([])
const next = ref<string | null>()
const prev = ref<string | null>()
const isLoading = ref<boolean>(true)

const getPokemons = async () => {
  try {
    const res = await axios.get(`${backend.baseUrl}/pokemons`, {
      params: {
        limit: route.query.limit,
        offset: route.query.offset,
      }
    })

    pokemons.value = res.data.results
    if (res.data.next) {
      next.value = new URL(res.data.next).search
    } else {
      next.value = null
    }
    if (res.data.previous) {
      prev.value = new URL(res.data.previous).search
    } else {
      prev.value = null
    }
    isLoading.value = false

  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  getPokemons()
})

watch(() => route.query, () => {
  getPokemons()
})
</script>

<template>
  <div class="p-5">
    <h1 class="text-2xl font-bold">List of Pokemons</h1>
    <div v-if="!isLoading">
      <ul class="mt-2">
        <li v-for="(pokemon, index) in pokemons" :key="index">
          <NuxtLink :to="`/pokemons/${pokemon.name}`" class="hover:underline hover:text-blue-500">{{ pokemon.name }}
          </NuxtLink>
        </li>
      </ul>
      <div class="flex items-center gap-2 mt-4">
        <NuxtLink :to="prev" v-if="prev !== null" class="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded border">
          Previous</NuxtLink>
        <NuxtLink :to="next" v-if="next !== null" class="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded border">Next
        </NuxtLink>
      </div>
    </div>
    <p v-else class="mt-2">Loading...</p>
  </div>
</template>
