import classes from './amenities.module.css';
import prisma from '@/lib/prisma';


const PropertyAmenities = async ({ id }) => {
    const info = await prisma.propertyAmenity.findMany({
        where: { propertyId: parseInt(id) },
        select: { amenity: { select: { name: true } }, description: true }
    });

    return (
        <div className={classes.container}>
            {info.length > 0 && <h1 className={classes.header}>مميزات العقار</h1>}
            <table className={classes.table}>
                <tbody>
                    {info.map((item) => <tr><td>{item.amenity.name}</td><td>{item.description}</td></tr>)}
                </tbody>
            </table></div>
    )
}

export default PropertyAmenities;