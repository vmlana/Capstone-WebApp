import React from 'react'
import styled from 'styled-components';

const Video = ({ src }) => {
    return (
        <VideoContainer>
            <VideoLoad controlsList="nodownload" muted playsInline className="responsive-video" src={src} type="video/mp4" />
        </VideoContainer>
    )
}

const VideoContainer = styled.div`
    position: relative;
    overflow: hidden;
    width: 100%;
    /* padding-top: 56.25%; */
    padding-top: 41.66%;
    border-radius: 1rem;
    /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
`;

const VideoLoad = styled.video`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
`;

export default Video
