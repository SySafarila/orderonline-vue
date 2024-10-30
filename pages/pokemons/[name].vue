<script setup lang="ts">
import axios from 'axios';
import Swal from 'sweetalert2';
import { onMounted } from "vue";
import MainLayout from '~/components/MainLayout.vue';
import type { Abilities, PokemonType, Sprites } from '~/utils/types';
import backend from '../../backend.json';

const route = useRoute()
const router = useRouter()
const isFavorite = ref<boolean>(false)
const favoriteCheck = ref<boolean>(false)
const pokemonName = ref<string>("")
const abilities = ref<Abilities[]>([])
const species = ref<{ name: string; url: string }>()
const height = ref<number>()
const weight = ref<number>()
const sprites = ref<Sprites>()
const pokemonTypes = ref<PokemonType[]>([]);
const isLoading = ref<boolean>(true)
const favoriteClicked = ref<boolean>(false)

useHead({
    title: 'Pokemon Detail'
})

// get pokemon detail
const getPokemon = async () => {
    try {
        const res = await axios.get(`${backend.baseUrl}/pokemons/${route.params.name}`)
        abilities.value = res.data.abilities
        species.value = {
            name: res.data.species.name,
            url: res.data.species.url,
        }
        height.value = res.data.height
        sprites.value = res.data.sprites as Sprites
        pokemonName.value = res.data.name
        pokemonTypes.value = res.data.types
        weight.value = res.data.weight
        checkFavorite()
        isLoading.value = false
    } catch (error: any) {
        console.error(error)
        Swal.fire({
            icon: "error",
            title: `Pokemon ${error.response.data}`
        }).then(res => {
            if (res.isConfirmed) {
                router.push('/');
            }
            if (res.isDismissed) {
                router.push('/');
            }
        })
    }
}

// add pokemon to favorite
const addFavorite = async () => {
    if (favoriteClicked.value === true) {
        return;
    }
    favoriteClicked.value = true;
    try {
        const uploadedAbilities: { name: string; is_hidden: boolean }[] = [];

        abilities.value.forEach(ability => {
            uploadedAbilities.push({ name: ability.ability.name, is_hidden: ability.is_hidden });
        });

        await axios.post(`${backend.baseUrl}/favorite`, {
            pokemon_name: pokemonName.value,
            abilities: uploadedAbilities
        })

        Swal.fire({
            icon: "success",
            title: "Added to favorite"
        })
        isFavorite.value = true
        favoriteClicked.value = false
    } catch (error: any) {
        console.error(error)
        favoriteClicked.value = false
        Swal.fire({
            icon: "error",
            title: `${error.response.data}`
        })
    }
}

// remove pokemon from favorite
const removeFavorite = async () => {
    if (favoriteClicked.value === true) {
        return;
    }
    favoriteClicked.value = true;
    try {
        await axios.delete(`${backend.baseUrl}/favorite/${pokemonName.value}`)

        Swal.fire({
            icon: "success",
            title: "Removed from favorite"
        })
        isFavorite.value = false
        favoriteClicked.value = false
    } catch (error: any) {
        console.error(error)
        favoriteClicked.value = false
        Swal.fire({
            icon: "error",
            title: `${error.response.data}`
        })
    }
}

// check if pokemon already in favorite
const checkFavorite = async () => {
    try {
        const res = await axios.get(`${backend.baseUrl}/favorite/check/${pokemonName.value}`)
        if (res.data.status === true) {
            isFavorite.value = true
        }
        favoriteCheck.value = true
    } catch (error: any) {
        console.error(error)
        Swal.fire({
            icon: "error",
            title: `${error.response.data}`
        })
    }
}

onMounted(async () => {
    await getPokemon()
})
</script>

