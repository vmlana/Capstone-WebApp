import React from 'react';
import TeamMember from './TeamMember';
import styled from 'styled-components';
import { device } from '../../StyleComponent/responsiveDevice';

const Team = () => {
    return (
        <TeamSection className="team-section">
            <div className="team-section-info">
                <h2>MEET THE TEAM</h2>
                <p>
                    From high-level strategy & creative thinking to pixel-perfect execution & performance, we do our best to add value to your brand & identity. We think big & out of the box. We bring ideas to life with design & development experiences & story telling that make users happy and satisfied.
                </p>
            </div>

            <div className="team-member-section">
                <div className="team-info team-info-one">
                    <TeamMember memberImage="./media/images/Vini.jpg" memberName="Vinicius Meyer Lana" memberAdditionalRole="Project Manager" memberRole="Backend Developer" linkedIn="https://www.linkedin.com/in/vmlana" gitHub="https://github.com/vmlana" behance="" borderColor="#624A99" />
                    <TeamMember memberImage="./media/images/Hardik.jpg" memberName="Hardikkumar Vasoya" memberAdditionalRole="Lead Developer" memberRole="Full Stack Developer" linkedIn="https://www.linkedin.com/in/hjvasoya/" gitHub="https://github.com/hjvasoya009" behance="" borderColor="#4F99CE" />
                    <TeamMember memberImage="./media/images/Hiteshri.jpg" memberName="Hiteshri Nanda" memberAdditionalRole="Lead Designer" memberRole="UI/UX Designer" linkedIn="https://www.linkedin.com/in/hiteshri-nanda/" gitHub="" behance=" https://www.behance.net/hiteshri" borderColor="#FF9D5A" />
                    <TeamMember memberImage="./media/images/Ken.jpg" memberName="Ken Tauchi" memberAdditionalRole="Quality Assurance" memberRole="Full Stack Developer" linkedIn="https://www.linkedin.com/in/kentauchi/" gitHub="https://github.com/KenTauchi/" behance="" borderColor="#4F99CE" />
                    <TeamMember memberImage="./media/images/Roj.jpg" memberName="Roujyar Darvish" memberRole="UI/UX Designer" linkedIn="https://www.linkedin.com/in/roujyard/" gitHub="" behance="https://www.behance.net/roujyard" borderColor="#FF9D5A" />
                    <TeamMember memberImage="./media/images/Tomo.jpg" memberName="Tomohiro Yoshida" memberRole="Full Stack Developer" linkedIn="https://www.linkedin.com/in/tomohiro/" gitHub="https://github.com/TOMO-YOSHI" behance="" borderColor="#624A99" />
                    <TeamMember memberImage="./media/images/Jaque.jpg" memberName="Jaqueline Santos" memberRole="UI/UX Designer" linkedIn="https://www.linkedin.com/in/jaquelinesant0s" gitHub="" behance="https://www.behance.net/jaquelinesant0s" borderColor="#4F99CE" />
                </div>
            </div>
        </TeamSection>
    );
}

const TeamSection = styled.div`
    max-width: 1500px;
    margin: 0 auto;
    padding: 4rem 2rem;

    @media ${device.desktopL} { 
        padding: 12rem 0;
    }

    .team-section-info {
        max-width: 800px;
        margin: 0 auto;
        text-align: center;
        color: #707070;

        h2 {
            font-size: 20px;
            line-height: 30px;
            text-align: left;

            @media ${device.tablet} { 
                text-align: center;
                font-size: 30px;
                line-height: 36px;
            }
        }
        
        p {
            font-size: 14px;
            line-height: 22px;
            text-align: left;

            @media ${device.tablet} { 
                text-align: center;
                font-size: 18px;
                line-height: 30px;
            }
        }
    }

    .team-member-section {
        .team-info {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;

            .team-member-box:nth-of-type(1),
            .team-member-box:nth-of-type(2),
            .team-member-box:nth-of-type(3) {
                /* flex-basis: 20.80%; */
            }
        }
        
    }
`;

export default Team;