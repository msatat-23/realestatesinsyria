import classes from './titledescription.module.css';
import prisma from '@/lib/prisma';
const translationMap = {
    "SALE": "بيع",
    "RENT": "إيجار",
    "MORTGAGE": "رهن",
};
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
    return (<div className={classes.container}>
        <div className={classes.weight}>كود العقار : {info?.id}</div>
        <div className={classes.weight}>{info?.title}</div>
        <div className={classes.weight}>{translationMap[info?.purpose]}</div>
        <div className={classes.description}>{info?.description}
        </div> </div>);
};

export default TitleAndDescription;