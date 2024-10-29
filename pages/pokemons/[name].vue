<script setup lang="ts">
import { onMounted } from "vue";
import axios from 'axios'
import backend from '../../backend.json'

type Sprites = {
    back_default: null | string;
    back_female: null | string;
    back_shiny: null | string;
    back_shiny_female: null | string;
    front_default: null | string;
    front_female: null | string;
    front_shiny: null | string;
    front_shiny_female: null | string;
}

type Abilities = { is_hidden: boolean; slot: number; ability: { name: string; url: string } }

const route = useRoute()
const abilities = ref<Abilities[]>([])
const species = ref<{ name: string; url: string }>()
const height = ref<number>()
const sprites = ref<Sprites>({
    back_default: "",
    back_female: null,
    back_shiny: "",
    back_shiny_female: "",
    front_default: "",
    front_female: null,
    front_shiny: "",
    front_shiny_female: null
})
const isLoading = ref<boolean>(true)

const getPokemon = async () => {
    try {
        const res = await axios.get(`${backend.baseUrl}/pokemons/${route.params.name}`)
        console.log(res.data);
        isLoading.value = false
        abilities.value = res.data.abilities
        species.value = {
            name: res.data.species.name,
            url: res.data.species.url,
        }
        height.value = res.data.height
        sprites.value = {
            back_default: res.data.sprites.back_default,
            back_female: res.data.sprites.back_female,
            back_shiny: res.data.sprites.back_shiny,
            back_shiny_female: res.data.sprites.back_shiny_female,
            front_default: res.data.sprites.front_default,
            front_female: res.data.sprites.front_female,
            front_shiny: res.data.sprites.front_shiny,
            front_shiny_female: res.data.sprites.front_shiny_female,
        }
    } catch (error) {
        console.error(error)
    }
}

onMounted(() => {
    getPokemon()
})
</script>

<template>
    <div class="p-5">
        <h1 class="text-2xl font-bold">Detail of Pokemon (<span class="capitalize">{{ route.params.name }}</span>)</h1>
        <div v-if="!isLoading">
            <div>
                <p>Abilities:</p>
                <ul id="abilities" class="list-disc list-inside">
                    <li v-for="(ability, index) in abilities" :key="index">{{
                        ability.ability.name
                    }}</li>
                </ul>
            </div>
            <p>Species: {{ species?.name ?? '-' }}</p>
            <p>Heihgt: {{ height ?? '-' }}</p>
            <div>
                <p>Sprites:</p>
                <div class="flex">
                    <img :src="sprites.back_default" alt="back_default" title="back default"
                        v-if="sprites.back_default">
                    <img :src="sprites.back_female" alt="back_female" title="back female" v-if="sprites.back_female">
                    <img :src="sprites.back_shiny" alt="back_shiny" title="back shiny" v-if="sprites.back_shiny">
                    <img :src="sprites.back_shiny_female" alt="back_shiny_female" title="back shiny female"
                        v-if="sprites.back_shiny_female">
                    <img :src="sprites.front_default" alt="front_default" title="front default"
                        v-if="sprites.front_default">
                    <img :src="sprites.front_female" alt="front_female" title="front female"
                        v-if="sprites.front_female">
                    <img :src="sprites.front_shiny" alt="front_shiny" title="front shiny" v-if="sprites.front_shiny">
                    <img :src="sprites.front_shiny_female" alt="front_shiny female" title="front shiny female"
                        v-if="sprites.front_shiny_female">
                </div>
            </div>
        </div>
        <p v-else>Loading...</p>
    </div>
</template>
