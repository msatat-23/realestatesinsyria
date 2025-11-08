// app/actions/serverLogout.js
"use server";

import { cookies } from "next/headers";

export async function serverClearSessionCookies() {
    // طباعة أسماء الكوكيز لفحصها في الـ server logs
    // console.log("cookies before:", cookies().getAll());

    // تأكد من أسماء الكوكيز في مشروعك؛ هذه أمثلة شائعة لـ Auth.js
    cookies().delete("authjs.session-token");
    cookies().delete("__Secure-authjs.session-token");
    cookies().delete("next-auth.csrf-token"); // إن وُجدت أو اسم آخر حسب config

    return { ok: true };
}
