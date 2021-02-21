import React from 'react';
import { useHistory } from 'react-router-dom';

const VideoSection = () => {
    const history = useHistory();

    return (
        <div>
            <div className="container">
                <video className="responsive-video" autoPlay playsInline muted /* loop */ src="./media/videos/productionID_5195148.mp4" type="video/mp4" />
            </div>
            <div>
                <p>Start now and keep you and your team engaged from anywhere with PIVOTCARE Web Platform</p>
                <button onClick={() => history.push("/auth")}>Sign Up</button>
            </div>
        </div>
    );
};

// https://pivotcare-s3.s3-us-west-2.amazonaws.com/exercise01.mp4


export default VideoSection;
