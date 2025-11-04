import prisma from "@/lib/prisma";

export const deletePropertyById = async (id) => {
    try {
        const deleteproperty = await prisma.property.delete({
            where: { id: parseInt(id) }
        });
        return { ok: true, data: JSON.stringify(deleteproperty) };
    }
    catch (e) {
        console.log("فشل من السيرفر في حذف العقار!!");
        return { ok: false, error: e };
    }

};


export const deleteImageByPublicId = async (public_id) => {
    const deletedimage = await prisma.image.delete({
        where: { public_id }
    });
    return deletedimage;
};

export const deleteVideoByPropertyId = async (id) => {
    try {
        const property = await prisma.property.update({
            data: {
                video: null,
                video_public_id: null
            }
            , where: { id: parseInt(id) }
        });
        return { ok: true, data: JSON.stringify(property) };
    }
    catch (e) {
        console.log("فشل في حذف الفيديو!", e);
        return { ok: false, error: e };
    }
};