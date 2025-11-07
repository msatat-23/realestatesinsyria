import classes from './propertyvideo.module.css';
import VideoPlayer from "../../videoplayer/videoplayer";
import prisma from '@/lib/prisma';
const PropertyVideo = async ({ id }) => {
    const video = await prisma.property.findUnique({
        where: { id: parseInt(id) },
        select: { video: true }
    });


    return (<div className={classes.container}>
        <h1 className={classes.header}>فيديو العقار</h1>
        {video.video && <VideoPlayer
            url={video.video}
            options={{
                playing: false,
                loop: false,
                muted: false
            }} />}
        {!video.video && <p>لا يوجد فيديو لهذا العقار</p>}
    </div>)

}

export default PropertyVideo;