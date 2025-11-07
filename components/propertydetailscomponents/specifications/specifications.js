import classes from './specifications.module.css';
import prisma from '@/lib/prisma';
const reverseToArabic = (arr) => {
    const translationMap = {
        "EAST": "شرقي",
        "WEST": "غربي",
        "SOUTH": "جنوبي",
        "NORTH": "شمالي",
    };
    return arr.map((item) => {
        const itemarr = item.split('_');
        return itemarr.map((word) => translationMap[word]).join('_');
    });
}

const Specifications = async ({ id }) => {
    const info = await prisma.property.findUnique({
        where: { id: parseInt(id) },
        select: {
            region: { select: { city: { select: { governorate: { select: { name: true } }, name: true } }, name: true } },
            price: true,
            area: true,
            direction: true,
            rooms: true,
            floor: true,
        }
    });
    return (<div className={classes.container}>
        <h1 className={classes.header}>المواصفات</h1>
        <table className={classes.table}>
            <tbody>
                {info.region.city.governorate.name && <tr><td>المحافظة</td><td>{info.region.city.governorate.name}</td></tr>}
                {info.region.city.name && <tr><td>المدينة</td><td>{info.region.city.name}</td></tr>}
                {info.region.name && <tr><td>المنطقة</td><td>{info.region.name}</td></tr>}
                {info.price && <tr><td>السعر</td><td>{info.price}$</td></tr>}
                {info.area && <tr><td>المساحة</td><td>{info.area}m</td></tr>}
                {info.direction && <tr><td>الاتجاهات</td><td>{reverseToArabic([info.direction])}</td></tr>}
                {info.rooms && <tr><td>عدد الغرف</td><td>{info.rooms}</td></tr>}
                {info.floor && <tr><td>الطابق</td><td>{info.floor}</td></tr>}
            </tbody>
        </table>
    </div>)
}
export default Specifications;