<template>
    <MainLayout>
        <div class="flex justify-between flex-col gap-2 mb-3 md:flex-row">
            <h1 class="text-2xl font-bold">Detail of Pokemon (<span class="capitalize">{{ route.params.name }}</span>)
            </h1>
            <button class="bg-gray-100 border px-3 py-1 rounded hover:bg-gray-200" @click="addFavorite"
                v-if="!isFavorite && favoriteCheck == true" :disabled="favoriteClicked === true">
                {{ favoriteClicked ? 'Loading...' : 'Add to Favorite' }}
            </button>
            <button class="bg-gray-100 border px-3 py-1 rounded hover:bg-gray-200" @click="removeFavorite"
                v-if="isFavorite && favoriteCheck == true" :disabled="favoriteClicked === true">
                {{ favoriteClicked ? 'Loading...' : 'Remove Favorite' }}
            </button>
            <button class="bg-gray-100 border px-3 py-1 rounded hover:bg-gray-200" v-if="favoriteCheck == false"
                :disabled="true">
                Loading...
            </button>
        </div>
        <div v-if="!isLoading">
            <div class="grid grid-cols-2 mb-2">
                <div>
                    <p>Abilities:</p>
                    <ul id="abilities" class="list-disc list-inside ml-2">
                        <li class="capitalize" v-for="(ability, index) in abilities" :key="index">
                            <NuxtLink :to="`/abilities/${ability.ability.name}`"
                                class="hover:underline hover:text-blue-500">
                                {{ ability.ability.name }}
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
                <div>
                    <p>Types:</p>
                    <ul id="abilities" class="list-disc list-inside ml-2">
                        <li class="capitalize" v-for="(pokemonType, index) in pokemonTypes" :key="index">
                            {{ pokemonType.type.name }}
                        </li>
                    </ul>
                </div>
            </div>
            <p class="capitalize">Species: {{ species?.name ?? '-' }}</p>
            <p>Height: {{ height ?? '-' }}</p>
            <p>Weight: {{ weight ?? '-' }}</p>
            <div class="flex flex-col gap-2 mt-3">
                <div class="bg-gray-100 p-3 rounded border">
                    <p>Sprites</p>
                    <div class="grid grid-cols-4 md:grid-cols-6">
                        <img class="w-full aspect-square" :src="sprites?.back_default" alt="back_default"
                            title="back default" v-if="sprites?.back_default">
                        <img class="w-full aspect-square" :src="sprites?.back_female" alt="back_female"
                            title="back female" v-if="sprites?.back_female">
                        <img class="w-full aspect-square" :src="sprites?.back_shiny" alt="back_shiny" title="back shiny"
                            v-if="sprites?.back_shiny">
                        <img class="w-full aspect-square" :src="sprites?.back_shiny_female" alt="back_shiny_female"
                            title="back shiny female" v-if="sprites?.back_shiny_female">
                        <img class="w-full aspect-square" :src="sprites?.front_default" alt="front_default"
                            title="front default" v-if="sprites?.front_default">
                        <img class="w-full aspect-square" :src="sprites?.front_female" alt="front_female"
                            title="front female" v-if="sprites?.front_female">
                        <img class="w-full aspect-square" :src="sprites?.front_shiny" alt="front_shiny"
                            title="front shiny" v-if="sprites?.front_shiny">
                        <img class="w-full aspect-square" :src="sprites?.front_shiny_female" alt="front_shiny female"
                            title="front shiny female" v-if="sprites?.front_shiny_female">
                    </div>
                </div>
                <div class="bg-gray-100 p-3 rounded border">
                    <p>Dream World</p>
                    <div class="grid grid-cols-4 md:grid-cols-6">
                        <img class="w-full aspect-square" :src="sprites?.other?.dream_world?.front_default"
                            alt="Dream world" title="Dream world" v-if="sprites?.other?.dream_world?.front_default">
                        <img class="w-full aspect-square" :src="sprites?.other?.dream_world?.front_female"
                            alt="Dream world" title="Dream world" v-if="sprites?.other?.dream_world?.front_female">
                    </div>
                </div>
                <div class="bg-gray-100 p-3 rounded border">
                    <p>Home</p>
                    <div class="grid grid-cols-4 md:grid-cols-6">
                        <img class="w-full aspect-square" :src="sprites?.other?.home?.front_default" alt="Home"
                            title="Home" v-if="sprites?.other?.home?.front_default">
                        <img class="w-full aspect-square" :src="sprites?.other?.home?.front_female" alt="Home"
                            title="Home" v-if="sprites?.other?.home?.front_female">
                        <img class="w-full aspect-square" :src="sprites?.other?.home?.front_shiny" alt="Home"
                            title="Home" v-if="sprites?.other?.home?.front_shiny">
                        <img class="w-full aspect-square" :src="sprites?.other?.home?.front_shiny_female" alt="Home"
                            title="Home" v-if="sprites?.other?.home?.front_shiny_female">
                    </div>
                </div>
                <div class="bg-gray-100 p-3 rounded border">
                    <p>Official Artwork</p>
                    <div class="grid grid-cols-4 md:grid-cols-6">
                        <img class="w-full aspect-square" :src="sprites?.other?.['official-artwork']?.front_default"
                            alt="Official Artwork" title="Official Artwork"
                            v-if="sprites?.other?.['official-artwork']?.front_default">
                        <img class="w-full aspect-square" :src="sprites?.other?.['official-artwork']?.front_shiny"
                            alt="Official Artwork" title="Official Artwork"
                            v-if="sprites?.other?.['official-artwork']?.front_shiny">
                    </div>
                </div>
            </div>
        </div>
        <p v-else>Loading...</p>
    </MainLayout>
</template>
