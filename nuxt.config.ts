// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/eslint", "@nuxt/ui", "@vueuse/motion/nuxt"],

  devtools: { enabled: false },

  css: ["~/assets/css/main.css"],

  ui: { colorMode: false },

  runtimeConfig: {
    guestbookAdminPassword: "", // 서버 전용 (NUXT_GUESTBOOK_ADMIN_PASSWORD)
    public: {
      kakaoJsKey: "",
      siteUrl: "https://dohyeseong-wedding-invitation.vercel.app",

      // motion: {
      //   directives: {
      //     "fade-up": {
      //       initial: { opacity: 0, y: 28 },
      //       visibleOnce: {
      //         opacity: 1,
      //         y: 0,
      //         transition: { duration: 900, ease: "easeOut" },
      //       },
      //     },
      //   },
      // },
      motion: {
        directives: {
          "fade-up": {
            initial: { opacity: 0, y: 40 }, // 시작 위치: 40px 아래, 투명
            visibleOnce: {
              opacity: 1,
              y: 0,
              transition: { duration: 1400, delay: 150, ease: "easeOut" },
            },
          },
        },
      },
    },
  },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      title: "The Beginning of Us",
      meta: [{ name: "color-scheme", content: "light only" }],
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css",
        },
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/galmuri/dist/galmuri.css",
        },
        {
          rel: "stylesheet",
          href: "https://hangeul.pstatic.net/hangeul_static/css/maru-buri.css",
        },
      ],
      script: [
        // 카카오톡 공유용 SDK (지도 SDK는 KakaoMap 컴포넌트가 따로 불러옴)
        {
          src: "https://t1.kakaocdn.net/kakao_js_sdk/2.8.3/kakao.min.js",
          crossorigin: "anonymous",
          defer: true,
        },
      ],
    },
  },

  routeRules: {
    "/": { prerender: true },
    "/minihomepage": { prerender: true },
  },

  compatibilityDate: "2026-06-30",

  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },
});
