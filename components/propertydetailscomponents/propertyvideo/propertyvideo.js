import classes from './propertyvideo.module.css';
import VideoPlayer from "../../videoplayer/videoplayer";
import 'plyr/dist/plyr.css';
const PropertyVideo = ({ video }) => {

    return (<div className={classes.container}>
        <h1 className={classes.header}>فيديو العقار</h1>
        <VideoPlayer sources={{
            type: 'video',
            sources: [
                {
                    src: video,
                    type: 'video/mp4',
                },
            ],
        }}
            options={{
                controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
            }} />
    </div>)

}

export default PropertyVideo;