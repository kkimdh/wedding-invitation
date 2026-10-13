<template>
  <svg
    :viewBox="`0 0 ${ROOM_W} ${ROOM_H}`"
    class="pixelated block w-full"
    shape-rendering="crispEdges"
    aria-label="신랑 신부 픽셀 캐릭터"
  >
    <!-- 벽 -->
    <rect :width="ROOM_W" :height="ROOM_H" fill="#fff4f6" />
    <rect
      v-for="x in ROOM_W / 4"
      :key="`w${x}`"
      :x="(x - 1) * 4"
      y="0"
      width="2"
      :height="ROOM_H"
      fill="#ffe8ee"
    />
    <!-- 바닥 -->
    <rect y="29" :width="ROOM_W" height="3" fill="#e0ac72" />
    <rect
      v-for="x in Math.ceil(ROOM_W / 6)"
      :key="`f${x}`"
      :x="(x - 1) * 6"
      y="29"
      width="1"
      height="3"
      fill="#c99158"
    />
    <!-- 캐릭터 -->
    <rect
      v-for="p in pixels"
      :key="`${p.x},${p.y}`"
      :x="p.x"
      :y="p.y"
      width="1"
      height="1"
      :fill="PALETTE[p.c]"
    />
  </svg>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ scene?: "A" | "B" }>(), {
  scene: "B", // A: 올림머리·손잡기 / B: 긴머리·베일·부케
});

const PALETTE: Record<string, string> = {
  O: "#2a2320", // 외곽선
  H: "#1c1a1a", // 머리
  h: "#3b3636", // 머리 하이라이트
  S: "#ffdcc2", // 피부
  P: "#ffadad", // 볼터치
  W: "#ffffff", // 흰색
  w: "#ebe7df", // 드레스 그림자
  K: "#4a4d50", // 차콜 수트
  k: "#36393b", // 바지
  T: "#141414", // 넥타이
  L: "#161616", // 구두
  V: "#e6ebf3", // 베일, 시스루
  G: "#7db35a", // 잎
  g: "#4f8a3a", // 진한 잎
  Y: "#f2c94c", // 데이지 꽃술
  C: "#f3ead6", // 레이스 리본
  R: "#e84a5f", // 하트
  E: "#f6f1e6", // 진주 귀걸이
};

const GROOM_A = [
  ".....OOOOOO.....",
  "...OOHHHHHHOO...",
  "..OHHHHHHHHHHO..",
  ".OHHhhHHHHHHHHO.",
  ".OHHHHHHHHHHHHO.",
  ".OHHHHHHHHHHHHO.",
  ".OHSSSHSSSSHSSO.",
  ".OSSSSSSSSSSSSO.",
  "OSSSOOSSSSOOSSSO",
  "OSSOSSOSSOSSOSSO",
  "OSPPSSSSSSSSPPSO",
  "OSSSSOWWWWOSSSSO",
  ".OSSSSOOOOSSSSO.",
  "..OOSSSSSSSSOO..",
  "....OOSSSSOO....",
  "..OKKKWTTWKKKO..",
  ".OKKKKWTTWKKKKO.",
  ".OKKKKKTTKKKKKO.",
  "OKKKKKKTTKKKKKKO",
  "OKOKKKKTTKKKKOKO",
  "OKOKKKKKKKKKKOKO",
  "OSOKKKKOKKKKKOSO",
  "...OKKKKKKKKO...",
  "...OkkkkOkkkkO..",
  "...OkkkkOkkkkO..",
  "...OkkkkOkkkkO..",
  "..OLLLLOOLLLLO..",
  "..OOOOO..OOOOO..",
];

const GROOM_B = [
  ".....OOOOOO.....",
  "...OOHHHHHHOO...",
  "..OHHHHHHHHHHO..",
  ".OHHhhHHHHHHHHO.",
  ".OHHHHHHHHHHHHO.",
  ".OHHHHHHHHHHHHO.",
  ".OHHHHHHHHHHHHO.",
  ".OSSSSSSSSSSSSO.",
  "OSSSOOSSSSOOSSSO",
  "OSSOSSOSSOSSOSSO",
  "OSPPSSSSSSSSPPSO",
  "OSSSSOWWWWOSSSSO",
  ".OSSSSOOOOSSSSO.",
  "..OOSSSSSSSSOO..",
  "....OOSSSSOO....",
  "..OKKKWTTWKKKO..",
  ".OKKKKWTTWKKKKO.",
  ".OKKKKKTTKKKKKO.",
  "OKKKKKKTTKKKKKKO",
  "OKOKKKKTTKKKKOKO",
  "OKOKKKKKKKKKKOKO",
  "OKOKKKKOKKKKKOKO",
  "..OOKKKKKKKKOO..",
  "...OkkkkOkkkkO..",
  "...OkkkkOkkkkO..",
  "...OkkkkOkkkkO..",
  "..OLLLLOOLLLLO..",
  "..OOOOO..OOOOO..",
];

