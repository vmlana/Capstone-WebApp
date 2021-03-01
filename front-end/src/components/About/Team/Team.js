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
                <div class="team-info team-info-one">
                    <TeamMember memberImage="./media/images/Vini.jpg" memberName="Vinicius Meyer Lana" memberAdditionalRole="Project Manager" memberRole="Backend Developer" linkedIn="https://www.linkedin.com/" gitHub="https://github.com/" behance="" />
                    <TeamMember memberImage="./media/images/Hardik.jpg" memberName="Hardikkumar Vasoya" memberAdditionalRole="Dev Lead" memberRole="Full Stack Developer" linkedIn="https://www.linkedin.com/" gitHub="https://github.com/" behance="" />
                    <TeamMember memberImage="./media/images/Hiteshri.jpg" memberName="Hiteshri Nanda" memberAdditionalRole="Design Lead" memberRole="UI/UX Designer" linkedIn="https://www.linkedin.com/" gitHub="" behance="https://www.behance.net/" />
                    {/* </div>
                <div class="team-info team-info-two"> */}
                    <TeamMember memberImage="./media/images/Ken.jpg" memberName="Ken Tauchi" memberRole="Full Stack Developer" linkedIn="https://www.linkedin.com/" gitHub="https://github.com/" behance="" />
                    <TeamMember memberImage="./media/images/Roj.jpg" memberName="Roujyar Darvish" memberRole="UI/UX Designer" linkedIn="https://www.linkedin.com/" gitHub="" behance="https://www.behance.net/" />
                    <TeamMember memberImage="./media/images/Tomo.jpg" memberName="Tomohiro Yoshida" memberRole="Full Stack Developer" linkedIn="https://www.linkedin.com/" gitHub="https://github.com/" behance="" />
                    <TeamMember memberImage="./media/images/Jaque.jpg" memberName="Jaqueline Santos" memberRole="UI/UX Designer" linkedIn="https://www.linkedin.com/" gitHub="" behance="https://www.behance.net/" />
                </div>
            </div>
        </TeamSection>
    );
}

const TeamSection = styled.div`
    max-width: 1500px;
    margin: 0 auto;
    padding: 5rem 2rem;

    @media ${device.desktopL} { 
        padding: 12rem 0;
    }

    .team-section-info {
        max-width: 800px;
        margin: 0 auto;
        text-align: center;
        color: #707070;

        h2 {
            font-size: 30px;
            line-height: 36px;
        }
        
        p {
            font-size: 18px;
            line-height: 30px;
        }
    }

    .team-member-section {
        .team-info {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;

            .team-member-box:nth-of-type(1) {
                flex-basis: 100%;
            }

            /* &.team-info-one {
                .team-member-box {
                    flex: 1 0 50%;
                    text-align: center;
                    padding: 10px;
                }

                .team-member-box:first-child {
                    flex: 0 1 100%;
                }

            } */
        }
        
    }
`;

export default Team;