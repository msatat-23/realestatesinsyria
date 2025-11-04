'use client'
import dynamic from 'next/dynamic';
import 'plyr-react/plyr.css';
import classes from './videoplayer.module.css';

const Plyr = dynamic(() => import('plyr-react'), { ssr: false });

const VideoPlayer = ({ sources, options }) => {
    if (!sources?.sources?.length) return null;

    return (
        <div className={classes.customVideoWrapper}>
            <Plyr source={sources} options={options} />
        </div>
    );
};

export default VideoPlayer;
