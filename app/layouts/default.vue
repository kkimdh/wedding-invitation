<template>
  <div class="min-h-dvh w-full">
    <main
      class="relative mx-auto min-h-dvh w-full max-w-[480px] overflow-x-clip bg-paper shadow-[0_0_24px_rgba(0,0,0,0.06)]"
    >
      <slot />
    </main>

    <!-- 맨 위로 버튼 -->
    <Transition name="to-top">
      <button
        v-show="showTop"
        type="button"
        aria-label="맨 위로"
        class="to-top-btn fixed bottom-5 z-50 flex size-11 items-center justify-center rounded-full border border-line bg-white/90 text-ink shadow-md backdrop-blur"
        :style="{ right: 'max(1.25rem, calc(50vw - 240px + 1.25rem))' }"
        @click="toTop"
      >
        <svg
          viewBox="0 0 24 24"
          class="size-5"
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
</template>

<script setup lang="ts">
const showTop = ref(false);

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

/* 미니홈피에서는 픽셀 느낌 네모 버튼 */
body.theme-retro .to-top-btn {
  border-radius: 0;
  border: 2px solid var(--color-ink);
  background: #fff;
  box-shadow: 2px 2px 0 var(--color-ink);
  backdrop-filter: none;
}
</style>
