// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/eslint", "@nuxt/ui"],

  devtools: {
    enabled: false,
  },
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      title: "The Beginning of Us",
      meta: [{ name: "color-scheme", content: "light only" }],
    },
  },
  routeRules: {
    "/": { prerender: true },
  },
  compatibilityDate: "2026-10-08",
  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },
  ui: {
    colorMode: false,
  },
});
