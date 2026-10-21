// 두 버전이 같이 쓰는 계산과 기능 모음
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/ko";
import { wedding } from "~/data/wedding";

dayjs.extend(utc);
dayjs.locale("ko");

const KST = 9 * 60;

/** 날짜, 달력, D-day, 지도 링크, 계좌 복사, ?section= 스크롤 */
export function useWedding() {
  /* 날짜 (항상 한국 시간 기준) */
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

  /* 달력 */
  const day = valid ? wd.date() : 0;
  const monthStart = valid ? wd.startOf("month") : dayjs("2027-01-01");
  const cells: (number | null)[] = [
    ...Array.from({ length: monthStart.day() }, () => null),
    ...Array.from({ length: monthStart.daysInMonth() }, (_, i) => i + 1),
  ];

  /* 접속 시점 기준 값 (브라우저에서 계산) */
  const dday = ref<number | null>(null);
  const total = ref<number | null>(null); // 만난 지 며칠째

  /* 길찾기 링크 */
  const venueName = encodeURIComponent(wedding.venue.name);
  const mapLinks = [
    {
      icon: "/images/icon/naver-map.png",
      label: "네이버지도",
      href: `https://map.naver.com/p/search/${venueName}`,
    },
    {
      icon: "/images/icon/kakao-map.svg",
      label: "카카오맵",
      href: `https://map.kakao.com/link/to/${venueName},${wedding.venue.lat},${wedding.venue.lng}`,
    },
    {
      icon: "/images/icon/t-map.svg",
      label: "티맵",
      href: `tmap://route?goalname=${venueName}&goaly=${wedding.venue.lat}&goalx=${wedding.venue.lng}`,
    },
  ];

  /* 계좌 복사 */
  const toast = useToast();
  async function copy(text: string, message = "계좌번호가 복사되었습니다") {
    try {
      await navigator.clipboard.writeText(text);
      toast.add({ title: message, duration: 1500 });
    } catch {
      toast.add({
        title: "복사에 실패했습니다",
        color: "error",
        duration: 1500,
      });
    }
  }

  const route = useRoute();
  onMounted(() => {
    const now = dayjs().startOf("day");
    if (valid) dday.value = wd.startOf("day").diff(now, "day");
    total.value = now.diff(dayjs(wedding.metDate), "day") + 1; // 만난 날 = 1일

    // 카톡 "위치 보기" 버튼 등으로 ?section=location 이 붙어 들어오면 해당 섹션으로 이동
    if (route.query.section) {
      nextTick(() => {
        document
          .getElementById(String(route.query.section))
          ?.scrollIntoView({ behavior: "smooth" });
      });
    }

    // 이동한 뒤 주소에서 #account, ?section=... 지우기 (새로고침해도 다시 내려가지 않게)
    if (route.hash || route.query.section) {
      history.replaceState(
        { ...history.state, current: route.path },
        "",
        route.path
      );
    }
  });

  return {
    wedding,
    valid,
    dateText,
    dotDate,
    day,
    cells,
    dday,
    total,
    mapLinks,
    copy,
  };
}

/** 사진첩: 더보기 + 크게 보기 */
export function useGallery(preview = 9) {
  const showAll = ref(false);
  const visiblePhotos = computed(() =>
    showAll.value ? wedding.gallery : wedding.gallery.slice(0, preview)
  );
  const viewerOpen = ref(false);
  const viewerIndex = ref(0);
  function openViewer(i: number) {
    viewerIndex.value = i;
    viewerOpen.value = true;
  }
  return {
    preview,
    showAll,
    visiblePhotos,
    viewerOpen,
    viewerIndex,
    openViewer,
  };
}

/** 브라우저 탭 제목 + 링크 미리보기(OG) */
export function useWeddingSeo() {
  const siteUrl = useRuntimeConfig().public.siteUrl as string;
  useSeoMeta({
    title: wedding.share.tabTitle,
    ogTitle: wedding.share.title,
    ogDescription: wedding.share.description.replace("\n", " · "),
    ogImage: `${siteUrl}${wedding.share.image}`,
    ogUrl: siteUrl,
    ogType: "website",
    robots: "noindex, nofollow",
  });
}
