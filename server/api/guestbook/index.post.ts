// POST /api/guestbook — 방명록 쓰기  { name, message, password }
import {
  GUESTBOOK_KEY,
  hashPassword,
  toPublic,
  useRedis,
  type StoredEntry,
} from "../../utils/guestbook";

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    name?: string;
    message?: string;
    password?: string;
  }>(event);
  const name = String(body?.name ?? "").trim();
  const message = String(body?.message ?? "").trim();
  const password = String(body?.password ?? "");

  if (!name || name.length > 20)
    throw createError({
      statusCode: 400,
      statusMessage: "이름은 1~20자로 적어주세요",
    });
  if (!message || message.length > 300)
    throw createError({
      statusCode: 400,
      statusMessage: "메시지는 1~300자로 적어주세요",
    });
  if (password.length < 4 || password.length > 20)
    throw createError({
      statusCode: 400,
      statusMessage: "비밀번호는 4~20자로 적어주세요",
    });

  const entry: StoredEntry = {
    id: Date.now(),
    name,
    message,
    createdAt: new Date().toISOString(),
    avatar: Math.floor(Math.random() * 5),
    passwordHash: hashPassword(password),
  };

  await useRedis().lpush(GUESTBOOK_KEY, entry);
  return toPublic(entry);
});
