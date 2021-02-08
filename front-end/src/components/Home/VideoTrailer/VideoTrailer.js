import React from 'react';

const VideoTrailer = () => {
    return (
        <div className="container">
            <video className="responsive-video" autoPlay playsInline muted /* loop */ src="./media/videos/productionID_5195148.mp4" type="video/mp4" />
        </div>
    );
};

export default VideoTrailer;
