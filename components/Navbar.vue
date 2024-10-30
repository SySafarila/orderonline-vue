<script setup lang="ts">
const route = useRoute();
</script>

<template>
    <nav class="bg-white border-b w-full p-2">
        <div class="max-w-screen-md mx-auto flex gap-4 items-center">
            <NuxtLink class="" to="/">
                <img src="/pokemon.png" class="w-20" alt="logo" />
            </NuxtLink>
            <NuxtLink :class="`hover:text-black ${route.path == '/' ? 'text-black font-semibold' : 'text-gray-600'}`"to="/">
                Home
            </NuxtLink>
            <NuxtLink :class="`hover:text-black ${route.path == '/favorite' ? 'text-black font-semibold' : 'text-gray-600'}`" to="/favorite">
                Favorite
            </NuxtLink>
            <NuxtLink :class="`hover:text-black ${route.path == '/abilities' ? 'text-black font-semibold' : 'text-gray-600'}`" to="/abilities">
                Abilities
            </NuxtLink>
        </div>
    </nav>
</template>