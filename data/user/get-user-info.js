import prisma from "@/lib/prisma";
import { auth } from "@/auth";


export const getUserImage = async () => {
    const session = await auth();
    const userId = parseInt(session?.user?.id);
    if (!userId) {
        return { ok: false, error: 'بحاجة الى تسجيل دخول!' };
    }
    const userimage = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            image: true
        }
    });
    return { ok: true, data: userimage };
};