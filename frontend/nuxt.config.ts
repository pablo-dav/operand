// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_API_BASE_URL,
    },
  },

  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],

  plugins: ["~/plugins/pinia.ts"],
});
