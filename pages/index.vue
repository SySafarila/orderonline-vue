<script setup lang="ts">
import { onMounted } from "vue";
import axios from 'axios'
import backend from '../backend.json'

const pokemons = ref<{ name: string; url: string }[]>([])
const isLoading = ref<boolean>(true)

const getPokemons = async () => {
  try {
    const res = await axios.get(`${backend.baseUrl}/pokemons`)
    console.log(res.data);
    pokemons.value = res.data.results
    isLoading.value = false
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  getPokemons()
})
</script>

<template>
  <div class="p-5">
    <h1 class="text-2xl font-bold">List of Pokemons</h1>
    <ul v-if="!isLoading">
      <li v-for="(pokemon, index) in pokemons" :key="index">
        <NuxtLink :to="`/pokemons/${pokemon.name}`" class="hover:underline hover:text-blue-500">{{ pokemon.name }}</NuxtLink>
      </li>
    </ul>
    <p v-else>Loading...</p>
  </div>
</template>
