export default defineNuxtPlugin(() => {
  // 개발 중에는 우클릭 → 검사를 써야 하니 배포 환경에서만 막기
  if (import.meta.dev) return;

  document.addEventListener("contextmenu", (e) => e.preventDefault());
});
