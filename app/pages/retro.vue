<template>
  <div class="min-h-dvh p-3 font-pixel text-[13px]">
    <!-- 바깥 프레임 (점선 바느질) -->
    <div class="rounded-2xl border-2 border-dashed border-white/80 p-2">
      <!-- 상단: 카운터 + 제목 -->
      <div
        class="flex items-end justify-between px-1 pb-2 text-[11px] text-white"
      >
        <p>
          TODAY <span class="text-point">{{ today }}</span>
          <span class="mx-1">|</span>
          TOTAL {{ total?.toLocaleString() ?? "" }}
        </p>
        <p class="truncate pl-2">{{ wedding.homeTitle }}</p>
      </div>

      <!-- 본문 흰 판 -->
      <div class="overflow-hidden rounded-xl bg-white">
        <!-- ───────── 홈 ───────── -->
        <section id="home" class="scroll-mt-14 p-3">
          <!-- 프로필 박스 -->
          <div class="flex gap-3">
            <div class="w-[42%] shrink-0">
              <div
                class="aspect-[3/4] overflow-hidden border border-line bg-[#f2f2f2] p-1"
              >
                <!-- <img
                  :src="'/images/main.webp'"
                  alt=""
                  class="h-full w-full object-cover"
                  onerror="this.style.display='none'"
                /> -->
              </div>
              <p class="mt-2 text-[11px] text-muted">
                Today is.. <span class="text-link">{{ wedding.mood }}</span>
              </p>
            </div>

            <div class="flex min-w-0 flex-1 flex-col">
              <p class="leading-6 whitespace-pre-line">{{ wedding.intro }}</p>

              <div
                class="mt-3 border-t border-dashed border-line pt-3 text-[12px] leading-6"
              >
                <p>
                  <span class="text-muted">신랑</span> {{ wedding.groom.name }}
                </p>
                <p>
                  <span class="text-muted">신부</span> {{ wedding.bride.name }}
                </p>
                <p class="text-link">{{ dotDate }}</p>
              </div>

              <p
                v-if="dday !== null"
                class="mt-auto pt-3 text-right text-[12px]"
              >
                <template v-if="dday > 0"
                  >D-<span class="text-point">{{ dday }}</span></template
                >
                <template v-else-if="dday === 0"
                  ><span class="text-point">D-DAY</span> ♥</template
                >
                <template v-else>Just Married ♥</template>
              </p>
            </div>
          </div>

          <!-- BGM 바 -->
          <div
            class="mt-3 flex items-center gap-2 rounded border border-line bg-[#f7f7f7] px-2 py-1.5 text-[11px]"
          >
            <button
              type="button"
              class="flex size-5 items-center justify-center rounded-sm bg-link text-[9px] text-white"
              @click="toggleBgm"
            >
              {{ playing ? "❚❚" : "▶" }}
            </button>
            <span class="text-muted">BGM</span>
            <div class="marquee min-w-0 flex-1">
              <div class="marquee-track">
                <span>♪ {{ wedding.bgmTitle }}</span>
                <span aria-hidden="true">♪ {{ wedding.bgmTitle }}</span>
              </div>
            </div>
            <audio
              ref="audio"
              src="/bgm.mp3"
              loop
              preload="none"
              @ended="playing = false"
            />
          </div>

          <!-- 미니룸 -->
          <div class="mt-3 border border-line">
            <p
              class="border-b border-line bg-[#f7f7f7] px-2 py-1 text-[11px] text-muted"
            >
              미니룸
            </p>
            <MiniRoom scene="B" />
          </div>
        </section>

        <!-- 탭 메뉴 (스크롤해도 상단 고정) -->
        <nav class="sticky top-0 z-10 flex border-y border-line bg-white">
          <button
            v-for="t in tabs"
            :key="t.id"
            type="button"
            class="flex-1 py-2.5 text-[12px]"
            :class="activeTab === t.id ? 'bg-point text-white' : 'text-ink'"
            @click="goTab(t.id)"
          >
            {{ t.label }}
          </button>
        </nav>

        <!-- ───────── 다이어리 ───────── -->
        <section id="diary" class="scroll-mt-12 p-3">
          <div class="border border-line">
            <div
              class="flex justify-between border-b border-line bg-[#f7f7f7] px-2 py-1 text-[11px]"
            >
              <span class="text-link">다이어리</span>
              <span class="text-muted">{{ dotDate }}</span>
            </div>

            <div class="px-3 py-5 text-center">
              <p class="leading-7 whitespace-pre-line">
                {{ wedding.greeting }}
              </p>

              <p class="my-5 text-point">♥ ♥ ♥</p>

              <div class="space-y-1 text-[12px]">
                <p v-for="p in [wedding.groom, wedding.bride]" :key="p.name">
                  <span class="text-muted"
                    >{{ p.father }} · {{ p.mother }}의 {{ p.order }}</span
                  >
                  {{ p.name }}
                </p>
              </div>
            </div>

            <!-- 달력 -->
            <div class="border-t border-dashed border-line px-3 py-4">
              <p class="mb-3 text-center text-[12px]">{{ dateText }}</p>
              <div class="mx-auto max-w-[300px]">
                <div
                  class="grid grid-cols-7 text-center text-[11px] text-muted"
                >
                  <span class="text-[#e84a5f]">일</span><span>월</span
                  ><span>화</span><span>수</span><span>목</span><span>금</span
                  ><span class="text-link">토</span>
                </div>
                <div
                  class="mt-2 grid grid-cols-7 gap-y-1 text-center text-[12px]"
                >
                  <span
                    v-for="(c, i) in cells"
                    :key="i"
                    class="mx-auto flex size-8 items-center justify-center"
                    :class="[
                      c === day ? 'bg-point text-white' : '',
                      c !== day && i % 7 === 0 ? 'text-[#e84a5f]' : '',
                      c !== day && i % 7 === 6 ? 'text-link' : '',
                    ]"
                    >{{ c ?? "" }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ───────── 사진첩 ───────── -->
        <section id="photo" class="scroll-mt-12 p-3">
          <div class="border border-line">
            <p class="border-b border-line bg-[#f7f7f7] px-2 py-1 text-[11px]">
              <span class="text-link">📁 사진첩</span>
              <span class="text-muted"> ({{ wedding.gallery.length }})</span>
            </p>

            <div class="grid grid-cols-3 gap-1 p-2">
              <button
                v-for="(src, i) in visiblePhotos"
                :key="src"
                type="button"
                class="aspect-square overflow-hidden border border-line bg-[#f2f2f2] p-0.5"
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
              v-if="wedding.gallery.length > PREVIEW"
              type="button"
              class="w-full border-t border-line py-2 text-[12px] text-link"
              @click="showAll = !showAll"
            >
              {{
                showAll
                  ? "접기 ▲"
                  : `더보기 (+${wedding.gallery.length - PREVIEW}) ▼`
              }}
            </button>
          </div>

          <!-- 크게 보기 -->
          <UModal
            v-model:open="viewerOpen"
            :ui="{
              content:
                'w-[calc(100%-2rem)] max-w-[400px] rounded-none bg-white ring-1 ring-line font-pixel',
            }"
          >
            <template #content>
              <!-- 창 제목줄 -->
              <div
                class="flex items-center justify-between border-b border-line bg-[#f7f7f7] px-3 py-2 text-[12px]"
              >
                <span class="text-link"
                  >📁 사진첩
                  <span class="text-muted"
                    >{{ viewerIndex + 1 }} / {{ wedding.gallery.length }}</span
                  ></span
                >
                <button
                  type="button"
                  class="px-1 text-muted"
                  aria-label="닫기"
                  @click="viewerOpen = false"
                >
                  ✕
                </button>
              </div>

              <!-- 사진 -->
              <UCarousel
                v-slot="{ item }"
                :items="wedding.gallery"
                :start-index="viewerIndex"
                arrows
                loop
                :ui="{
                  prev: 'start-2',
                  next: 'end-2',
                }"
                @select="viewerIndex = $event"
              >
                <div
                  class="flex aspect-[3/4] items-center justify-center bg-[#f2f2f2] p-2"
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
        <section id="location" class="scroll-mt-12 p-3">
          <div class="border border-line">
            <p
              class="border-b border-line bg-[#f7f7f7] px-2 py-1 text-[11px] text-link"
            >
              오시는길
            </p>

            <div class="px-3 py-4 text-center">
              <p>{{ wedding.venue.name }} {{ wedding.venue.hall }}</p>
              <p class="mt-1 text-[12px] text-muted">
                {{ wedding.venue.address }}
              </p>
              <a
                :href="`tel:${wedding.venue.tel}`"
                class="mt-1 inline-block text-[12px] text-link"
                >☎ {{ wedding.venue.tel }}</a
              >
            </div>

            <!-- 지도 자리 -->
            <div class="aspect-[4/3] border-y border-line bg-[#eef3f7]" />

            <div class="grid grid-cols-3 gap-1 p-2">
              <a
                v-for="l in mapLinks"
                :key="l.label"
                :href="l.href"
                target="_blank"
                rel="noopener"
                class="border border-line bg-[#f7f7f7] py-2 text-center text-[11px]"
                >{{ l.label }}</a
              >
            </div>
          </div>
        </section>

        <!-- ───────── 마음함 (계좌) ───────── -->
        <section id="gift" class="scroll-mt-12 p-3">
          <div class="border border-line">
            <p
              class="border-b border-line bg-[#f7f7f7] px-2 py-1 text-[11px] text-link"
            >
              마음을 전하는 곳
            </p>

            <div class="space-y-2 p-2">
              <details
                v-for="g in accountGroups"
                :key="g.key"
                class="group border border-line"
              >
                <summary
                  class="flex cursor-pointer list-none items-center justify-between px-3 py-2.5 text-[12px]"
                >
                  🎁 {{ g.label }}
                  <span class="text-muted group-open:hidden">▼</span>
                  <span class="hidden text-muted group-open:inline">▲</span>
                </summary>

                <ul class="border-t border-dashed border-line">
                  <li
                    v-if="!wedding.accounts[g.key].length"
                    class="px-3 py-3 text-[12px] text-muted"
                  >
                    계좌 정보를 입력해 주세요
                  </li>
                  <li
                    v-for="a in wedding.accounts[g.key]"
                    :key="a.number"
                    class="flex items-center justify-between px-3 py-2.5 text-[12px]"
                  >
                    <div>
                      <p>{{ a.bank }} {{ a.number }}</p>
                      <p class="text-[11px] text-muted">{{ a.holder }}</p>
                    </div>
                    <button
                      type="button"
                      class="border border-line bg-[#f7f7f7] px-2 py-1 text-[11px]"
                      @click="copy(`${a.bank} ${a.number}`)"
                    >
                      복사
                    </button>
                  </li>
                </ul>
              </details>
            </div>
          </div>
        </section>

        <!-- 푸터 -->
        <footer
          class="border-t border-line px-3 py-4 text-center text-[11px] text-muted"
        >
          <!-- 카카오 공유 버튼 자리: <KakaoShareButton /> -->
          ♥ thank you for visiting ♥
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/ko";

