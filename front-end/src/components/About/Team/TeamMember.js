import React from 'react';
import * as FAIcons from "react-icons/fa";
import styled from 'styled-components';
import { device } from '../../StyleComponent/responsiveDevice';

const TeamMember = (props) => {

    return (
        <TeamMemberInfo className="team-member-box">
            <div className="team-member-info">
                <img src={props.memberImage} />
                <div className="member-info">
                    <p className="member-name">{props.memberName}</p>
                    {(props.memberAdditionalRole != "" && props.memberAdditionalRole != null) ? <p className="member-additional-role">{props.memberAdditionalRole}</p> : null}
                    <p className="member-role">{props.memberRole}</p>
                    <p className="member-profile">
                        {(props.linkedIn != "" && props.linkedIn != null) ? <a href={props.linkedIn} style={{ color: "#0E76A8", margin: 5 }} target="_blank"><FAIcons.FaLinkedin size={24} /></a> : ""}
                        {(props.gitHub != "" && props.gitHub != null) ? <a href={props.gitHub} style={{ color: "#7DBBE6", margin: 5 }} target="_blank"><FAIcons.FaGithubSquare size={24} /></a> : ""}
                        {(props.behance != "" && props.behance != null) ? <a href={props.behance} style={{ color: "#053EFF", margin: 5 }} target="_blank"><FAIcons.FaBehanceSquare size={24} /></a> : ""}
                    </p>
                </div>
            </div>
        </TeamMemberInfo>
    );
}

const TeamMemberInfo = styled.div`
    padding: 1rem;

    .team-member-info {
        text-align: center;

        img {
            max-width: 310px;
            border-radius: 20px 20px 0px 0px;
        }
    }
`;

export default TeamMember;