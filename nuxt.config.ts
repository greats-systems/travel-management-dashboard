// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  build: {
    transpile: ['@vue-leaflet/vue-leaflet']
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite:{
    plugins:[
      tailwindcss()
    ],
    optimizeDeps: {
      include: ['leaflet']
    }
  },
  modules: ["@nuxtjs/supabase", "@nuxt/ui"],
  supabase: {
    url: process.env.SUPABASE_URL,
    // key: process.env.SUPABASE_KEY,
    key: process.env.SUPABASE_SERVCE_KEY,
    redirect: false,
  },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_ANON_KEY,
    },
  },
});
