// import React from 'react';

// const VideoTrailer = () => {
//     return (
//         <div className="container">
//             <video className="responsive-video" autoPlay playsInline muted /* loop */ src="./media/videos/productionID_5195148.mp4" type="video/mp4" />
//         </div>
//     );
// };

// export default VideoTrailer;

import React, { useState, useEffect } from 'react';

const VideoTrailer = () => {
    const [isAutoPlay, setAutoPlay] = useState(false);
    // const [curTime, setCurTime] = useState(0);

    const isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));

    console.log(isSafari);

    const playVideo = () => {

        if (isAutoPlay) {
            setAutoPlay(false)
            // if (!isSafari) {
            //     document.getElementById("responsive-video").poster = "https://www.pngfind.com/pngs/m/427-4277341_add-play-button-to-image-online-overlay-play.png"
            //     document.getElementById("responsive-video").load()
            //     // document.getElementById("responsive-video").currentTime()
            // }
        } else {
            setAutoPlay(true)
            // if (!isSafari) {
            //     document.getElementById("responsive-video").poster = ""
            //     // document.getElementById("responsive-video").load()
            // }
        }
    }

    useEffect(() => {
        if (!isSafari) {
            const video = document.getElementById("responsive-video")
            if (!isAutoPlay && video.hasAttribute("controls")) {
                video.removeAttribute("controls")
                video.pause()
                // setCurTime(video.currentTime)
            } else if (isAutoPlay && !video.hasAttribute("controls")) {
                video.setAttribute("controls", "controls")
                video.poster = ''
                // video.currentTime
                video.play()
            }
        }
    }, [isAutoPlay]);

    return (
        <div className="widthContainer">
            <div className="container" onClick={playVideo}>
                {isSafari ?
                    <video id="responsive-video" controls controlsList="nodownload" muted autoPlay playsInline loop className="responsive-video" src="https://pivotcare-s3.s3-us-west-2.amazonaws.com/videos/promotion_video_low.mp4" type="video/mp4" poster='' />
                    :
                    <video id="responsive-video" controlsList="nodownload" muted autoPlay playsInline className="responsive-video" src="./media/videos/Script2-Final-v1.mp4" type="video/mp4" poster='' />
                }
            </div>
        </div>
    );
};

export default VideoTrailer;

