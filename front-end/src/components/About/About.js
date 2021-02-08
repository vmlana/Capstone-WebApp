import React from 'react';
import PivotFeatures from './PivotFeatures/PivotFeatures';
import SignUpSection from './SignUpSection/SignUpSection';
import Team from './Team/Team';
import VideoSection from './VideoSection/VideoSection';

const About = () => {
    return (
        <div className="main-content">
            <VideoSection />
            <PivotFeatures />
            <SignUpSection />
            <Team />
        </div>
    );
};

export default About;