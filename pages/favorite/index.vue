<script setup lang="ts">
import axios from "axios";
import Swal from "sweetalert2";
import { onMounted, watch } from "vue";
import Navbar from "~/components/Navbar.vue";
import type { PokemonFavorite } from "~/utils/types";
import backend from "../../backend.json";

const pokemons = ref<PokemonFavorite[]>([]);
const isLoading = ref<boolean>(true);
const pokemonName = ref<string | null>(null);
const router = useRouter();
const route = useRoute();

const getFavorite = async () => {
    try {
        const res = await axios.get(`${backend.baseUrl}/favorite`, {
            params: {
                pokemon_name: pokemonName.value,
            },
        });
        pokemons.value = res.data as PokemonFavorite[];
        isLoading.value = false;
    } catch (error: any) {
        console.error(error);
        Swal.fire({
            icon: "error",
            title: error.message,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
        });
    }
};

const handleSubmit = (event: Event) => {
    event.preventDefault();
    router.push(`?pokemon_name=${pokemonName.value}`);
};

const generateDate = (date: string) => {
    const dateRaw = new Date(date);
    const day = dateRaw.getDate();
    const month = dateRaw.getMonth() + 1;
    const year = dateRaw.getFullYear()
    const hour = dateRaw.getHours();
    const minute = dateRaw.getMinutes();

    return `${day}/${month}/${year} - ${hour}:${minute}`;
}

onMounted(() => {
    getFavorite();
    const queryPokemonName = route.query.pokemon_name as string | null;
    pokemonName.value = queryPokemonName;
});

watch(
    () => route.query,
    () => {
        isLoading.value = true;
        getFavorite();
    }
);
</script>

<template>
    <Navbar />
    <div class="max-w-screen-md mx-auto p-5 lg:px-0">
        <h1 class="text-2xl font-bold">List of Favorite Pokemons</h1>
        <form @submit="handleSubmit" class="flex items-end w-full gap-2">
            <div class="flex flex-col w-full gap-1">
                <label for="pokemon_name">Pokemon Name</label>
                <input v-model="pokemonName" type="text" name="pokemon_name" id="pokemon_name"
                    class="px-3 py-1 border rounded" placeholder="Search pokemon" />
            </div>
            <div>
                <button type="submit" class="bg-gray-100 border hover:bg-gray-200 px-3 py-1 rounded">
                    Search
                </button>
            </div>
        </form>
        <div v-if="!isLoading">
            <ul class="mt-2 flex flex-col gap-2">
                <li v-for="(pokemon, index) in pokemons" :key="index" class="bg-gray-100 p-4 rounded">
                    <NuxtLink :to="`/pokemons/${pokemon.pokemon_name}`"
                        class="hover:underline hover:text-blue-500 capitalize font-semibold">
                        {{ pokemon.pokemon_name }}
                    </NuxtLink>
                    <div>
                        <p>Abilities:</p>
                        <ul class="list-disc list-inside">
                            <li v-for="(ability, indexAbility) in pokemon.abilities" :key="indexAbility">
                                <NuxtLink :to="`/abilities/${ability.name}`"
                                    class="hover:text-blue-500 hover:underline capitalize">
                                    {{ ability.name }}
                                </NuxtLink>
                            </li>
                        </ul>
                    </div>
                    <small>Added at {{ generateDate(pokemon.created_at) }}</small>
                </li>
            </ul>
        </div>
        <p v-if="isLoading">Loading...</p>
        <p v-if="!isLoading && pokemons.length === 0">
            You don't have any favorite Pokemons
        </p>
    </div>
</template>
