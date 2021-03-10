import React from 'react';
import PivotFeatures from './PivotFeatures/PivotFeatures';
import SignUpSection from './SignUpSection/SignUpSection';
import Team from './Team/Team';
import VideoSection from './VideoSection/VideoSection';
import styled from 'styled-components'

const About = () => {
    return (
        <div className="main-content">
            <ABoutTopImage>

            </ABoutTopImage>
            {/* <img className="top-image" style={{ display: 'block' }} src="./media/images/topimage-pexels-tranmautritam-901675.jpg" alt="about-top-image" /> */}
            {/* <VideoSection /> */}
            <PivotFeatures />
            <SignUpSection />
            <Team />
        </div>
    );
};



const ABoutTopImage = styled.div`

  background-image: url('./media/images/topimage-pexels-tranmautritam-901675.jpg');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  /* width: 100vw; */
  height: 100vh;

`;


export default About;