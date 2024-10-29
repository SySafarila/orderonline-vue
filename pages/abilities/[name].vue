<script setup lang="ts">
import axios from 'axios';
import Swal from 'sweetalert2';
import { onMounted, watch } from "vue";
import Navbar from '~/components/Navbar.vue';
import type { Pokemon } from '~/utils/types';
import backend from '../../backend.json';

const route = useRoute()
const pokemons = ref<PokemonFromAbility[]>([])
const isLoading = ref<boolean>(true)

type PokemonFromAbility = {
    is_hidden: boolean;
    pokemon: Pokemon;
    slot: number;
}

const getPokemons = async () => {
    try {
        const res = await axios.get(`${backend.baseUrl}/abilities/${route.params.name}`)
        console.log(res.data);

        pokemons.value = res.data.pokemons as PokemonFromAbility[]
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

onMounted(() => {
    getPokemons()
})

watch(() => route.query, () => {
    isLoading.value = true
    getPokemons()
})
</script>

<template>
    <Navbar />
    <div class="max-w-screen-md mx-auto p-5 lg:px-0">
        <h1 class="text-2xl font-bold">List of Pokemons that have ability: <span class="capitalize">{{ route.params.name
                }}</span></h1>
        <div v-if="!isLoading">
            <ul class="mt-2">
                <li v-for="(pokemon, index) in pokemons" :key="index">
                    <NuxtLink :to="`/pokemons/${pokemon.pokemon.name}`"
                        class="hover:underline hover:text-blue-500 capitalize">
                        {{ pokemon.pokemon.name }}
                    </NuxtLink>
                </li>
            </ul>
        </div>
        <p v-else class="mt-2">Loading...</p>
    </div>
</template>