dayjs.extend(utc);
dayjs.locale("ko");

/* ───────── 청첩장 내용 (여기만 수정) ───────── */
const wedding = {
  groom: { name: "구혜성", father: "구진회", mother: "유소영", order: "장남" },
  bride: { name: "김도혜", father: "김준호", mother: "박종란", order: "장녀" },

  date: "2027-02-13T11:50:00+09:00", // 예식 일시
  metDate: "2024-03-10", // 처음 만난 날

  venue: {
    name: "AW컨벤션 안산",
    hall: "3층 그랜드볼룸홀",
    address: "경기 안산시 단원구 광덕1로 171",
    tel: "031-501-5900",
    lat: 37.5665,
    lng: 126.978,
  },

  homeTitle: "도혜 ♥ 혜성의 미니홈피",
  mood: "💍 결혼해요",
  intro: "소중한 분들을\n초대합니다 ♡",
  bgmTitle: "The Beginning of Us - 혜성 & 도혜",

  greeting: `서로 다른 길을 걸어온 두 사람이
이제 같은 길을 함께 걸어가려 합니다.

저희의 새로운 시작을
따뜻한 마음으로 축복해 주세요.`,

  gallery: Array.from(
    { length: 21 },
    (_, i) => `/images/gallery/${String(i + 1).padStart(2, "0")}.webp`
  ),

  accounts: {
    groom: [
      { bank: "○○은행", number: "000-0000-0000", holder: "구혜성" },
      { bank: "○○은행", number: "000-0000-0000", holder: "구혜성" },
    ],
    bride: [
      { bank: "○○은행", number: "000-0000-0000", holder: "김도혜" },
      { bank: "○○은행", number: "000-0000-0000", holder: "김도혜" },
    ],
  } as Record<
    "groom" | "bride",
    { bank: string; number: string; holder: string }[]
  >,
};