const BRIDE_A = [
  "......OOOO......",
  ".....OHHHHO.....",
  "....OOHhHHOO....",
  "..OOHHHHHHHHOO..",
  ".OHHHhHHHHHHHHO.",
  ".OHHHHHHHHHHHHO.",
  ".OHHSSSSSSSSHHO.",
  "OHHSSSSSSSSSSHHO",
  "OHSSWOSSSSWOSSHO",
  "OHSSOOSSSSOOSSHO",
  "OHPPSSSSSSSSPPHO",
  "OHSSSSOWWOSSSSHO",
  "EHOSSSSOOSSSSOHE",
  ".H.OOSSSSSSOO.H.",
  "......OSSO......",
  "....OOWWWWOO....",
  "...OWWWWWWWWO...",
  "..OWWOWWWWOWWO..",
  "..OWWOWWWWOWWO..",
  "..OSSOwwwwOSSO..",
  "..OSSOWWWWOSSO..",
  "..OSOWWWWWWOSO..",
  "...OWWWWWWWWO...",
  "..OWWWWWWWWWWO..",
  "..OWwWWWWWWwWO..",
  ".OWWwWWWWWWwWWO.",
  ".OOOOOOOOOOOOOO.",
  "....OWO..OWO....",
];

const BRIDE_B = [
  ".....OOOOOO.....",
  "...OOHHHHHHOO...",
  "..OHHHHHHHHHHO..",
  ".OHHhhHHHHHHHHO.",
  ".OHHHHHHHHHHHHO.",
  "OHHHHHHHHSHHHHHO",
  "OHHHSSSSSSSHHHHO",
  "OHHSSSSSSSSSSHHO",
  "OHSSWOSSSSWOSSHO",
  "OHSSOOSSSSOOSSHO",
  "OHPPSSSSSSSSPPHO",
  "OHSSSSOWWOSSSSHO",
  "OHHSSSSOOSSSSHHE",
  "OHHHOOSSSSOOHHHO",
  "OHHHHHOSSOHHHHHO",
  "OHHHHWWWWWWHHHHO",
  ".OHHWWWWWWWWHHO.",
  "..OHVWWWWWWVHO..",
  "..OVVWWWWWWVVO..",
  "..OVVwwwwwwVVO..",
  "..OVVWWWWWWVVO..",
  "..OSOWWWWWWOSO..",
  "...OWWWWWWWWO...",
  "..OWWWWWWWWWWO..",
  "..OWwWWWWWWwWO..",
  ".OWWwWWWWWWwWWO.",
  ".OOOOOOOOOOOOOO.",
  "....OWO..OWO....",
];

const BOUQUET = [
  "...WYW...",
  "..WGWYWG.",
  ".GGWYWGGG",
  "GGgGGGgGG",
  ".gGGCGGgG",
  "..GgCGgG.",
  "..gGCGGg.",
  "...GCgG..",
  "...gCGg..",
  "....GgG..",
  "....gG...",
  ".....G...",
  ".....g...",
];

const HEART = [".R.R.", "RRRRR", ".RRR.", "..R.."];

type Px = { x: number; y: number; c: string };

function sprite(rows: string[], ox: number, oy: number): Px[] {
  return rows.flatMap((row, y) =>
    [...row]
      .map((c, x) => ({ x: x + ox, y: y + oy, c }))
      .filter((p) => p.c !== ".")
  );
}

// 신부 뒤로 늘어지는 베일 (아래로 갈수록 넓어짐)
function veil(ox: number, oy: number, height: number): Px[] {
  const pts: Px[] = [];
  for (let y = 3; y < height + 2; y++) {
    const right = 15 + Math.floor((y - 3) / 4);
    for (let x = 9; x <= right; x++) pts.push({ x: x + ox, y: y + oy, c: "V" });
  }
  return pts;
}

const ROOM_W = 40;
const ROOM_H = 32;

const pixels = computed(() => {
  const layers: Px[][] =
    props.scene === "A"
      ? [sprite(HEART, 17, 0), sprite(GROOM_A, 3, 3), sprite(BRIDE_A, 20, 3)]
      : [
          sprite(HEART, 17, 0),
          veil(20, 3, BRIDE_B.length),
          sprite(GROOM_B, 3, 3),
          sprite(BRIDE_B, 20, 3),
          sprite(BOUQUET, 27, 18),
        ];

  // 나중에 그린 레이어가 위로 오도록 겹치기
  const grid = new Map<string, Px>();
  for (const p of layers.flat()) {
    if (p.x >= 0 && p.x < ROOM_W && p.y >= 0 && p.y < ROOM_H)
      grid.set(`${p.x},${p.y}`, p);
  }
  return [...grid.values()];
});
</script>
