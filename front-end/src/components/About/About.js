import React from 'react';
import PivotFeatures from './PivotFeatures/PivotFeatures';
import SignUpSection from './SignUpSection/SignUpSection';
import Team from './Team/Team';
import VideoSection from './VideoSection/VideoSection';
import styled from 'styled-components'
import Image from '../ReusableElement/Image';

const About = () => {
    return (
        <div className="main-content">
            <ABoutTopImage>
                <div className="topImgContainer">
                    {/* <Image src="./media/images/pexels-tranmautritam-901675-roj.jpg" alt="About Pivot Care" /> */}
                    {/* <Image src="./media/images/timage.jpeg" alt="About Pivot Care" /> */}
                </div>
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

  
  .topImgContainer {
    /* background-image: url('./media/images/topimage-pexels-tranmautritam-901675.jpg'); */
    background-image: url('./media/images/pexels-tranmautritam-901675-roj.jpg');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 52vh;
      img {
          display: block;
      }
  }

`;


export default About;