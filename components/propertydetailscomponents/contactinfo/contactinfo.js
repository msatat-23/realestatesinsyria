import classes from './contactinfo.module.css';
import prisma from '@/lib/prisma';

const ContactInfo = async ({ id }) => {
    const info = await prisma.property.findUnique({
        where: { id: parseInt(id) },
        select: { contactInfo: true }
    });

    return (<div className={classes.container}><h1>معلومات التواصل :</h1>
        <p>{info.contactInfo}</p></div>)
}

export default ContactInfo;