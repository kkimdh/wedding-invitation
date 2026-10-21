<!-- 메인 사진 + 아이폰 텍스트 선택 느낌의 이름 -->
<script setup lang="ts">
import dayjs from "dayjs";
import { wedding } from "~/data/wedding";

// 2027 FEBRUARY 13, SAT 11:50AM
const wd = dayjs(wedding.date)
  .utcOffset(9 * 60)
  .locale("en");
const enDate = wd.isValid()
  ? wd
      .format(wd.minute() ? "YYYY MMMM D, ddd h:mmA" : "YYYY MMMM D, ddd hA")
      .toUpperCase()
  : "";
</script>

<template>
  <section
    class="relative h-dvh max-h-[900px] min-h-[620px] overflow-hidden bg-[#d9d6d2]"
  >
    <!-- 사진 -->
    <img
      :src="wedding.mainPhoto"
      alt=""
      class="main-photo absolute inset-0 h-full w-full object-cover"
      onerror="this.style.display='none'"
    />
    <!-- 아래쪽 글씨가 잘 보이게 살짝 어둡게 -->
    <div
      class="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent"
    />

    <!-- 이름 + 날짜 -->
    <div
      class="absolute inset-x-0 bottom-[7%] flex flex-col items-center font-sans text-white"
    >
      <div class="hero-select relative">
        <!-- 말풍선 (복사·붙여넣기 메뉴 느낌) -->
        <div
          class="hero-bubble absolute bottom-full left-1/2 mb-3 -translate-x-1/2"
        >
          <div
            class="rounded-xl bg-[#3a3a3c]/90 px-5 py-2.5 text-[15px] whitespace-nowrap text-white shadow-lg backdrop-blur-md"
          >
            {{ wedding.hero.bubble }}
          </div>
          <div
            class="mx-auto -mt-px size-0 border-x-8 border-t-8 border-x-transparent border-t-[#3a3a3c]/90"
          />
        </div>

        <!-- 선택된 이름 -->
        <div class="relative px-1.5">
          <span
            class="hero-highlight absolute inset-y-0 left-0 bg-[#e9c233]/40"
          />
          <h1
            class="relative text-[28px] leading-[1.5] font-medium tracking-tight [text-shadow:0_1px_6px_rgba(0,0,0,0.25)]"
          >
            {{ wedding.groom.name }}
            <span class="mx-1 text-[18px] align-middle opacity-80">·</span>
            {{ wedding.bride.name }}
          </h1>

          <!-- 왼쪽 손잡이 (동그라미 위) -->
          <span
            class="hero-handle absolute top-0 -bottom-0.5 left-0 w-[3px] -translate-x-1/2 bg-[#e9c233]"
          >
            <span
              class="absolute -top-2.5 left-1/2 size-3 -translate-x-1/2 rounded-full bg-[#e9c233]"
            />
          </span>
          <!-- 오른쪽 손잡이 (동그라미 아래) -->
          <span
            class="hero-handle hero-handle-end absolute -top-0.5 bottom-0 right-0 w-[3px] translate-x-1/2 bg-[#e9c233]"
          >
            <span
              class="absolute -bottom-2.5 left-1/2 size-3 -translate-x-1/2 rounded-full bg-[#e9c233]"
            />
          </span>
        </div>
      </div>

      <p
        class="hero-date mt-5 text-[13px] tracking-[0.04em] [text-shadow:0_1px_4px_rgba(0,0,0,0.3)]"
      >
        {{ enDate }}
      </p>
    </div>
  </section>
</template>

<style scoped>
/* 1. 노란 선택 영역이 왼쪽에서 오른쪽으로 쭉 */
.hero-highlight {
  width: 0;
  animation: hero-select 0.7s 0.8s cubic-bezier(0.3, 0.7, 0.3, 1) forwards;
}
@keyframes hero-select {
  to {
    width: 100%;
  }
}

/* 2. 손잡이 나타남 */
.hero-handle {
  opacity: 0;
  animation: hero-fade 0.2s 0.8s forwards;
}
.hero-handle-end {
  animation-delay: 1.45s;
}

/* 3. 말풍선 톡 */
.hero-bubble {
  opacity: 0;
  animation: hero-pop 0.35s 1.6s cubic-bezier(0.2, 1.4, 0.4, 1) forwards;
}
@keyframes hero-pop {
  from {
    opacity: 0;
    transform: translateY(6px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

/* 4. 날짜 */
.hero-date {
  opacity: 0;
  animation: hero-fade 0.6s 2s forwards;
}
@keyframes hero-fade {
  to {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-highlight {
    width: 100%;
    animation: none;
  }
  .hero-handle,
  .hero-bubble,
  .hero-date {
    opacity: 1;
    animation: none;
  }
}
</style>
