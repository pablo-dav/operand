<!-- pages/dashboard.vue -->
<script setup lang="ts">
import authMiddleware from '~/middleware/auth'

definePageMeta({
    middleware: authMiddleware  // Use o middleware importado diretamente
})

import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
</script>

<template>
    <div>
        <h1>Bem-vindo ao Dashboard</h1>
        <p>Você está logado como: {{ authStore.user?.name }}</p>
    </div>
</template>
