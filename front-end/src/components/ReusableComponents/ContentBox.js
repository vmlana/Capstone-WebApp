import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom';

const ContentBox = (props) => {
    const history = useHistory();

    return (
        <ContentContainer onClick={() => history.push({ pathname: props.redirectURI, state: { programData: props.programData } })} >
            <ContentImage src={props.src} alt={props.title} />
            <ContentHeading>{props.title}</ContentHeading>
        </ContentContainer >
    )
}

const ContentContainer = styled.div`
    text-align: center;
`;

const ContentImage = styled.img`
    border-radius: 1rem;
`;

const ContentHeading = styled.h2`
    font-size: 1rem;
`;

export default ContentBox
