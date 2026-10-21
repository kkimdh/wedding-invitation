// GET /api/guestbook — 방명록 목록 (최신순)
import {
  GUESTBOOK_KEY,
  toPublic,
  useRedis,
  type StoredEntry,
} from "../../utils/guestbook";

export default defineEventHandler(async () => {
  const redis = useRedis();
  const list = await redis.lrange<StoredEntry>(GUESTBOOK_KEY, 0, 499);
  return list.map(toPublic);
});