useSeoMeta({ title: "The Beginning of Us" });

/* ───────── 날짜 (항상 한국 시간 기준) ───────── */
const KST = 9 * 60;
const wd = dayjs(wedding.date).utcOffset(KST);
const valid = wd.isValid();

const dateText = valid
  ? wd.format(
      wd.minute()
        ? "YYYY년 M월 D일 dddd A h시 m분"
        : "YYYY년 M월 D일 dddd A h시"
    )
  : "날짜를 입력해 주세요";
const dotDate = valid ? wd.format("YYYY.MM.DD") : "0000.00.00";

// 달력
const day = valid ? wd.date() : 0;
const monthStart = valid ? wd.startOf("month") : dayjs("2027-01-01");
const cells = [
  ...Array.from({ length: monthStart.day() }, () => null),
  ...Array.from({ length: monthStart.daysInMonth() }, (_, i) => i + 1),
];

// 접속 시점 기준 값들 (브라우저에서 계산)
const dday = ref<number | null>(null);
const total = ref<number | null>(null);
const today = ref("");

/* ───────── 사진첩 ───────── */
const PREVIEW = 9; // 처음에 보여줄 사진 수
const showAll = ref(false);
const visiblePhotos = computed(() =>
  showAll.value ? wedding.gallery : wedding.gallery.slice(0, PREVIEW)
);

