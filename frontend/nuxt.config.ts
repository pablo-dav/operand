export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      baseUrl: process.env.NUXT_API_BASE_URL,
    },
  },
  css: ["@/assets/css/globals.css", "@/assets/css/main.css"],
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],

  // plugins: ["~/plugins/pinia.ts"],
});
