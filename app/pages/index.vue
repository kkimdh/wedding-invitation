<!-- 기본 청첩장 -->
<template>
  <div>
    <!-- ───────── 메인 ───────── -->
    <MainHero />

    <!-- ───────── 인사말 ───────── -->
    <section id="greeting" class="px-8 py-24 text-center">
      <div v-motion-fade-up>
        <p class="text-[13px] tracking-[0.3em] text-muted uppercase">
          Invitation
        </p>
        <h2 class="mt-3 text-[22px] text-ink">소중한 분들을 초대합니다</h2>
      </div>

      <p
        v-motion-fade-up
        :delay="150"
        class="mt-12 text-[16px] leading-[2.1] whitespace-pre-line text-ink/75"
      >
        {{ wedding.greeting }}
      </p>

      <div v-motion-fade-up class="mx-auto my-12 h-px w-12 bg-line" />

      <div v-motion-fade-up :delay="150" class="space-y-3 text-[17px] text-ink">
        <p v-for="p in [wedding.groom, wedding.bride]" :key="p.name">
          {{ p.father }}<span class="mx-1 text-[13px] text-muted">·</span
          >{{ p.mother
          }}<span class="mx-1.5 text-muted/70">의 {{ p.order }}</span
          >{{ p.name }}
        </p>
      </div>
    </section>

    <!-- ───────── 달력 ───────── -->
    <section id="calendar" class="bg-[#f6f2ec] px-6 py-20">
      <div v-motion-fade-up class="mb-10 text-center">
        <p class="text-[11px] tracking-[0.3em] text-point uppercase">
          Wedding Day
        </p>
        <h2 class="mt-2 font-serif text-lg">{{ dotDate }}</h2>
      </div>

      <div class="mx-auto max-w-[320px]">
        <div
          class="grid grid-cols-7 border-y border-line py-3 text-center text-xs text-muted"
        >
          <span class="text-point">일</span><span>월</span><span>화</span
          ><span>수</span><span>목</span><span>금</span><span>토</span>
        </div>
        <div class="grid grid-cols-7 gap-y-2 py-4 text-center text-sm">
          <span
            v-for="(c, i) in cells"
            :key="i"
            class="mx-auto flex size-9 items-center justify-center rounded-full"
            :class="[
              c === day ? 'bg-point text-white' : '',
              c !== day && i % 7 === 0 ? 'text-point' : '',
            ]"
            >{{ c ?? "" }}</span
          >
        </div>
      </div>

      <p
        v-if="dday !== null"
        v-motion-fade-up
        class="mt-6 text-center text-sm text-muted"
      >
        <template v-if="dday > 0"
          >결혼식까지
          <strong class="text-point">{{ dday }}일</strong> 남았습니다</template
        >
        <template v-else-if="dday === 0"
          >결혼식이 <strong class="text-point">곧 시작됩니다.</strong></template
        >
        <template v-else>결혼식이 지났습니다.</template>
      </p>
    </section>

    <!-- ───────── 갤러리 ───────── -->
    <section id="gallery" class="px-6 py-20">
      <div v-motion-fade-up class="mb-10 text-center">
        <p class="text-[11px] tracking-[0.3em] text-point uppercase">Gallery</p>
        <h2 class="mt-2 font-serif text-lg">우리의 순간</h2>
      </div>

      <div class="grid grid-cols-3 gap-1">
        <button
          v-for="(src, i) in visiblePhotos"
          :key="src"
          type="button"
          class="aspect-square overflow-hidden bg-[#ece7df]"
          @click="openViewer(i)"
        >
          <img
            :src="src"
            alt=""
            loading="lazy"
            class="h-full w-full object-cover"
          />
        </button>
      </div>

      <button
        v-if="wedding.gallery.length > preview"
        type="button"
        class="mt-6 w-full rounded-md border border-line py-3 text-sm text-muted"
        @click="showAll = !showAll"
      >
        {{ showAll ? "접기" : "사진 더보기" }}
      </button>

      <!-- 크게 보기 -->
      <UModal
        v-model:open="viewerOpen"
        :ui="{
          content:
            'w-[calc(100%-2rem)] max-w-[400px] rounded-lg bg-paper ring-0',
        }"
      >
        <template #content>
          <div
            class="flex items-center justify-between px-4 py-3 text-xs text-muted"
          >
            <span>{{ viewerIndex + 1 }} / {{ wedding.gallery.length }}</span>
            <button
              type="button"
              class="px-1 text-base"
              aria-label="닫기"
              @click="viewerOpen = false"
            >
              ✕
            </button>
          </div>
          <UCarousel
            v-slot="{ item }"
            :items="wedding.gallery"
            :start-index="viewerIndex"
            arrows
            loop
            :ui="{ prev: 'start-2', next: 'end-2' }"
            @select="viewerIndex = $event"
          >
            <div
              class="flex aspect-[3/4] items-center justify-center bg-[#f2eee8]"
            >
              <img
                :src="item"
                alt=""
                class="max-h-full max-w-full object-contain"
              />
            </div>
          </UCarousel>
        </template>
      </UModal>
    </section>

    <!-- ───────── 오시는 길 ───────── -->
    <section id="location" class="bg-[#f6f2ec] px-6 py-20">
      <div v-motion-fade-up class="mb-10 text-center">
        <p class="text-[11px] tracking-[0.3em] text-point uppercase">
          Location
        </p>
        <h2 class="mt-2 font-serif text-lg">오시는 길</h2>
      </div>

      <div v-motion-fade-up :delay="150" class="text-center">
        <p class="font-medium">
          {{ wedding.venue.name }} {{ wedding.venue.hall }}
        </p>
        <p class="mt-1 text-sm text-muted">{{ wedding.venue.address }}</p>
        <a
          :href="`tel:${wedding.venue.tel}`"
          class="mt-1 inline-block text-sm text-muted"
          >{{ wedding.venue.tel }}</a
        >
      </div>

      <KakaoMap
        :lat="wedding.venue.lat"
        :lng="wedding.venue.lng"
        class="-mx-6 mt-8 aspect-[4/3] bg-paper-deep"
      />

      <!-- 약도 이미지 보기 -->
      <button
        v-if="wedding.mapGuide"
        type="button"
        class="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-white py-3.5 text-[15px] text-ink shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
        @click="mapGuideOpen = true"
      >
        <UIcon name="i-lucide-map" class="size-4 text-muted" />
        약도 이미지 보기
      </button>

      <!-- 내비게이션 -->
      <div class="mt-10">
        <p class="text-[17px] text-ink">내비게이션</p>
        <p class="mt-3 text-sm text-ink/70">
          원하시는 앱을 선택하시면 길안내가 시작됩니다.
        </p>
        <div class="mt-4 grid grid-cols-3 gap-2">
          <a
            v-for="l in mapLinks"
            :key="l.label"
            :href="l.href"
            target="_blank"
            rel="noopener"
            class="flex items-center justify-center gap-1.5 rounded-xl border border-line bg-white py-3.5 text-sm text-ink"
          >
            <!-- <UIcon name="i-lucide-navigation" class="size-3.5 text-muted" /> -->
            <img :src="l.icon" class="w-4 h-4" alt="맵 아이콘" />
            {{ l.label }}
          </a>
        </div>
      </div>

      <!-- 교통편 (지하철, 버스, 주차, 셔틀) -->
      <div
        v-for="t in wedding.transport"
        :key="t.title"
        class="mt-8 border-t border-dashed border-line pt-8"
      >
        <p class="text-[17px] text-ink">{{ t.title }}</p>

        <ul
          v-if="t.items?.length"
          class="mt-4 space-y-2 text-[15px] text-ink/80"
        >
          <li
            v-for="item in t.items"
            :key="item.text"
            class="flex items-start gap-2"
          >
            <span
              v-if="item.dot"
              class="mt-[7px] size-3 shrink-0 rounded-full"
              :style="{ background: item.dot }"
            />
            <span>{{ item.text }}</span>
          </li>
        </ul>

        <ul
          v-if="t.notes?.length"
          class="mt-4 space-y-1.5 text-sm leading-6 text-ink/70"
        >
          <li v-for="n in t.notes" :key="n" class="whitespace-pre-line">
            · {{ n }}
          </li>
        </ul>
      </div>

      <!-- 약도 크게 보기 -->
      <UModal
        v-model:open="mapGuideOpen"
        :ui="{
          content:
            'w-[calc(100%-2rem)] max-w-[440px] rounded-lg bg-paper ring-0',
        }"
      >
        <template #content>
          <div
            class="flex items-center justify-between px-4 py-3 text-sm text-ink"
          >
            <span>약도</span>
            <button
              type="button"
              class="px-1 text-base text-muted"
              aria-label="닫기"
              @click="mapGuideOpen = false"
            >
              ✕
            </button>
          </div>
          <img :src="wedding.mapGuide" alt="예식장 약도" class="block w-full" />
        </template>
      </UModal>
    </section>

    <!-- ───────── 마음 전하실 곳 ───────── -->
    <section id="account" class="px-6 py-20">
      <div v-motion-fade-up class="mb-6 text-center">
        <p class="text-[11px] tracking-[0.3em] text-point uppercase">
          With Heart
        </p>
        <h2 class="mt-2 font-serif text-lg">마음 전하실 곳</h2>
      </div>

      <p
        v-motion-fade-up
        :delay="150"
        class="mb-8 text-center text-sm leading-6 text-muted"
      >
        참석이 어려우신 분들을 위해 기재했습니다.<br />
        너그러운 마음으로 양해 부탁드립니다.
      </p>

      <div class="space-y-3">
        <details
          v-for="g in accountGroups"
          :key="g.key"
          class="group overflow-hidden rounded-md border border-line"
        >
          <summary
            class="flex cursor-pointer list-none items-center justify-between px-4 py-3.5 text-sm"
          >
            {{ g.label }}
            <span class="text-muted transition group-open:rotate-180">⌄</span>
          </summary>

          <ul class="divide-y divide-line border-t border-line">
            <li
              v-for="a in wedding.accounts[g.key]"
              :key="a.number"
              class="flex items-center justify-between px-4 py-3.5"
            >
              <div class="text-sm">
                <p>{{ a.bank }} {{ a.number }}</p>
                <p class="mt-0.5 text-xs text-muted">{{ a.holder }}</p>
              </div>
              <button
                type="button"
                class="rounded border border-line px-2.5 py-1 text-xs"
                @click="copy(`${a.bank} ${a.number}`)"
              >
                복사
              </button>
            </li>
          </ul>
        </details>
      </div>
    </section>

    <!-- ───────── 미니홈피 버전으로 ───────── -->
    <section class="px-6 pb-16">
      <NuxtLink
        to="/minihomepage"
        class="block rounded-md border border-dashed border-point/50 bg-[#f6f2ec] px-5 py-6 text-center"
      >
        <p class="text-xs text-muted">방명록 쓰러가기</p>
        <p class="mt-2 font-pixel text-sm text-ink">
          🏠 도혜성 미니홈피 놀러가기 →
        </p>
      </NuxtLink>
    </section>

    <!-- ───────── 푸터 ───────── -->
    <footer class="border-t border-line px-6 pt-10 pb-16 text-center">
      <KakaoShareButton
        class="w-full rounded-md bg-[#fee500] py-3.5 text-sm font-medium text-[#191919]"
      >
        카카오톡으로 공유하기
      </KakaoShareButton>
      <p class="mt-10 text-[11px] tracking-[0.3em] text-muted uppercase">
        Thank you
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 페이지가 바뀔 때: 새 페이지가 나타나기 직전에 맨 위로 (스르륵 없이)
definePageMeta({
  pageTransition: {
    name: "page",
    mode: "out-in",
    onBeforeEnter: () => window.scrollTo(0, 0),
  },
});

const { wedding, dateText, dotDate, day, cells, dday, mapLinks, copy } =
  useWedding();
const { preview, showAll, visiblePhotos, viewerOpen, viewerIndex, openViewer } =
  useGallery();
useWeddingSeo();

const accountGroups = [
  { key: "groom" as const, label: "신랑측 계좌번호" },
  { key: "bride" as const, label: "신부측 계좌번호" },
];

// 약도 이미지 크게 보기
const mapGuideOpen = ref(false);
</script>
