import React from 'react';
import TeamMember from './TeamMember';

const Team = () => {
    return (
        <div className="team-section">
            <div className="team-section-info">
                <h2>MEET THE TEAM</h2>
                <p>
                    From high-level strategy & creative thinking to pixel-perfect execution & performance, we do our best to add value to your brand & identity. We think big & out of the box. We bring ideas to life with design & development experiences & story telling that make users happy and satisfied.
                </p>
            </div>

            <div className="team-member-section">
                <TeamMember memberImage="1.jpg" memberName="Vinicius Meyer Lana" memberAdditionalRole="Project Manager" memberRole="Backend Developer" linkedIn="https://www.linkedin.com/" gitHub="https://github.com/" behance="" />
                <TeamMember memberImage="1.jpg" memberName="Hardikkumar Vasoya" memberAdditionalRole="Dev Lead" memberRole="Full Stack Developer" linkedIn="https://www.linkedin.com/" gitHub="https://github.com/" behance="" />
                <TeamMember memberImage="1.jpg" memberName="Hiteshri Nanda" memberAdditionalRole="Design Lead" memberRole="UI/UX Designer" linkedIn="https://www.linkedin.com/" gitHub="" behance="https://www.behance.net/" />
                <TeamMember memberImage="1.jpg" memberName="Ken Tauchi" memberRole="Full Stack Developer" linkedIn="https://www.linkedin.com/" gitHub="https://github.com/" behance="" />
                <TeamMember memberImage="1.jpg" memberName="Roujyar Darvish" memberRole="UI/UX Designer" linkedIn="https://www.linkedin.com/" gitHub="" behance="https://www.behance.net/" />
                <TeamMember memberImage="1.jpg" memberName="Tomohiro Yoshida" memberRole="Full Stack Developer" linkedIn="https://www.linkedin.com/" gitHub="https://github.com/" behance="" />
                <TeamMember memberImage="1.jpg" memberName="Jaqueline Santos" memberRole="UI/UX Designer" linkedIn="https://www.linkedin.com/" gitHub="" behance="https://www.behance.net/" />
            </div>
        </div>
    );
}

export default Team;