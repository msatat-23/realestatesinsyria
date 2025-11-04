import prisma from "@/lib/prisma";

export const updateuser = async (id, data) => {
    try {
        const update = await prisma.user.update({
            where: { id: parseInt(id) },
            data: data
        });
        return { ok: true, data: JSON.stringify(update) };
    } catch (e) {
        return { ok: false, error: e };
    }
};
export async function getUserByEmail(email) {
    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });
        return user;
    } catch {
        return null;
    }
};
export async function getUserById(id) {
    try {
        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                image: true,
                firstName: true,
                lastName: true,
                username: true,
                email: true,
                profileImage: true,
                role: true,
                emailVerified: true,
                phone: true,
                subscription: true,
                until: true,
                hidePhone: true,
                hideEmail: true,
                hideFirstAndLast: true,
                createdAt: true,
                updatedAt: true,
                isTwoFactorEnabled: true,
            }
        });
        return user;
    } catch {
        return null;
    }
};
