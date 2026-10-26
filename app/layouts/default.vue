<template>
  <div class="min-h-dvh w-full">
    <main
      class="relative mx-auto min-h-dvh w-full max-w-[480px] overflow-x-clip bg-paper shadow-[0_0_24px_rgba(0,0,0,0.06)]"
      :class="(isMain || isMini) && 'pb-20'"
    >
      <slot />
    </main>

    <!-- 하단 고정 버튼 줄 -->
    <div
      class="pointer-events-none fixed inset-x-0 bottom-0 z-50 mx-auto flex max-w-[480px] items-center gap-2.5 px-5 pb-5"
    >
      <!-- 메인: 미니홈피 놀러가기 -->
      <Transition name="to-top">
        <NuxtLink
          v-if="isMain"
          v-show="visible"
          to="/minihomepage"
          class="minihome-btn pointer-events-auto flex h-12 min-w-0 items-center justify-between rounded-full border border-point/40 bg-white/90 px-5 font-pixel text-[13px] text-ink shadow-md backdrop-blur"
        >
          <span class="truncate">🏠 미니홈피 놀러가기</span>
          <span class="arrow shrink-0 pl-2 text-point">→</span>
        </NuxtLink>
      </Transition>

      <!-- 미니홈피: 청첩장으로 돌아가기 -->
      <Transition name="to-top">
        <NuxtLink
          v-if="isMini"
          v-show="visible"
          to="/"
          class="back-btn pointer-events-auto flex h-12 min-w-0 items-center bg-white px-4 font-pixel text-[13px] text-ink"
        >
          <span class="truncate">◀ 청첩장으로 돌아가기</span>
        </NuxtLink>
      </Transition>

      <!-- 맨 위로 -->
      <Transition name="to-top">
        <button
          v-show="visible"
          type="button"
          aria-label="맨 위로"
          class="to-top-btn pointer-events-auto ml-auto flex size-12 shrink-0 items-center justify-center rounded-full border border-line bg-white/90 text-ink shadow-md backdrop-blur"
          @click="toTop"
        >
          <svg
            viewBox="0 0 24 24"
            class="size-6"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const nuxtApp = useNuxtApp();

// 버튼 종류는 "화면 전환이 끝난 뒤"의 페이지 기준으로 바꿈 (전환 중에 버튼이 바뀌며 밀리는 것 방지)
const currentPath = ref(route.path);
const isMain = computed(() => currentPath.value === "/"); // 미니홈피 가기 버튼은 메인에서만
const isMini = computed(() => currentPath.value === "/minihomepage"); // 돌아가기 버튼은 미니홈피에서만

const showTop = ref(false);
const navigating = ref(false);
const visible = computed(() => showTop.value && !navigating.value);

// 버튼을 누르는 순간 숨기고, 새 페이지 전환이 끝나면 버튼 종류를 바꿈
nuxtApp.hook("page:start", () => {
  navigating.value = true;
  showTop.value = false; // 새 페이지는 맨 위에서 시작하니까 숨긴 상태로
});
nuxtApp.hook("page:transition:finish", () => {
  currentPath.value = route.path;
  navigating.value = false; // 이후 스크롤하면 다시 나타남
});

function onScroll() {
  showTop.value = window.scrollY > 400;
}

function toTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

onMounted(() => {
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<style>
/* 나타나고 사라질 때 */
.to-top-enter-active,
.to-top-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.to-top-enter-from,
.to-top-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

/* 미니홈피 버튼 화살표가 살짝 까딱까딱 (눈에 띄게) */
.minihome-btn .arrow {
  animation: nudge 1.6s ease-in-out infinite;
}
@keyframes nudge {
  0%,
  60%,
  100% {
    transform: translateX(0);
  }
  30% {
    transform: translateX(4px);
  }
}
@media (prefers-reduced-motion: reduce) {
  .minihome-btn .arrow {
    animation: none;
  }
}

/* 미니홈피 돌아가기 버튼: 픽셀 네모 */
.back-btn {
  border: 2px solid var(--color-ink);
  box-shadow: 2px 2px 0 var(--color-ink);
}
.back-btn:active {
  transform: translate(2px, 2px);
  box-shadow: none;
}

/* 미니홈피에서는 맨 위로 버튼도 픽셀 네모 */
body.theme-retro .to-top-btn {
  border-radius: 0;
  border: 2px solid var(--color-ink);
  background: #fff;
  box-shadow: 2px 2px 0 var(--color-ink);
  backdrop-filter: none;
}
</style>
