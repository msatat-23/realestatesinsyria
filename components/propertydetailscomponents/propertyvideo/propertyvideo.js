import classes from './propertyvideo.module.css';
import VideoPlayer from "../../videoplayer/videoplayer";
import 'plyr/dist/plyr.css';
import prisma from '@/lib/prisma';
const PropertyVideo = async ({ id }) => {
    const video = await prisma.property.findUnique({
        where: { id: parseInt(id) },
        select: { video: true }
    });


    return (<div className={classes.container}>
        <h1 className={classes.header}>فيديو العقار</h1>
        {video.video && <VideoPlayer sources={{
            type: 'video',
            sources: [
                {
                    src: video.video,
                    type: 'video/mp4',
                },
            ],
        }}
            options={{
                controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
            }} />}
        {!video.video && <p>لا يوجد فيديو لهذا العقار</p>}
    </div>)

}

export default PropertyVideo;