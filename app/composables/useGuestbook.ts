// 방명록 (서버 /api/guestbook 과 연결)
export type GuestbookEntry = {
  id: number;
  name: string;
  message: string;
  createdAt: string; // ISO 날짜
  avatar: number; // 미니 아바타 머리색 번호 (0~4)
};

// 서버 에러 메시지 꺼내기
function errorMessage(e: unknown, fallback: string) {
  const err = e as {
    data?: { statusMessage?: string; message?: string };
    statusMessage?: string;
  };
  return err?.data?.statusMessage || err?.statusMessage || fallback;
}

export function useGuestbook() {
  const entries = useState<GuestbookEntry[]>("guestbook", () => []);
  const loading = ref(false);
  const sending = ref(false);

  async function load() {
    loading.value = true;
    try {
      entries.value = await $fetch<GuestbookEntry[]>("/api/guestbook");
    } finally {
      loading.value = false;
    }
  }

  // 성공하면 null, 실패하면 에러 문구를 돌려줌
  async function add(name: string, message: string, password: string) {
    sending.value = true;
    try {
      const saved = await $fetch<GuestbookEntry>("/api/guestbook", {
        method: "POST",
        body: { name, message, password },
      });
      entries.value = [saved, ...entries.value];
      return null;
    } catch (e) {
      return errorMessage(e, "등록에 실패했어요. 잠시 후 다시 시도해 주세요");
    } finally {
      sending.value = false;
    }
  }

  async function remove(id: number, password: string) {
    try {
      await $fetch(`/api/guestbook/${id}`, {
        method: "DELETE",
        body: { password },
      });
      entries.value = entries.value.filter((e) => e.id !== id);
      return null;
    } catch (e) {
      return errorMessage(e, "삭제에 실패했어요");
    }
  }

  return { entries, loading, sending, load, add, remove };
}
