import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export const changePrivacySettings = async (privacy) => {
    const session = await auth();
    const id = parseInt(session?.user?.id);
    try {
        const changeprivacy = await prisma.user.update({
            where: { id },
            data: { ...privacy }
        });
        return { ok: true, data: changeprivacy };
    }
    catch (e) {
        return { ok: false, error: e };
    }
};
export const fetchPrivacySettings = async () => {
    const session = await auth();
    const id = parseInt(session?.user?.id);
    try {
        const privacysettings = await prisma.user.findUnique({
            where: { id },
            select: {
                hidePhone: true,
                hideEmail: true,
                hideFirstAndLast: true
            }
        });
        return { ok: true, data: privacysettings };
    }
    catch (e) {
        return { ok: false, error: e };
    }
};
export const updateUserImage = async (secure_url, public_id) => {
    const session = await auth();
    const id = parseInt(session?.user?.id);
    try {
        const updateimage = await prisma.user.update({
            where: { id },
            data: {
                image: secure_url,
                image_public_id: public_id
            }
        });
        return { res: true, data: updateimage };
    }
    catch (e) {
        return { res: false, error: e };
    }
};