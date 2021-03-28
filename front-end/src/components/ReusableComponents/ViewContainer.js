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

                {
                    viewData.pageName == 'Blog' ?
                        data.map((result) => {
                            // console.log(result.blogImageFile)
                            return <ContentBox src={result.blogImageFile} title={result.blogTitle} key={result.blogId} redirectURI={`edit-blog/${viewData.instructorId}/${result.blogId}`} DataContent={result} />
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
    padding-top: 4.5rem;
    color:#707070;
    font-family: 'GothamRoundedNormal', sans-serif;
`;

const TitleContainer = styled.div`
    position: relative;
    border-bottom: solid 2px #707070;
    margin-bottom: 1rem;

	@media ${device.mobileP} {
		max-width: 300px;
	}       
`;

const PageHeader = styled.h2`
    font-size: 30px;
	line-height: 36px;
    position: absolute;
    top: -2.5rem;
    background-color: #fff;
    padding-right: 2rem;
    text-transform: uppercase;
	font-family: GothamRoundedBold, sans-serif;
	font-weight: 900;
	color: #707070;
`;

const PageSubHeader = styled.h3`
    font-size: 18px;
    line-height: 30px;
    font-family: 'Gotham', sans-serif;
    font-weight: 300;
    margin: 0;
    padding: 0;
`;

const MainContent = styled.div`
    display: grid;
    grid-gap: 4rem;
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
    margin-top: 3rem;
    margin-bottom: 2rem;

    button {
        background-color: #7662A5;
        color: white;
        border: none;
        border-radius: 5px;
        width: 300px;
        height: 70px;
        text-transform: capitalize;
        font-size: 20px;
        line-height: 24px;
        font-family: 'GothamRoundedNormal';

        &:focus {
            outline: none;
            box-shadow: none;
        }
    }
`;

export default ViewContainer
