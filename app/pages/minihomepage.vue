<!-- 미니홈피 버전: 놀러 와서 구경하고 방명록 남기는 곳 -->
<template>
  <div class="min-h-dvh p-3 font-pixel text-[13px]">
    <!-- 기본 청첩장으로 돌아가기 -->
    <NuxtLink to="/" class="mb-2 inline-block px-1 text-[11px] text-white"
      >← 청첩장으로 돌아가기</NuxtLink
    >

    <!-- 바깥 프레임 (점선 바느질) -->
    <div class="rounded-2xl border-2 border-dashed border-white/80 p-2">
      <!-- 상단: 카운터 + 제목 -->
      <div
        class="flex items-end justify-between px-1 pb-2 text-[11px] text-white"
      >
        <p>
          TODAY <span class="text-point">{{ today ?? "" }}</span>
          <span class="mx-1">|</span>
          TOTAL {{ total?.toLocaleString() ?? "" }}
        </p>
        <p class="truncate pl-2">{{ wedding.retro.homeTitle }}</p>
      </div>

      <!-- 본문 흰 판 -->
      <div class="overflow-clip rounded-xl bg-white">
        <!-- ───────── 홈 ───────── -->
        <section id="home" class="scroll-mt-14 p-3">
          <!-- 프로필 박스 -->
          <div class="flex gap-3">
            <div class="w-[42%] shrink-0">
              <div
                class="aspect-[3/4] overflow-hidden border border-line bg-[#f2f2f2] p-1"
              >
                <img
                  :src="wedding.mainPhoto"
                  alt=""
                  class="h-full w-full object-cover"
                  onerror="this.style.display='none'"
                />
              </div>
              <p class="mt-2 text-[11px] text-muted">
                Today is..
                <span class="text-link">{{ wedding.retro.mood }}</span>
              </p>
            </div>

            <div class="flex min-w-0 flex-1 flex-col">
              <p class="leading-6 whitespace-pre-line">
                {{ wedding.retro.intro }}
              </p>

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
              class="flex size-5 shrink-0 items-center justify-center rounded-sm bg-link text-[9px] text-white"
              @click="toggleBgm"
            >
              {{ playing ? "❚❚" : "▶" }}
            </button>
            <span class="shrink-0 text-muted">BGM</span>
            <div class="marquee min-w-0 flex-1">
              <div class="marquee-track">
                <span>♪ {{ wedding.retro.bgmTitle }}</span>
                <span aria-hidden="true">♪ {{ wedding.retro.bgmTitle }}</span>
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
            <img
              src="/images/miniroom-loop.gif"
              alt="신랑 신부 캐릭터가 방을 돌아다니는 모습"
              class="pixelated block aspect-[16/10] w-full"
            />
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

        <!-- ───────── 다이어리 (우리 이야기) ───────── -->
        <section id="diary" class="scroll-mt-12 p-3">
          <div class="border border-line">
            <div
              class="flex justify-between border-b border-line bg-[#f7f7f7] px-2 py-1 text-[11px]"
            >
              <span class="text-link">📔 다이어리</span>
              <span class="text-muted">우리 이야기 ({{ stories.length }})</span>
            </div>

            <article
              v-for="(s, i) in stories"
              :key="s.date + s.title"
              class="px-3 py-4"
              :class="i > 0 && 'border-t border-dashed border-line'"
            >
              <div class="flex items-center justify-between text-[11px]">
                <span class="text-muted">{{ s.dateLabel }}</span>
                <span v-if="s.dayCount" class="text-point"
                  >D+{{ s.dayCount.toLocaleString() }}</span
                >
              </div>
              <h3 class="mt-1.5 text-[13px]">
                <span v-if="s.mood" class="mr-1">{{ s.mood }}</span
                >{{ s.title }}
              </h3>
              <div
                v-if="s.photo"
                class="mt-2 border border-line bg-[#f2f2f2] p-1"
              >
                <img
                  :src="s.photo"
                  alt=""
                  loading="lazy"
                  class="block aspect-[4/3] w-full object-cover"
                  onerror="this.parentElement.style.display='none'"
                />
              </div>
              <p
                class="mt-2 text-[12px] leading-6 whitespace-pre-line text-ink"
              >
                {{ s.text }}
              </p>
            </article>
          </div>
        </section>

        <!-- ───────── 사진첩 ───────── -->
        <section id="photo" class="scroll-mt-12 p-3">
          <div class="border border-line">
            <!-- 제목줄 -->
            <p class="border-b border-line bg-[#f7f7f7] px-2 py-1 text-[11px]">
              <span class="text-link">
                <svg
                  viewBox="0 0 12 10"
                  class="mr-1 inline-block size-3.5 align-[-2px]"
                  shape-rendering="crispEdges"
                  aria-hidden="true"
                >
                  <path d="M0 1h5v1h7v8H0z" fill="#e0a92e" />
                  <path d="M1 3h10v6H1z" fill="#f7d36b" /></svg
                >사진첩
              </span>
              <span class="text-muted"> ({{ album.length }})</span>
            </p>

            <!-- 폴더 -->
            <div
              class="flex flex-wrap gap-x-3 gap-y-1 border-b border-dashed border-line px-2 py-2 text-[11px]"
            >
              <button
                v-for="f in folders"
                :key="f.name"
                type="button"
                :class="folder === f.name ? 'text-point' : 'text-muted'"
                @click="selectFolder(f.name)"
              >
                <svg
                  viewBox="0 0 12 10"
                  class="mr-0.5 inline-block size-3.5 align-[-2px]"
                  shape-rendering="crispEdges"
                  aria-hidden="true"
                >
                  <template v-if="folder === f.name">
                    <path d="M0 1h5v1h6v2H0z" fill="#e0a92e" />
                    <path d="M1 4h11l-1 6H0z" fill="#f7d36b" />
                  </template>
                  <template v-else>
                    <path d="M0 1h5v1h7v8H0z" fill="#e0a92e" />
                    <path d="M1 3h10v6H1z" fill="#f7d36b" />
                  </template>
                </svg>
                {{ f.name }} <span class="text-[10px]">({{ f.count }})</span>
              </button>
            </div>

            <!-- 게시물 (한 장씩) -->
            <article v-if="post" :key="post.photo">
              <div
                class="flex items-center justify-between bg-[#fbfbfb] px-2 py-1.5 text-[12px]"
              >
                <span class="min-w-0 truncate">
                  <!-- <span class="text-muted"
                    >No.{{ folderPhotos.length - page }}</span
                  > -->
                  <span class="ml-1.5">{{ post.title }}</span>
                </span>
                <span class="shrink-0 pl-2 text-[10px] text-muted">{{
                  post.date
                }}</span>
              </div>

              <button
                type="button"
                class="block w-full border-y border-line bg-[#f2f2f2] p-2"
                @click="zoomOpen = true"
              >
                <img
                  :src="post.photo"
                  alt=""
                  class="mx-auto block max-h-[420px] w-auto border border-line bg-white p-1"
                />
              </button>

              <p class="px-3 py-3 text-[12px] leading-5 whitespace-pre-line">
                {{ post.text }}
              </p>
              <p class="px-3 pb-2 text-right text-[10px] text-muted">
                {{ post.folder }}
              </p>
            </article>

            <!-- 페이지 번호 (5개씩) -->
            <div
              class="flex items-center justify-center gap-1 border-t border-line py-2 text-[12px]"
            >
              <button
                type="button"
                class="px-1.5 text-muted disabled:opacity-30"
                :disabled="page === 0"
                @click="page--"
              >
                ◀
              </button>
              <button
                v-for="n in pageNumbers"
                :key="n"
                type="button"
                class="min-w-6 px-1"
                :class="
                  n - 1 === page
                    ? 'font-bold text-point underline'
                    : 'text-link'
                "
                @click="page = n - 1"
              >
                {{ n }}
              </button>
              <button
                type="button"
                class="px-1.5 text-muted disabled:opacity-30"
                :disabled="page >= folderPhotos.length - 1"
                @click="page++"
              >
                ▶
              </button>
            </div>
          </div>

          <!-- 크게 보기 -->
          <UModal
            v-model:open="zoomOpen"
            :ui="{
              content:
                'w-[calc(100%-2rem)] max-w-[440px] rounded-none bg-white ring-1 ring-line font-pixel',
            }"
          >
            <template #content>
              <div
                class="flex items-center justify-between border-b border-line bg-[#f7f7f7] px-3 py-2 text-[12px]"
              >
                <span class="truncate text-link">
                  <svg
                    viewBox="0 0 12 10"
                    class="mr-1 inline-block size-3.5 align-[-2px]"
                    shape-rendering="crispEdges"
                    aria-hidden="true"
                  >
                    <path d="M0 1h5v1h7v8H0z" fill="#e0a92e" />
                    <path d="M1 3h10v6H1z" fill="#f7d36b" /></svg
                  >{{ post?.title }}
                </span>
                <button
                  type="button"
                  class="px-1 text-muted"
                  aria-label="닫기"
                  @click="zoomOpen = false"
                >
                  ✕
                </button>
              </div>
              <div class="bg-[#f2f2f2] p-2">
                <img
                  v-if="post"
                  :src="post.photo"
                  alt=""
                  class="mx-auto block max-h-[75dvh] w-auto"
                />
              </div>
            </template>
          </UModal>
        </section>

        <!-- ───────── 방명록 ───────── -->
        <section id="guestbook" class="scroll-mt-12 p-3">
          <div class="border border-line">
            <p class="border-b border-line bg-[#f7f7f7] px-2 py-1 text-[11px]">
              <span class="text-link">✏️ 방명록</span>
              <span class="text-muted"> ({{ entries.length }})</span>
            </p>

            <!-- 글쓰기 -->
            <form
              class="space-y-2 border-b border-line bg-[#fbfbfb] p-2"
              @submit.prevent="submitGuestbook"
            >
              <div class="flex gap-2">
                <input
                  v-model="form.name"
                  type="text"
                  maxlength="20"
                  placeholder="이름"
                  class="min-w-0 flex-1 border border-line bg-white px-2 py-1.5 text-[12px] outline-none focus:border-link"
                />
                <input
                  v-model="form.password"
                  type="password"
                  maxlength="20"
                  placeholder="비밀번호 (삭제용)"
                  autocomplete="new-password"
                  class="min-w-0 flex-1 border border-line bg-white px-2 py-1.5 text-[12px] outline-none focus:border-link"
                />
              </div>
              <textarea
                v-model="form.message"
                rows="3"
                maxlength="300"
                placeholder="축하 메시지를 남겨주세요 ♡"
                class="w-full resize-none border border-line bg-white px-2 py-1.5 text-[12px] leading-5 outline-none focus:border-link"
              />
              <div class="flex items-center justify-between">
                <span class="text-[10px] text-muted"
                  >{{ form.message.length }}/300</span
                >
                <button
                  type="submit"
                  :disabled="sending"
                  class="border border-line bg-[#f7f7f7] px-3 py-1 text-[12px] disabled:opacity-50"
                >
                  등록
                </button>
              </div>
            </form>

            <!-- 목록 -->
            <p
              v-if="gbLoading && !entries.length"
              class="px-3 py-6 text-center text-[12px] text-muted"
            >
              불러오는 중...
            </p>
            <p
              v-else-if="!entries.length"
              class="px-3 py-6 text-center text-[12px] text-muted"
            >
              첫 번째 방명록을 남겨주세요 ♡
            </p>
            <ul>
              <li
                v-for="(e, i) in visibleEntries"
                :key="e.id"
                :class="i > 0 && 'border-t border-dashed border-line'"
              >
                <div
                  class="flex items-center justify-between bg-[#f7f7f7] px-2 py-1 text-[11px]"
                >
                  <span>
                    <span class="text-muted">No.{{ entries.length - i }}</span>
                    <span class="ml-1.5 text-link">{{ e.name }}</span>
                  </span>
                  <span class="flex items-center gap-2 text-[10px] text-muted">
                    {{ formatEntryDate(e.createdAt) }}
                    <button
                      type="button"
                      class="text-muted underline"
                      @click="deleteEntry(e.id)"
                    >
                      삭제
                    </button>
                  </span>
                </div>
                <div class="flex gap-3 px-2 py-3">
                  <svg
                    viewBox="0 0 8 8"
                    class="pixelated size-10 shrink-0 border border-line bg-[#fff4f6] p-1"
                    shape-rendering="crispEdges"
                    aria-hidden="true"
                  >
                    <rect
                      v-for="p in avatarPixels"
                      :key="`${p.x},${p.y}`"
                      :x="p.x"
                      :y="p.y"
                      width="1"
                      height="1"
                      :fill="avatarColor(p.c, e.avatar)"
                    />
                  </svg>
                  <p
                    class="min-w-0 flex-1 text-[12px] leading-5 break-words whitespace-pre-line"
                  >
                    {{ e.message }}
                  </p>
                </div>
              </li>
            </ul>

            <button
              v-if="entries.length > gbShown"
              type="button"
              class="w-full border-t border-line py-2 text-[12px] text-link"
              @click="gbShown += GB_PAGE"
            >
              방명록 더보기 ▼
            </button>
          </div>
        </section>

        <!-- ───────── 오시는길 ───────── -->
        <section id="info" class="scroll-mt-12 p-3">
          <div class="border border-line">
            <p
              class="border-b border-line bg-[#f7f7f7] px-2 py-1 text-[11px] text-link"
            >
              📍 오시는길
            </p>

            <dl class="space-y-2 px-3 py-3 text-[12px]">
              <div class="flex gap-3">
                <dt class="w-9 shrink-0 text-muted">일시</dt>
                <dd>{{ dateText }}</dd>
              </div>
              <div class="flex gap-3">
                <dt class="w-9 shrink-0 text-muted">장소</dt>
                <dd>{{ wedding.venue.name }} {{ wedding.venue.hall }}</dd>
              </div>
              <div class="flex gap-3">
                <dt class="w-9 shrink-0 text-muted">주소</dt>
                <dd class="min-w-0 flex-1">
                  {{ wedding.venue.address }}
                  <button
                    type="button"
                    class="ml-1 border border-line bg-[#f7f7f7] px-1.5 text-[10px]"
                    @click="
                      copy(wedding.venue.address, '주소가 복사되었습니다')
                    "
                  >
                    복사
                  </button>
                </dd>
              </div>
              <div class="flex gap-3">
                <dt class="w-9 shrink-0 text-muted">문의</dt>
                <dd>
                  <a :href="`tel:${wedding.venue.tel}`" class="text-link">{{
                    wedding.venue.tel
                  }}</a>
                </dd>
              </div>
            </dl>

            <!-- 간단한 약도 -->
            <KakaoMap
              :lat="wedding.venue.lat"
              :lng="wedding.venue.lng"
              :level="3"
              class="aspect-[2/1] border-y border-line bg-[#eef3f7]"
            />

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

            <!-- 자세한 건 기본 청첩장에서 -->
            <div
              class="grid grid-cols-2 border-t border-line text-center text-[11px]"
            >
              <NuxtLink
                to="/#location"
                class="border-r border-line py-2 text-muted"
                >자세한 위치 안내 →</NuxtLink
              >
              <NuxtLink to="/#account" class="py-2 text-muted"
                >마음 전하실 곳 →</NuxtLink
              >
            </div>
          </div>
        </section>

        <!-- 푸터 -->
        <footer
          class="border-t border-line px-3 py-4 text-center text-[11px] text-muted"
        >
          <KakaoShareButton
            class="mb-3 w-full border border-line bg-[#fee500] py-2.5 text-[12px] text-[#191919]"
          >
            💬 카카오톡으로 공유하기
          </KakaoShareButton>
          ♥ thank you for visiting ♥
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";

