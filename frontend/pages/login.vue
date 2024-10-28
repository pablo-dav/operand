<template>
    <div>
        <section class="absolute w-full h-full">
            <div class="absolute top-0 w-full h-full bg-gray-900"
                style="background-size: 100%; background-repeat: no-repeat;">
            </div>
            <div class="container mx-auto px-4 h-full">
                <div class="flex content-center items-center justify-center h-full">
                    <div class="w-full lg:w-4/12 px-4">
                        <div
                            class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                            <div class="flex-auto px-4 lg:px-10 py-5 pt-0">
                                <div class="text-gray-500 text-center my-3 font-bold">
                                    <h1 class="text-2xl">Log In</h1>
                                </div>
                                <form @submit.prevent="submitLogin">
                                    <div class="relative w-full mb-3">
                                        <label class="block uppercase text-gray-700 text-xs font-bold mb-2"
                                            for="grid-password">Email</label>
                                        <input type="email" id="email" v-model="credentials.email"
                                            class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                            placeholder="Email" style="transition: all 0.15s ease 0s;" />
                                    </div>
                                    <div class="relative w-full mb-3">
                                        <label class="block uppercase text-gray-700 text-xs font-bold mb-2"
                                            for="grid-password">Password</label>
                                        <input type="password" id="password" v-model="credentials.password"
                                            class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                            placeholder="Senha" style="transition: all 0.15s ease 0s;" />
                                    </div>
                                    <div class="text-center mt-6">
                                        <button
                                            class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                                            type="submit" style="transition: all 0.15s ease 0s;">
                                            Log In
                                        </button>
                                    </div>
                                </form>
                                <div class="w-100 text-end">
                                    <a href="/register" class="block underline  text-gray-700 text-sm font-bold">
                                        Create new account
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore, type Credentials } from '~/stores/auth'
import loggedMiddleware from '~/middleware/logged.client'

definePageMeta({
    middleware: loggedMiddleware
})

const credentials = ref<Credentials>({
    email: "",
    password: "",
})

const authStore = useAuthStore()

const submitLogin = () => {
    authStore.login(credentials.value)
}
</script>
