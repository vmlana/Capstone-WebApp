import React from 'react';
import AboutPivot from './AboutPivot/AboutPivot';
import Features from './Features/Features';
import SignUpSection from './SignUpSection/SignUpSection';
import VideoTrailer from './VideoTrailer/VideoTrailer';

const Home = () => {
    return (
        <div className="main-content">
            <div>
                <VideoTrailer />
                <AboutPivot />
                <Features />
                <SignUpSection />
            </div>
        </div>
    );
};

export default Home;