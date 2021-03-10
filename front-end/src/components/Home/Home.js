import React from 'react';
import AboutPivot from './AboutPivot/AboutPivot';
import Downloads from './Downloads/Downloads';
import Features from './Features/Features';
import SignUpSection from './SignUpSection/SignUpSection';
import VideoTrailer from './VideoTrailer/VideoTrailer';

const Home = () => {
    return (
        <div className="main-content">
            <div>
                <VideoTrailer />
                <AboutPivot />
                <Downloads />
                <Features />
                <SignUpSection />
            </div>
        </div>
    );
};

export default Home;