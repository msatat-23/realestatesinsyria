import prisma from "@/lib/prisma";

export const fetchSavedPropertiesByUserId = async (userId) => {
    const properties = await prisma.savedProperty.findMany({
        where: { userId: parseInt(userId) },
        select: {
            property: {
                select: {
                    id: true,
                    title: true,
                    description: true,
                    purpose: true,
                    state: true,
                    propertyType: true,
                    price: true,
                    area: true,
                    region: { select: { city: { select: { name: true } }, name: true } },
                    subscription: true,
                    createdAt: true
                }
            }
        }
    });
    return JSON.stringify(properties);
};

export const deleteSavedProperty = async (userId, propertyId) => {
    try {
        const deletesavedproperty = await prisma.savedProperty.delete({
            where: { userId: parseInt(userId), propertyId: parseInt(propertyId) }
        });
        return { ok: true, data: JSON.stringify(deletesavedproperty) };
    } catch (e) {
        return { ok: false, error: e };
    }
};