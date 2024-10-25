<!-- pages/dashboard.vue -->
<script setup lang="ts">
import authMiddleware from '~/middleware/auth.client'

definePageMeta({
    middleware: authMiddleware
})

import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
</script>

<template>
    <div>
        <h1>Bem-vindo ao Dashboard</h1>
        <p>Você está logado como: {{ authStore.user?.email }}</p>
    </div>
</template>
