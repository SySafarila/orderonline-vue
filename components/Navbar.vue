<script setup lang="ts">
const route = useRoute();
</script>

<template>
    <nav class="bg-white p-5 border-b w-full">
        <div class="max-w-screen-md mx-auto flex gap-4">
            <NuxtLink :class="`text-gray-600 hover:text-black ${route.path == '/' ? 'text-black font-semibold' : ''}`"
                to="/">Home
            </NuxtLink>
            <NuxtLink
                :class="`text-gray-600 hover:text-black ${route.path == '/favorite' ? 'text-black font-semibold' : ''}`"
                to="/favorite">Favorite</NuxtLink>
            <NuxtLink
                :class="`text-gray-600 hover:text-black ${route.path == '/abilities' ? 'text-black font-semibold' : ''}`"
                to="/abilities">Abilities</NuxtLink>
        </div>
    </nav>
</template>