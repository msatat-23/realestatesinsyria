import prisma from "@/lib/prisma";

export const getPropertiesByPlan = async (plan) => {
    const NewestProperties = await prisma.property.findMany({
        where: { subscription: plan },
        orderBy: {
            updatedAt: 'desc',
        },
        take: 5
    });
    const MostViewedProperties = await prisma.property.findMany({
        where: { subscription: plan },
        orderBy: {
            views: 'desc'
        },
        take: 2
    });
    const HighestRatedProperties = await prisma.property.findMany({
        where: { subscription: plan },
        orderBy: {
            rating: 'desc'
        },
        take: 2
    });
    const count = await prisma.property.count({
        where: { subscription: plan }
    });
    const limit = 3;
    const offset = Math.floor(Math.random() * Math.max(0, count - limit));
    const RandomProperties = await prisma.property.findMany({
        where: { subscription: plan },
        skip: offset,
        take: 3
    });
    return [...NewestProperties, ...MostViewedProperties, ...HighestRatedProperties, ...RandomProperties];
};
