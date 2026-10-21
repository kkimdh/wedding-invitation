// DELETE /api/guestbook/:id — 방명록 지우기  { password }
// 쓴 사람의 비밀번호 또는 관리자 비밀번호(GUESTBOOK_ADMIN_PASSWORD)로 지울 수 있음
import {
  GUESTBOOK_KEY,
  hashPassword,
  useRedis,
  type StoredEntry,
} from "../../utils/guestbook";

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));
  const { password = "" } =
    (await readBody<{ password?: string }>(event)) ?? {};

  const redis = useRedis();
  const list = await redis.lrange<StoredEntry>(GUESTBOOK_KEY, 0, -1);
  const target = list.find((e) => e.id === id);
  if (!target)
    throw createError({
      statusCode: 404,
      statusMessage: "이미 지워진 글이에요",
    });

  const admin = useRuntimeConfig(event).guestbookAdminPassword;
  const ok =
    (admin && password === admin) ||
    hashPassword(String(password)) === target.passwordHash;
  if (!ok)
    throw createError({
      statusCode: 403,
      statusMessage: "비밀번호가 맞지 않아요",
    });

  await redis.lrem(GUESTBOOK_KEY, 1, target);
  return { ok: true };
});
