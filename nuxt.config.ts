// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/eslint", "@nuxt/ui", "@vueuse/motion/nuxt"],

  devtools: {
    enabled: false,
  },
  // css: ["~/assets/css/main.css"],
  css: ["~/assets/css/retro.css"],
  app: {
    head: {
      title: "The Beginning of Us",
      meta: [{ name: "color-scheme", content: "light only" }],
      link: [
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/galmuri/dist/galmuri.css",
        },
      ],
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

  runtimeConfig: {
    public: {
      kakaoJsKey: "",
      siteUrl: "https://dohyeseong-wedding-invitation.vercel.app",

      // ← 추가: 직접 만든 효과
      motion: {
        directives: {
          "fade-up": {
            initial: { opacity: 0, y: 28 },
            visibleOnce: {
              opacity: 1,
              y: 0,
              transition: { duration: 900, ease: "easeOut" },
            },
          },
        },
      },
    },
  },
});