const viewerOpen = ref(false);
const viewerIndex = ref(0);
function openViewer(i: number) {
  viewerIndex.value = i;
  viewerOpen.value = true;
}

/* ───────── 탭 메뉴 ───────── */
const tabs = [
  { id: "home", label: "홈" },
  { id: "diary", label: "다이어리" },
  { id: "photo", label: "사진첩" },
  { id: "location", label: "오시는길" },
  { id: "gift", label: "마음함" },
];
const activeTab = ref("home");
function goTab(id: string) {
  activeTab.value = id;
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/* ───────── BGM (public/bgm.mp3 넣으면 재생) ───────── */
const audio = ref<HTMLAudioElement | null>(null);
const playing = ref(false);
async function toggleBgm() {
  if (!audio.value) return;
  if (playing.value) {
    audio.value.pause();
    playing.value = false;
  } else {
    try {
      await audio.value.play();
      playing.value = true;
    } catch {
      playing.value = false;
    }
  }
}

/* ───────── 미니룸 픽셀 아트 ───────── */
const PALETTE: Record<string, string> = {
  H: "#3b2a20",
  B: "#8b5a3c",
  S: "#ffd9b8",
  E: "#2b2b2b",
  P: "#ffb3b3",
  K: "#2f3542",
  W: "#ffffff",
  R: "#e84a5f",
  D: "#5a3d2b",
  V: "#e9e9f2",
  F: "#ff8fab",
  G: "#7cc576",
};

const GROOM = [
  "..HHHHH..",
  ".HHHHHHH.",
  ".HSSSSSH.",
  ".SESSSES.",
  ".SPSSSPS.",
  "..SSSSS..",
  ".KKWRWKK.",
  "KKKWRWKKK",
  "KKKWWWKKK",
  "SKKKKKKKS",
  ".KKKKKKK.",
  ".KKK.KKK.",
  ".KKK.KKK.",
  ".DDD.DDD.",
];

const BRIDE = [
  "..VBBBV..",
  ".VBBBBBV.",
  "VBSSSSSBV",
  "VSESSSESV",
  "VSPSSSPSV",
  "V.SSSSS.V",
  "V.WWWWW.V",
  "VWWWFWWWV",
  ".SWFGFWS.",
  ".WWWWWWW.",
  "WWWWWWWWW",
  "WWWWWWWWW",
  "WWWWWWWWW",
  ".WWWWWWW.",
];

const HEART = [".R.R.", "RRRRR", ".RRR.", "..R.."];

function sprite(rows: string[], ox: number, oy: number) {
  return rows.flatMap((row, y) =>
    [...row]
      .map((c, x) => ({ x: x + ox, y: y + oy, c }))
      .filter((p) => p.c !== ".")
  );
}

const pixels = [
  ...sprite(HEART, 9, 0),
  ...sprite(GROOM, 1, 3),
  ...sprite(BRIDE, 13, 3),
];

/* ───────── 오시는 길 ───────── */
const venueName = encodeURIComponent(wedding.venue.name);
const mapLinks = [
  { label: "네이버지도", href: `https://map.naver.com/p/search/${venueName}` },
  {
    label: "카카오맵",
    href: `https://map.kakao.com/link/to/${venueName},${wedding.venue.lat},${wedding.venue.lng}`,
  },
  {
    label: "티맵",
    href: `tmap://route?goalname=${venueName}&goaly=${wedding.venue.lat}&goalx=${wedding.venue.lng}`,
  },
];

/* ───────── 계좌 복사 ───────── */
const accountGroups = [
  { key: "groom" as const, label: "신랑측 계좌번호" },
  { key: "bride" as const, label: "신부측에 계좌번호" },
];
const toast = useToast();
async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast.add({ title: "계좌번호가 복사되었습니다", duration: 1500 });
  } catch {
    toast.add({ title: "복사에 실패했습니다", color: "error", duration: 1500 });
  }
}

const route = useRoute();
onMounted(() => {
  const now = dayjs().startOf("day");

  if (valid) dday.value = wd.startOf("day").diff(now, "day");
  total.value = now.diff(dayjs(wedding.metDate), "day") + 1; // 만난 날
  today.value = now.format("M.D");

  if (route.query.section) {
    nextTick(() => {
      document
        .getElementById(String(route.query.section))
        ?.scrollIntoView({ behavior: "smooth" });
    });
  }
});
</script>

<style scoped>
/* BGM 전광판 흐르는 글자 */
.marquee {
  overflow: hidden;
  white-space: nowrap;
}
.marquee-track {
  display: inline-flex;
  animation: marquee 10s linear infinite;
}
.marquee-track span {
  padding-right: 1.5em; /* 문구 사이 간격 */
}
@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

/* 움직임 줄이기 설정한 사람은 멈춤 */
@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
  }
}
</style>
