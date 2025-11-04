import classes from './titledescription.module.css';
import prisma from '@/lib/prisma';
const TitleAndDescription = async ({ id }) => {
    const info = await prisma.property.findUnique({
        where: { id: parseInt(id) },
        select: {
            id: true,
            title: true,
            purpose: true,
            description: true,
        }
    });
    if (!info) {
        return (
            <div className={classes.notfound}>
                <h2>⚠️ العقار غير موجود</h2>
                <p>ربما تم حذفه أو أن الرقم غير صحيح.</p>
            </div>
        );
    }
    return (<div className={classes.container}>
        <div className={classes.weight}>كود العقار : {info?.id}</div>
        <div className={classes.weight}>{info?.title}</div>
        <div className={classes.weight}>{info?.purpose}</div>
        <div className={classes.description}>{info?.description}
        </div> </div>);
};

export default TitleAndDescription;