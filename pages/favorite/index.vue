<script setup lang="ts">
import axios from "axios";
import Swal from "sweetalert2";
import { onMounted, watch } from "vue";
import backend from '../../backend.json';
import type { PokemonFavorite } from "~/utils/types";

const pokemons = ref<PokemonFavorite[]>([])
const isLoading = ref<boolean>(true)
const pokemonName = ref<string | null>(null)
const router = useRouter()
const route = useRoute()

const getFavorite = async () => {
    try {
        const res = await axios.get(`${backend.baseUrl}/favorite`, {
            params: {
                pokemon_name: pokemonName.value
            }
        })
        console.log(res.data);
        pokemons.value = res.data as PokemonFavorite[]
        isLoading.value = false
    } catch (error: any) {
        console.error(error)
        Swal.fire({
            icon: "error",
            title: error.message,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false
        })
    }
}

const handleSubmit = (event: Event) => {
    event.preventDefault();
    console.log(pokemonName.value);
    router.push(`?pokemon_name=${pokemonName.value}`)
}

onMounted(() => {
    getFavorite()
})

watch(() => route.query, () => {
    isLoading.value = true
    getFavorite()
})
</script>

<template>
    <div class="p-5">
        <h1 class="text-2xl font-bold">List of Favorite Pokemons</h1>
        <form @submit="handleSubmit" class="flex flex-col gap-2">
            <div class="flex flex-col gap-1">
                <label for="pokemon_name">Pokemon Name</label>
                <input v-model="pokemonName" type="text" name="pokemon_name" id="pokemon_name"
                    class="px-3 py-1 border rounded" placeholder="Search pokemon">
            </div>
            <div>
                <button type="submit" class="bg-gray-100 border hover:bg-gray-200 px-3 py-1 rounded">Search</button>
            </div>
        </form>
        <div v-if="!isLoading">
            <ul class="mt-2">
                <li v-for="(pokemon, index) in pokemons" :key="index">
                    <NuxtLink :to="`/pokemons/${pokemon.pokemon_name}`" class="hover:underline hover:text-blue-500">{{
                        pokemon.pokemon_name }}
                    </NuxtLink>
                </li>
            </ul>
        </div>
        <p v-if="isLoading">Loading...</p>
        <p v-if="!isLoading && pokemons.length === 0">You don't have any favorite Pokemons</p>
    </div>
</template>