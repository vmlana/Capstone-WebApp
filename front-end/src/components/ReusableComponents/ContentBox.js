import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Video from "./Video";

const ContentBox = (props) => {
	const history = useHistory();

	return (
		<ContentContainer
			onClick={() =>
				history.push({
					pathname: props.redirectURI,
					state: { DataContent: props.DataContent },
				})
			}
		>
			{/* <Video src={props.src} /> */}
			<ImageTag src={props.src} alt={props.title} />
			<ContentHeading>{props.title}</ContentHeading>
		</ContentContainer>
	);
};

const ContentContainer = styled.div`
	text-align: center;
	cursor: pointer;
`;

const ContentHeading = styled.h2`
	font-size: 1rem;
`;

const ImageTag = styled.img`
	max-width: 100%;
	height: auto;
	border-radius: 1rem;
`;

export default ContentBox;
