<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold">Nuxt Routing set up successfully!</h1>
    <p>Current route: {{ route.path }}</p>
    <a href="https://nuxt.com/docs/getting-started/routing" target="_blank">Learn more about Nuxt Routing</a>
    <br>
    <NuxtLink to="/about">About Page</NuxtLink>
  </div>
</template>
