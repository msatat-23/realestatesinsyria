import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export const sendBasicData = async (data) => {
    const session = await auth();
    const userId = parseInt(session?.user?.id);
    if (!userId) return "بحاجة الى تسجيل دخول!";
    try {
        const res = await prisma.property.create({
            data: { ...data, userId }
        });
        return { ok: true, data: JSON.stringify(res) };
    }
    catch (e) {
        console.log(e);
        return { ok: false, error: e };
    }
};
export const updateBasicData = async (id, data) => {
    const session = await auth();
    const userId = parseInt(session?.user?.id);
    if (!userId) return "بحاجة الى تسجيل دخول!";
    try {
        const property = await prisma.property.findUnique({ where: { id: parseInt(id) } });
        if (!property) {
            return { ok: false, error: "العقار غير موجود!!" };
        }
        const res = await prisma.property.update({
            where: { id: parseInt(id) },
            data: { ...data, userId }
        });
        return { ok: true, data: JSON.stringify(res) };
    }
    catch (e) {
        console.log(e);
        return { ok: false, error: e };
    }
};
export const sendImages = async (images, propertyId) => {
    const results = await Promise.all(
        images.map(async (image) => {
            try {
                const res = await prisma.image.create({
                    data: {
                        propertyId: parseInt(propertyId),
                        public_id: image.public_id,
                        secure_url: image.url
                    }
                });
                return { ok: true, data: res };
            }
            catch (e) {
                console.log("فشل إضافة إحدى الصور إلى قاعدة البيانات!", e);
                return { ok: false, error: e };
            }
        })
    );
    return results;
};
export const sendVideo = async (video_url, video_public_id, propertyId) => {
    try {
        const res = await prisma.property.update({
            data: {
                video: video_url,
                video_public_id: video_public_id
            },
            where: { id: parseInt(propertyId) }
        });
        return { ok: true, data: JSON.stringify(res) };
    }
    catch (e) {
        return { ok: false, error: e };
    }
};
export const setAmenities = async (data) => {
    try {
        const deleteamenities = await prisma.propertyAmenity.deleteMany({
            where: { propertyId: parseInt(data[0].propertyId) }
        });
        const res = await prisma.propertyAmenity.createMany({
            data: data
        });
        return { ok: true, data: res, deleted: deleteamenities };
    }
    catch (e) {
        console.log('فشل في إضافة المرفقات!!', e);
        return { ok: false, error: e };
    }
};
export const setPropertyCompleted = async (id) => {
    try {
        const res = await prisma.property.update({
            where: { id: parseInt(id) },
            data: { completed: true }
        });
        return { ok: true, data: JSON.stringify(res) };
    } catch (e) {
        console.log("فشل في ضبط تم الانتهاء من العقار!!", e);
        return { ok: false, error: e };
    }
};
