import classes from './page.module.css';
import { Suspense } from 'react';
import { Readex_Pro } from 'next/font/google';
import Navbar from '@/components/navbar/navbar';
import ImagesContainer from "@/components/propertydetailscomponents/imagescontainer/imagescontainer";
import TitleAndDescription from '@/components/propertydetailscomponents/titleanddescription/titledescription';
import Specifications from '@/components/propertydetailscomponents/specifications/specifications';
import Ownerdetails from '@/components/propertydetailscomponents/ownerdetails/ownerdetails';
import PropertyAmenities from '@/components/propertydetailscomponents/amenities/propertyamenities';
import PropertyVideo from '@/components/propertydetailscomponents/propertyvideo/propertyvideo';
import Statistics from '@/components/propertydetailscomponents/statistics/statistics';
import CommentsSection from '@/components/propertydetailscomponents/comments/comments';
import ContactInfo from '@/components/propertydetailscomponents/contactinfo/contactinfo';
import SimilarProperties from '@/components/propertydetailscomponents/similarproperties/similarproperties';
import Footer from '@/components/footer/footer';
import Loading from '@/components/loadingwithoutoverlay/loading';
import prisma from '@/lib/prisma';
const Readex_Pro_Font = Readex_Pro({ subsets: ['arabic'], weight: '400' });



const PropertyClient = async ({ id }) => {
    const property = await prisma.property.findUnique({
        where: { id: parseInt(id) },
        select: { id: true }
    });
    if (!property) {
        return (
            <div className={classes.notfound}>
                <h2>العقار غير موجود</h2>
                <p>ربما تم حذفه أو أن الرقم غير صحيح.</p>
            </div>
        );
    }
    return (
        <div className={`${classes.global} ${Readex_Pro_Font.className}`}>
            <Navbar mainpage={false} />
            <div className={classes.imagesanddescription}>
                <TitleAndDescription id={id} />
                <ImagesContainer id={id} />
            </div>
            <div className={classes.specifications}>
                <Specifications id={id} />
                <Ownerdetails id={id} />
            </div>
            <PropertyAmenities id={id} />
            <PropertyVideo id={id} />
            <Statistics id={id} />
            {/* <CommentsSection id={id} /> */}
            <ContactInfo id={id} />
            <SimilarProperties id={id} />
            <Footer />
        </div>
    );
};
export default PropertyClient;

