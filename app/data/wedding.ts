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
      { bank: "국민은행", number: "22640204171720", holder: "구혜성" },
      { bank: "농협은행", number: "3522199091373", holder: "구진회" },
      { bank: "국민은행", number: "22640104238277", holder: "유소영" },
    ],
    bride: [
      { bank: "국민은행", number: "66620201924354", holder: "김도혜" },
      { bank: "농협은행", number: "0103446029708", holder: "김준호" },
      { bank: "신협은행", number: "132089165207", holder: "박종란" },
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
    image: "/og.jpg?v=3", // (가로 800 x 세로 400 권장)
  },

  gallery: Array.from(
    { length: 26 },
    (_, i) => `/images/gallery/${String(i + 1).padStart(2, "0")}.jpg`,
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
        photo: "/images/story/diary-contract.jpg",
      },
      {
        date: "2026-05-09",
        title: "촬영 예복 맞추러 다니기",
        mood: "👔",
        text: "입어보고, 벗고, 또 입어보기\n고르는 것보다 갈아입는 게 더 힘들었다",
        photo: "/images/story/diary-suit.jpg",
      },
      {
        date: "2026-05-27",
        title: "웨딩 촬영",
        mood: "📸",
        text: "하루 종일 웃었더니 볼이 아프다..\n그래도 열심히 셀렉하기",
        photo: "/images/story/diary-shoot.jpg",
      },
      {
        date: "2026-07-31",
        title: "신혼집 계약",
        mood: "🏠",
        text: "연애 초반에 농담으로 찍어둔 집이였는데\n진짜 신혼집이 됐다",
        photo: "/images/story/diary-boxes.jpg",
      },
      {
        date: "2026-10-01",
        title: "청첩장, 모청 만들기",
        mood: "💻",
        text: "셀프병 걸린 신부의\n셀프 청첩장과 셀프 모청 만들기",
        photo: "/images/story/diary-invitation.jpg",
      },
      {
        date: "2027-02-13",
        title: "D-day",
        mood: "👰🏻‍♀️🤵🏻",
        text: "기다리던 디데이\n오셔서 축하해 주세요 ε♥з",
        photo: "/images/story/diary-dday.jpg",
      },
    ] as Story[],
    // 미니홈피 사진첩 — 비워두면([]) gallery 사진이 '웨딩촬영' 폴더로 자동으로 들어감
    album: [
      // 웨딩촬영
      {
        folder: "웨딩촬영",
        date: "2026-05-27",
        title: "촬영 초반에",
        text: "아직은 어색 ^_^;",
        photo: "/images/album/album-02.jpg",
      },
      // {
      //   folder: "웨딩촬영",
      //   date: "2026-05-27",
      //   title: "꽃이랑 뽀뽀",
      //   text: "신랑보다 꽃이 먼저",
      //   photo: "/images/album/album-01.jpg",
      // },
      {
        folder: "웨딩촬영",
        date: "2026-05-27",
        title: "화장실 문 앞에서",
        text: "입으로 숨 쉬지 말자 s2",
        photo: "/images/album/album-03.jpg",
      },
      {
        folder: "웨딩촬영",
        date: "2026-05-27",
        title: "빙글빙글",
        text: "",
        photo: "/images/album/album-04.jpg",
      },
      // {
      //   folder: "웨딩촬영",
      //   date: "",
      //   title: "누구 봐?",
      //   text: "",
      //   photo: "/images/album/album-05.jpg",
      // },
      {
        folder: "웨딩촬영",
        date: "",
        title: "(*^^)(^^*)",
        text: "디카 포함해서 사진 백만장은 찍은 하루",
        photo: "/images/album/album-06.jpg",
      },
      {
        folder: "웨딩촬영",
        date: "2026-05-27",
        title: "와다다다",
        text: "비 쫄딱 맞으면서 한 야외촬영 ㅇㅁㅇ",
        photo: "/images/album/album-07.jpg",
      },

      // 데이트
      {
        folder: "데이트",
        date: "2024-03-23",
        title: "처음 같이 찍은 사진",
        text: "어색 어색 열매 ^_^;;",
        photo: "/images/album/album-17.jpg",
      },

      // {
      //   folder: "데이트",
      //   date: "",
      //   title: "집 가자",
      //   text: "",
      //   photo: "/images/album/album-09.jpg",
      // },
      // {
      //   folder: "데이트",
      //   date: "",
      //   title: "딸기 따기",
      //   text: "",
      //   photo: "/images/album/album-10.jpg",
      // },
      {
        folder: "데이트",
        date: "2025-05-24",
        title: "혜성이 생일 기념 글램핑",
        text: "전날 발베니 한 병 다 먹고 얼굴 퉁퉁",
        photo: "/images/album/album-13.jpg",
      },
      {
        folder: "데이트",
        date: "2025-07-15",
        title: "이재모 피자",
        text: "처음으로 웨이팅해서 먹었던 곳\n혜성이가 좋아함",
        photo: "/images/album/album-12.jpg",
      },
      {
        folder: "데이트",
        date: "2026-01-06",
        title: "도혜 생일",
        text: "초밥맛집이래서 먹으러 갔는데 \n우리밖에 없어서 머쓱",
        photo: "/images/album/album-11.jpg",
      },
      {
        folder: "데이트",
        date: "2026-07-27",
        title: "털레털레",
        text: "부산 여행가서 맛집가려고 멋드려지게 \n꾸미고 나왔는데 문 닫아서 바로 숙소행",
        photo: "/images/album/album-08.jpg",
      },
      // {
      //   folder: "데이트",
      //   date: "",
      //   title: "벚꽃 엔딩",
      //   text: "",
      //   photo: "/images/album/album-14.jpg",
      // },
      // {
      //   folder: "데이트",
      //   date: "",
      //   title: "제주 여행",
      //   text: "",
      //   photo: "/images/album/album-15.jpg",
      // },
      // {
      //   folder: "데이트",
      //   date: "",
      //   title: "째릿",
      //   text: "",
      //   photo: "/images/album/album-16.jpg",
      // },
    ] as {
      folder: string;
      date: string;
      title: string;
      text: string;
      photo: string;
    }[],
  },
};
