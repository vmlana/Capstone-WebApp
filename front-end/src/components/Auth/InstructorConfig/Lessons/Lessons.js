import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from "styled-components";
import ContentBox from '../../../ReusableComponents/ContentBox';
import { device } from '../../../StyleComponent/responsiveDevice';

// Reusable Components
import Button from '../../../ReusableElement/Button';

const Lessons = () => {
    const history = useHistory();
    return (
        <PageContainer>
            <TitleContainer>
                <PageHeader>Lessons</PageHeader>
            </TitleContainer>
            <PageSubHeader>Click to see details or edit</PageSubHeader>
            <MainContent>
                <ContentBox src="../media/images/dummy.jpg" title="Balance 01" />
                <ContentBox src="../media/images/dummy.jpg" title="Anaerobic 01" />
                <ContentBox src="../media/images/dummy.jpg" title="Anaerobic 02" />
                <ContentBox src="../media/images/dummy.jpg" title="Endurance 03" />
                <ContentBox src="../media/images/dummy.jpg" title="Stretching 01" />
                <ContentBox src="../media/images/dummy.jpg" title="Anaerobic 03" />
                <ContentBox src="../media/images/dummy.jpg" title="Flexibility 02" />
                <ContentBox src="../media/images/dummy.jpg" title="Hatha Yoga 02" />
                <ContentBox src="../media/images/dummy.jpg" title="Functional Moves" />
            </MainContent>
            <ButtonGroup>
                <button onClick={() => history.push("/auth/add-lesson")}>Add New Lesson</button>
            </ButtonGroup>
        </PageContainer>
    );
};

const PageContainer = styled.div`
    max-width: 1500px;
    margin: 0 auto;
    padding: 2rem;
`;

const TitleContainer = styled.div`
    position: relative;
    border-bottom: solid 1px #000000;
    max-width: 200px;
    margin-bottom: 1rem;
`;

const PageHeader = styled.h2`
    font-size: 1.25rem;
    font-weight: normal;
    position: absolute;
    top: -1.75rem;
    background-color: #fff;
    padding-right: 2rem;
    text-transform: uppercase;
`;

const PageSubHeader = styled.h3`
    font-size: 1rem;
    margin: 0;
    padding: 0;
`;

const MainContent = styled.div`
    display: grid;
    grid-gap: 2rem;
    padding-top: 2rem;
    padding-bottom: 2rem;

    @media ${device.mobileP} { 
        grid-template-columns: repeat(2, 1fr);
    }

    @media ${device.tablet} { 
        grid-template-columns: repeat(3, 1fr);
    }

    @media ${device.laptop} { 
        max-width: 1200px;
        margin: 0 auto;
    }
`;

const ButtonGroup = styled.div`
    text-align: center;
`;

export default Lessons;