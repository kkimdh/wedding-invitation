// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";
import betterTailwindcss from "eslint-plugin-better-tailwindcss";
import { getDefaultAttributes } from "eslint-plugin-better-tailwindcss/api/defaults";

export default withNuxt(
  betterTailwindcss.configs["correctness-error"],
  {
    settings: {
      "better-tailwindcss": {
        entryPoint: "app/assets/css/main.css",
        attributes: [
          ...getDefaultAttributes(),
          ["^v-bind:ui$", [{ match: "objectValues" }]],
        ],
      },
    },
  },
  {
    // 코드 모양(순서·따옴표 등)은 검사하지 않음 — 진짜 버그만 표시
    rules: {
      "nuxt/nuxt-config-keys-order": "off",
      "vue/html-self-closing": "off", // Prettier 가 <img /> 로 바꾸는 것과 충돌
      "better-tailwindcss/no-unknown-classes": "off", // main.css 에 직접 만든 클래스(pixelated, marquee 등)
    },
  },
);
