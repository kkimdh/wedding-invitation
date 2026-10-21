<!-- 카카오톡 공유 버튼: <KakaoShareButton class="...">문구</KakaoShareButton> -->
<script setup lang="ts">
import { wedding } from "~/data/wedding";

const config = useRuntimeConfig();

function share() {
  const Kakao = (window as any).Kakao;
  if (!Kakao) {
    alert("잠시 후 다시 시도해 주세요.");
    return;
  }
  if (!Kakao.isInitialized()) Kakao.init(config.public.kakaoJsKey);

  const siteUrl = config.public.siteUrl as string;
  const locationUrl = `${siteUrl}/?section=location`;

  // 카톡방에 도착하는 카드 모양: 사진 + 제목 + 설명 + 버튼 2개
  Kakao.Share.sendDefault({
    objectType: "feed",
    content: {
      title: wedding.share.title,
      description: wedding.share.description,
      imageUrl: `${siteUrl}${wedding.share.image}`,
      imageWidth: 800,
      imageHeight: 400,
      link: { mobileWebUrl: siteUrl, webUrl: siteUrl },
    },
    buttons: [
      {
        title: "청첩장 보기",
        link: { mobileWebUrl: siteUrl, webUrl: siteUrl },
      },
      {
        title: "위치 보기",
        link: { mobileWebUrl: locationUrl, webUrl: locationUrl },
      },
      //   {
      //     title: "미니홈피 놀러가기",
      //     link: {
      //       mobileWebUrl: `${siteUrl}/minihomepage`,
      //       webUrl: `${siteUrl}/minihomepage`,
      //     },
      //   },
    ],
  });
}
</script>

<template>
  <button type="button" @click="share">
    <slot>카카오톡으로 공유하기</slot>
  </button>
</template>