const { wedding, dateText, dotDate, dday, total, mapLinks, copy } =
  useWedding();
const {
  entries,
  loading: gbLoading,
  sending,
  load,
  add,
  remove,
} = useGuestbook();
useWeddingSeo();

// 이 페이지에서만 미니홈피 색/폰트 (나가면 자동으로 원래대로)
useHead({ bodyAttrs: { class: "theme-retro" } });

/* ───────── TODAY: 오늘 날짜(일) ───────── */
const today = ref<number | null>(null);
onMounted(() => {
  today.value = dayjs().date();
  load().catch(() => {
    toast.add({
      title: "방명록을 불러오지 못했어요",
      color: "error",
      duration: 2000,
    });
  });
});

/* ───────── 탭 메뉴 ───────── */
const tabs = [
  { id: "home", label: "홈" },
  { id: "diary", label: "다이어리" },
  { id: "photo", label: "사진첩" },
  { id: "guestbook", label: "방명록" },
  { id: "info", label: "오시는길" },
];
const activeTab = ref("home");
function goTab(id: string) {
  activeTab.value = id;
  if (id === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
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

/* ───────── 다이어리 ───────── */
const stories = wedding.stories.map((s) => {
  const d = dayjs(s.date);
  return {
    ...s,
    dateLabel: d.isValid() ? d.format("YYYY.MM.DD (ddd)") : s.date,
    dayCount: d.isValid() ? d.diff(dayjs(wedding.metDate), "day") + 1 : null, // 만난 날 = D+1
  };
});

/* ───────── 방명록 ───────── */
const GB_PAGE = 5;
const gbShown = ref(GB_PAGE);
const visibleEntries = computed(() => entries.value.slice(0, gbShown.value));
const form = reactive({ name: "", message: "", password: "" });
const toast = useToast();

async function submitGuestbook() {
  const name = form.name.trim();
  const message = form.message.trim();
  if (!name || !message || !form.password) {
    toast.add({
      title: "이름, 비밀번호, 메시지를 모두 적어주세요",
      color: "warning",
      duration: 1500,
    });
    return;
  }
  const error = await add(name, message, form.password);
  if (error) {
    toast.add({ title: error, color: "error", duration: 2000 });
    return;
  }
  form.message = "";
  form.password = "";
  toast.add({ title: "방명록이 등록되었습니다 ♡", duration: 1500 });
}

async function deleteEntry(id: number) {
  const password = window.prompt("글을 쓸 때 입력한 비밀번호를 적어주세요");
  if (!password) return;
  const error = await remove(id, password);
  toast.add(
    error
      ? { title: error, color: "error", duration: 2000 }
      : { title: "삭제되었습니다", duration: 1500 }
  );
}

function formatEntryDate(iso: string) {
  return dayjs(iso).format("YYYY.MM.DD HH:mm");
}

// 방명록 미니 아바타 (8x8 픽셀)
const AVATAR = [
  "..HHHH..",
  ".HHHHHH.",
  "HHSSSSHH",
  "HSOSSOSH",
  "HSSSSSSH",
  ".SPSSPS.",
  "..SOOS..",
  "...SS...",
];
const HAIR = ["#1c1a1a", "#8b5a3c", "#e0a040", "#c0504d", "#6b4f9e"];
const avatarPixels = AVATAR.flatMap((row, y) =>
  [...row].map((c, x) => ({ x, y, c })).filter((p) => p.c !== ".")
);
function avatarColor(c: string, hair: number) {
  return {
    H: HAIR[hair % HAIR.length],
    S: "#ffdcc2",
    O: "#2a2320",
    P: "#ffadad",
  }[c];
}

/* ───────── 사진첩 (한 장씩 넘겨 보는 미니홈피 방식) ───────── */
// wedding.retro.album 이 비어 있으면 gallery 사진으로 자동 채움
const album = wedding.retro.album.length
  ? wedding.retro.album
  : wedding.gallery.map((photo, i) => ({
      folder: "웨딩촬영",
      title: `우리의 순간 #${i + 1}`,
      date: "",
      text: "",
      photo,
    }));

const folders = computed(() => {
  const names = [...new Set(album.map((a) => a.folder))];
  return [
    { name: "전체", count: album.length },
    ...names.map((name) => ({
      name,
      count: album.filter((a) => a.folder === name).length,
    })),
  ];
});
const folder = ref("전체");
const page = ref(0);
const zoomOpen = ref(false);

const folderPhotos = computed(() =>
  folder.value === "전체"
    ? album
    : album.filter((a) => a.folder === folder.value)
);
const post = computed(() => folderPhotos.value[page.value]);

// 페이지 번호는 5개씩 묶어서 보여주기 (1~5, 6~10 ...)
const pageNumbers = computed(() => {
  const start = Math.floor(page.value / 5) * 5;
  const end = Math.min(start + 5, folderPhotos.value.length);
  return Array.from({ length: end - start }, (_, i) => start + i + 1);
});

function selectFolder(name: string) {
  folder.value = name;
  page.value = 0;
}
</script>
