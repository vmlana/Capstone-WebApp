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

    const isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));

    const playVideo = () => {

        if (isAutoPlay) {
            setAutoPlay(false)
        } else {
            setAutoPlay(true)
        }
    }

    useEffect(() => {
        if (!isSafari) {
            const video = document.getElementById("responsive-video")
            if (!isAutoPlay && video.hasAttribute("controls")) {
                video.removeAttribute("controls")
                video.pause()
            } else if (isAutoPlay && !video.hasAttribute("controls")) {
                video.setAttribute("controls", "controls")
                video.play()
            }
        }


    }, [isAutoPlay]);

    return (
        <div className="container" onClick={playVideo}>

            {isSafari ?
                <video id="responsive-video" controls controlsList="nodownload" playsInline className="responsive-video" src="./media/videos/productionID_5195148.mp4" type="video/mp4" />
                :
                <video id="responsive-video" controlsList="nodownload" playsInline className="responsive-video" src="./media/videos/productionID_5195148.mp4" type="video/mp4" />
            }



        </div>
    );
};

export default VideoTrailer;

