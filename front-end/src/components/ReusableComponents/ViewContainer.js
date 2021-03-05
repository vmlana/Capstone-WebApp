import React from 'react'
import styled from "styled-components";
import { useHistory } from 'react-router-dom';
import ContentBox from '../ReusableComponents/ContentBox';
import { device } from '../StyleComponent/responsiveDevice';

const ViewContainer = ({ viewData, data }) => {
    const history = useHistory();

    return (
        <PageContainer>
            <TitleContainer>
                <PageHeader>{viewData.header}</PageHeader>
            </TitleContainer>
            <PageSubHeader>{viewData.subHeader}</PageSubHeader>
            <MainContent>

                {
                    viewData.pageName == 'Program' ?
                        data.map((result) => {
                            return <ContentBox src={result.playlists[0].lessons[0].imageFile} title={result.programName} key={result.programId} redirectURI={`edit-program/${viewData.companyId}/${result.programId}`} DataContent={result} />
                        })
                        :
                        null
                }

                {
                    viewData.pageName == 'Playlist' ?
                        data.map((result) => {
                            return <ContentBox src={result.lessons[0].imageFile} title={result.playlistName} key={result.playlistId} redirectURI={`edit-playlist/${viewData.instructorId}/${result.playlistId}`} DataContent={result} />
                        })
                        :
                        null
                }

                {
                    viewData.pageName == 'Lesson' ?
                        data.map((result) => {
                            // console.log(result.imageFile)
                            return <ContentBox src={result.imageFile} title={result.lessonName} key={result.lessonId} redirectURI={`edit-lesson/${viewData.instructorId}/${result.lessonId}`} DataContent={result} />
                        })
                        :
                        null
                }
            </MainContent>
            <ButtonGroup>
                <button onClick={() => history.push(`/auth/${viewData.redirectRoute}`)}>Add New {viewData.pageName}</button>
            </ButtonGroup>
        </PageContainer>
    )
}

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

export default ViewContainer
