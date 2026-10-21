// 방명록 저장소 (Upstash Redis) 공통 코드
import { createHash } from "node:crypto";
import { Redis } from "@upstash/redis";

// 저장되는 글 한 개 (passwordHash 는 화면에 절대 내보내지 않음)
export type StoredEntry = {
  id: number;
  name: string;
  message: string;
  createdAt: string;
  avatar: number;
  passwordHash: string;
};

export const GUESTBOOK_KEY = "guestbook";

let client: Redis | null = null;
export function useRedis() {
  // Vercel에서 Upstash를 연결하면 생기는 환경변수(KV_REST_API_URL / UPSTASH_REDIS_REST_URL 등)를 자동으로 읽음
  client ??= Redis.fromEnv();
  return client;
}

export function hashPassword(password: string) {
  return createHash("sha256")
    .update(`wedding-guestbook:${password}`)
    .digest("hex");
}

// 비밀번호 빼고 화면에 보낼 모양으로
export function toPublic({ passwordHash: _, ...entry }: StoredEntry) {
  return entry;
}
