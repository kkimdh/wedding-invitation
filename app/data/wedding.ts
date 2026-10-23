export type Account = { bank: string; number: string; holder: string };
export type Story = {
  date: string;
  title: string;
  text: string;
  mood?: string;
  photo?: string;
};

export const wedding = {
  groom: { name: "구혜성", father: "구진회", mother: "유소영", order: "장남" },
  bride: { name: "김도혜", father: "김준호", mother: "박종란", order: "장녀" },

  date: "2027-02-13T11:50:00+09:00", // 예식 일시 (한국 시간)
  metDate: "2024-03-10", // 처음 만난 날

  venue: {
    name: "AW컨벤션 안산",
    hall: "3층 그랜드볼룸홀",
    address: "경기 안산시 단원구 광덕1로 171",
    tel: "031-501-5900",
    lat: 37.3082126,
    lng: 126.828793,
  },

  // 약도 이미지
  mapGuide: "/images/map-guide.webp",

  // 오시는 길 교통편
  transport: [
    {
      title: "지하철",
      items: [
        { dot: "#00a4e3", text: "4호선 고잔역 2번 출구" },
        { dot: "#F5A200", text: "수인분당선 고잔역 2번 출구" },
      ],
      notes: ["셔틀버스 5~7분 간격 운행 / 도보 15분"],
    },
    {
      title: "버스",
      items: [
        {
          dot: "#95c53c",
          text: "일반버스 : 3, 10, 50, 80B, 98, 99-1, 88, 77",
        },
        { dot: "#e60012", text: "직행좌석 : 1100, 3103, 5609" },
      ],
      notes: [
        "동남레이크빌 정류장 하차",
        "대림호수공원아파트 정류장 하차",
        "안산문화숲의광장 정류장 하차",
      ],
    },
    {
      title: "자가용 · 주차",
      items: [
        { text: "양지주차타워 (AW컨벤션 주차타워)" },
        { text: "AW컨벤션 정문 맞은편 공영주차장" },
        { text: "MK주차타워" },
      ],
    },
  ] as {
    title: string;
    items?: { dot?: string; text: string }[];
    notes?: string[];
  }[],

  greeting: `서로 다른 길을 걸어온 두 사람이
이제 같은 길을 함께 걸어가려 합니다.

저희의 새로운 시작을
따뜻한 마음으로 축복해 주세요.`,

  hero: { bubble: "Forever" },
  mainPhoto: "/images/main.jpg",
  minihomepageMainPhoto: "/images/minihomepageMain.jpg",

  accounts: {
    groom: [
      { bank: "○○은행", number: "000-0000-0000", holder: "구혜성" },
      { bank: "○○은행", number: "000-0000-0000", holder: "구진회" },
      { bank: "○○은행", number: "000-0000-0000", holder: "유소영" },
    ],
    bride: [
      { bank: "○○은행", number: "000-0000-0000", holder: "김도혜" },
      { bank: "○○은행", number: "000-0000-0000", holder: "김준호" },
      { bank: "○○은행", number: "000-0000-0000", holder: "박종란" },
    ],
  } as Record<
    "groom" | "bride",
    { bank: string; number: string; holder: string }[]
  >,

  // 브라우저 탭, 링크 미리보기, 카카오톡 공유 카드
  share: {
    tabTitle: "The Beginning of Us",
    title: "The Beginning of Us",
    description: "2027년 2월 13일 토요일 AM 11시 50분",
    image: "/og.jpg?v=2", // (가로 800 x 세로 400 권장)
  },

  gallery: Array.from(
    { length: 21 },
    (_, i) => `/images/gallery/${String(i + 1).padStart(2, "0")}.png`
  ),

  // 미니홈피 버전에서만 쓰는 내용
  retro: {
    homeTitle: "도혜 ♥ 혜성의 미니홈피",
    mood: "💍 결혼해요",
    intro: "소중한 분들을\n초대합니다 ♡",
    bgmTitle: "The Beginning of Us - 혜성 & 도혜",
    miniroom: "B" as "A" | "B", // MiniRoom 그림 버전
    // 미니홈피 다이어리 (우리 이야기) — 날짜 순서대로
    stories: [
      {
        date: "2025-12-24",
        title: "식장 계약",
        mood: "🏛️",
        text: "계속 날짜 고민하다가 \n크리스마스 이브날 결정",
        photo: "/images/story/test.jpg",
      },
      {
        date: "2026-05-09",
        title: "촬영 예복 맞추러 다니기",
        mood: "👔",
        text: "입어보고, 벗고, 또 입어보기\n고르는 것보다 갈아입는 게 더 힘들었다",
        photo: "/images/story/test.jpg",
      },
      {
        date: "2026-05-27",
        title: "웨딩 촬영",
        mood: "📸",
        text: "하루 종일 웃었더니 볼이 아프다..\n그래도 열심히 셀렉하기",
        photo: "/images/story/test.jpg",
      },
      {
        date: "2026-07-31",
        title: "신혼집 계약",
        mood: "🏠",
        text: "연애 초반에 농담으로 찍어둔 집이였는데\n진짜 신혼집이 됐다",
        photo: "/images/story/test.jpg",
      },
      {
        date: "2026-10-01",
        title: "청첩장, 모청 만들기",
        mood: "💻",
        text: "셀프병 걸린 신부의\n셀프 청첩장과 셀프 모청 만들기",
        photo: "/images/story/test.jpg",
      },
      {
        date: "2027-02-13",
        title: "D-day",
        mood: "👰🏻‍♀️🤵🏻",
        text: "기다리던 D-day\n오셔서 축하해 주세요 ε♥з",
        photo: "/images/story/test.jpg",
      },
    ] as Story[],
    // 미니홈피 사진첩 — 비워두면([]) gallery 사진이 '웨딩촬영' 폴더로 자동으로 들어감
    album: [
      {
        folder: "웨딩촬영",
        date: "2026.08.20",
        title: "스튜디오에서 첫 컷",
        text: "긴장해서 표정이 굳었던 첫 장 ㅎㅎ",
        photo: "/images/gallery/test.jpg",
      },
      {
        folder: "웨딩촬영",
        date: "2026.08.20",
        title: "손 꼭 잡고",
        text: "",
        photo: "/images/gallery/test.jpg",
      },
      {
        folder: "웨딩촬영",
        date: "2026.08.20",
        title: "부케 들고 한 컷",
        text: "초록 부케가 제일 마음에 들었어요",
        photo: "/images/gallery/test.jpg",
      },
      {
        folder: "데이트",
        date: "2024.06.17",
        title: "100일",
        text: "케이크 앞에서 찰칵",
        photo: "/images/gallery/test.jpg",
      },
      {
        folder: "데이트",
        date: "2025.03.10",
        title: "1주년 여행",
        text: "",
        photo: "/images/gallery/test.jpg",
      },
      {
        folder: "데이트",
        date: "2026.05.01",
        title: "프러포즈 날",
        text: "울지 않으려고 했는데...",
        photo: "/images/gallery/test.jpg",
      },
    ] as {
      folder: string;
      date: string;
      title: string;
      text: string;
      photo: string;
    }[],
  },
};
