"use client"
import classes from './imagescontainer.module.css';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { Fragment, useState, useEffect } from 'react';
import { getImagesSecureUrl } from '@/app/addproperty/[id]/get-data';
const ImagesContainer = ({ id }) => {
    const [LightboxOpen, setLightboxOpen] = useState(false);
    const [photoIndex, setphotoIndex] = useState(0);
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchimages = async (id) => {
            const images = await getImagesSecureUrl(id);
            setImages(images);
        };
        if (id) {
            fetchimages();
        }
    }, []);


    const remainingCount = images.length - 3;


    const handleOpen = (index) => {
        setphotoIndex(index);
        setLightboxOpen(true);
    };

    return <Fragment>
        <div className={classes.imagescontainer}>
            {images.length < 1 && <div className={classes.noimages}>لا يوجد صور لهذا العقار</div>}
            <div className={classes.mainimage} onClick={() => handleOpen(0)}>
                <img className={classes.img} src={images[0]} />
            </div>
            <div className={classes.bottomimages}>
                <div className={classes.secondimage} onClick={() => handleOpen(1)}>
                    <img className={classes.img} src={images[1]} />
                </div>
                <div className={`${classes.thirdimage} ${classes.overlay}`} onClick={() => handleOpen(2)}>
                    <img className={classes.img} src={images[2]} />
                    {remainingCount > 0 && <div className={classes.overlaycontent}>
                        +{remainingCount}
                    </div>}
                </div>
            </div>
        </div>

        {LightboxOpen &&
            (<Lightbox
                open={LightboxOpen}
                close={() => setLightboxOpen(false)}
                slides={images.map((image) => ({ src: image }))}
                index={photoIndex}
            />
            )}

    </Fragment>
}
export default ImagesContainer;















