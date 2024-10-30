<script setup lang="ts">
import Navbar from './Navbar.vue';
</script>

<template>
    <Navbar />
    <div class="max-w-screen-md mx-auto p-5 lg:px-0">
        <slot></slot>
    </div>
</template>