"use server"
import { signOut } from "@/auth"

export const Logout = async () => {

    await signOut({ redirectTo: null });
    return { ok: true, message: "تم تسجيل الخروج بنجاح!" };
}
