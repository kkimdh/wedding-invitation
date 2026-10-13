<template>
  <div></div>
</template>

<script setup lang="ts">
/* ───────── 청첩장 내용 (여기만 수정) ───────── */
const wedding = {
  groom: { name: "구혜성", father: "아버지", mother: "어머니", order: "장남" },
  bride: { name: "김도혜", father: "아버지", mother: "어머니", order: "장녀" },

  date: "2027-00-00T12:00:00+09:00", // 예식 일시 (한국 시간)

  venue: {
    name: "○○웨딩홀",
    hall: "○층 ○○홀",
    address: "서울특별시 ○○구 ○○로 00",
    tel: "02-000-0000",
    lat: 37.5665,
    lng: 126.978,
  },

  greeting: `서로 다른 길을 걸어온 두 사람이
이제 같은 길을 함께 걸어가려 합니다.

저희의 새로운 시작을
따뜻한 마음으로 축복해 주세요.`,

  gallery: [
    // '/images/gallery/01.webp',
  ] as string[],

  accounts: {
    groom: [
      // { bank: '○○은행', number: '000-0000-0000', holder: '구혜성' },
    ],
    bride: [
      // { bank: '○○은행', number: '000-0000-0000', holder: '김도혜' },
    ],
  } as Record<
    "groom" | "bride",
    { bank: string; number: string; holder: string }[]
  >,
};

useSeoMeta({ title: "The Beginning of Us" });

/* ───────── 날짜 ───────── */
const DAYS = ["일", "월", "화", "수", "목", "금", "토"];
const d = new Date(wedding.date);
const valid = !Number.isNaN(d.getTime());

const year = valid ? d.getFullYear() : 2027;
const month = valid ? d.getMonth() : 0;
const day = valid ? d.getDate() : 0;
const pad = (n: number) => String(n).padStart(2, "0");

const dateText = valid
  ? `${year}년 ${month + 1}월 ${day}일 ${DAYS[d.getDay()]}요일 ${
      d.getHours() < 12 ? "오전" : "오후"
    } ${d.getHours() % 12 || 12}시${
      d.getMinutes() ? ` ${d.getMinutes()}분` : ""
    }`
  : "날짜를 입력해 주세요";
const dotDate = valid ? `${year}.${pad(month + 1)}.${pad(day)}` : "0000.00.00";

// 달력 칸
const firstDay = new Date(year, month, 1).getDay();
const lastDate = new Date(year, month + 1, 0).getDate();
const cells = [
  ...Array.from({ length: firstDay }, () => null),
  ...Array.from({ length: lastDate }, (_, i) => i + 1),
];

// D-day (접속 시점 기준이라 브라우저에서 계산)
const dday = ref<number | null>(null);

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
  { key: "bride" as const, label: "신부측 계좌번호" },
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

/* ───────── 접속 시 처리 ───────── */
const route = useRoute();
onMounted(() => {
  if (valid) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    dday.value = Math.round(
      (new Date(year, month, day).getTime() - today.getTime()) / 86400000
    );
  }

  // 카톡 "위치 보기" 버튼으로 들어오면 해당 섹션으로 이동
  if (route.query.section) {
    nextTick(() => {
      document
        .getElementById(String(route.query.section))
        ?.scrollIntoView({ behavior: "smooth" });
    });
  }
});
</script>
