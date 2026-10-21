<!-- 카카오맵 지도: <KakaoMap :lat="..." :lng="..." class="aspect-[4/3]" /> -->
<script setup lang="ts">
const props = withDefaults(
  defineProps<{ lat: number; lng: number; level?: number }>(),
  {
    level: 4, // 숫자가 작을수록 확대
  }
);

const config = useRuntimeConfig();
const el = ref<HTMLElement | null>(null);

function loadSdk(key: string) {
  return new Promise<void>((resolve, reject) => {
    const w = window as any;
    if (w.kakao?.maps) return w.kakao.maps.load(() => resolve());

    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&autoload=false`;
    script.onload = () => w.kakao.maps.load(() => resolve());
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

onMounted(async () => {
  if (!el.value) return;
  try {
    await loadSdk(config.public.kakaoJsKey as string);
    const { kakao } = window as any;
    const position = new kakao.maps.LatLng(props.lat, props.lng);
    const map = new kakao.maps.Map(el.value, {
      center: position,
      level: props.level,
    });
    new kakao.maps.Marker({ position, map });

    // 지도 때문에 페이지 스크롤이 막히지 않게 고정
    map.setDraggable(false);
    map.setZoomable(false);
  } catch {
    // 키/도메인 설정이 안 맞으면 빈 박스로 남음 (개발자 도구 Console 확인)
  }
});
</script>

<template>
  <div ref="el" />
</template>
