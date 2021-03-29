import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from "styled-components";
import * as FAIcons from "react-icons/fa";

// Reusable Components
import Button from '../../../ReusableElement/Button';
import InputWithLabel from '../../../ReusableElement/InputWithLabel';
import CertificationModal from './CertificationModal';
import Image from '../../../ReusableElement/Image';

import { device } from '../../../StyleComponent/responsiveDevice';

import { apiUrl } from '../../../../services/apiUrl';

const Profile = () => {
	const dispatch = useDispatch();
	const [instructorInfo, setInstructorInfo] = useState({
		instructorId: "",
		instructorName: "",
		phoneNumber: "",
		address: "",
		cityName: "",
		postalCode: "",
		provinceCode: "",
		provinceName: "",
		resume: "",
		specializationArea: "",
		imageFile: "./media/images/profilePicture.png",
		userLogin: "",
		certifications: [
			{
				certificationImage: './media/images/Certificates-03.svg',
				certificationName: 'Personal Trainer of the year',
				issuingOrganization: '',
				issueDate: '',
				expirationdate: '',
				credentialID: '1',
				doesExpire: false
			},
			{
				certificationImage: './media/images/Certificates-01.svg',
				certificationName: 'Certified Personal Trainer',
				issuingOrganization: '',
				issueDate: '',
				expirationdate: '',
				credentialID: '2',
				doesExpire: false
			},

		]
	});

	const userInfo = useSelector(state => state.user.userInfo);
	const { userType, authId, token } = userInfo;

	const handleOnChange = (e) => {
		setInstructorInfo((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	// File Upload
	const handleChange = (e) => {
		if (e.target.files.length) {
			setInstructorInfo((prev) => ({
				...prev,
				imageFile: URL.createObjectURL(e.target.files[0]),
			}));
		}
	};

	// Certification Modal
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const onSubmit = (e) => {
		e.preventDefault()
	}

	useEffect(async () => {

		try {
			const instructorData = await fetch(`${apiUrl}/instructor?instructorId=${authId}`).then(results => {
				return results.json();
			}).catch(err => {
				throw err;
			})
			// console.log('InstructorData', instructorData);
			let {
				instructorId,
				instructorName,
				phoneNumber,
				address,
				cityName,
				postalCode,
				provinceCode,
				provinceName,
				resume,
				specializationArea,
				imageFile,
				userLogin
			} = instructorData;

			if (postalCode == null) {
				postalCode = "";
			}

			if (imageFile == null) {
				imageFile = "./media/images/profilePicture.png"
			}

			setInstructorInfo((prev) => ({
				...prev,
				instructorId,
				instructorName,
				phoneNumber,
				address,
				cityName,
				postalCode,
				provinceCode,
				provinceName,
				resume,
				specializationArea,
				imageFile,
				userLogin
			}))

			// console.log(instructorInfo);

		} catch (err) {
			console.log("No user data found", err)
		}

	}, [authId]);

	return (
		<PageContainer>
			<TitleContainer>
				<PageHeader>Profile</PageHeader>
			</TitleContainer>
			<Form onSubmit={onSubmit}>
				<div className="pictureContainer">
					<ProfilePictureContainer>
						<label htmlFor="fileUpload" style={{ backgroundColor: "lightgrey", borderRadius: 20 }}>
							{instructorInfo.imageFile ? (
								<FileUploadContainer>
									<div className="instImage"><img src={instructorInfo.imageFile} alt={instructorInfo.instructorName} style={{ width: "200px", height: "200px" }} /></div>
									<div className="upload_icon"><FAIcons.FaUpload style={{ margin: "0.30rem" }} /></div>
								</FileUploadContainer>
							) : (
								<>
									<FAIcons.FaUpload />
									<label style={{ marginLeft: "1rem" }}>Upload profile picture</label>
								</>
							)}
						</label>
						<UploadFile
							type="file"
							id="fileUpload"
							onChange={handleChange}
						/>
					</ProfilePictureContainer>
				</div>
				<div className="formContainer">
					<InputWithLabel
						label="First Name, Last Name"
						type="text"
						name="instructorName"
						value={instructorInfo.instructorName}
						required
						onChange={handleOnChange}
					/>

					<InputWithLabel
						label="Contact Number"
						type="number"
						name="phoneNumber"
						value={instructorInfo.phoneNumber}
						required
						onChange={handleOnChange}
					/>

					<InputWithLabel
						label="Address"
						type="text"
						name="address"
						value={instructorInfo.address}
						required
						onChange={handleOnChange}
					/>

					<AddressWrapDiv>
						<InputWithLabel
							label="City"
							type="text"
							name="cityName"
							value={instructorInfo.cityName}
							required
							onChange={handleOnChange}
						/>
						<InputWithLabel
							label="Postal Code"
							type="text"
							name="postalCode"
							value={instructorInfo.postalCode}
							required
							onChange={handleOnChange}
						/>
					</AddressWrapDiv>

					<Label>
						<LabelText>Resume</LabelText>
						<TextArea name="resume" rows="7" required value={instructorInfo.resume} onChange={handleOnChange} />
					</Label>
				</div>

				<div className="certificationContainer">
					<Certification>
						<CertificationHeader>
							<label>Licences & certifications</label>
							<FAIcons.FaPlus onClick={handleOpen} style={{ cursor: 'pointer' }} size={14} />
						</CertificationHeader>

						{
							instructorInfo.certifications.length === 0 ?
								<CertificationContentNull>
									Add Licences and Cerications.
                        		</CertificationContentNull>
								:
								<CertificationContent>
									{
										instructorInfo.certifications.map(certification =>
											<CertificationListItem key={certification.credentialID}>
												<Image src={certification.certificationImage} alt={certification.certificationName} />
												<span>{certification.certificationName}</span>
												<FAIcons.FaPen style={{ cursor: 'pointer' }} />
											</CertificationListItem>
										)
									}
								</CertificationContent>
						}


						<CertificationModal open={open} onClose={handleClose} />
					</Certification>
				</div>

			</Form>

			<ButtonContainer>
				<Button text='save' />
			</ButtonContainer>
		</PageContainer>
	);
};

const PageContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
	padding-top: 4.5rem;
	color:#707070;
`;

const TitleContainer = styled.div`
    position: relative;
    border-bottom: solid 2px #707070;
    margin-bottom: 3rem;

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
	font-family: 'GothamRoundedBold', sans-serif;
	font-weight: 900;
	color: #707070;
`;

const Form = styled.form`
	display: grid;
	grid-gap: 2rem;

	.pictureContainer {
		margin: 0 auto;
	}

	@media ${device.laptop} { 
		grid-gap: 7rem;
		grid-template-columns: repeat(2, 1fr);
		/* grid-template-rows: 1fr 1fr; */
        .pictureContainer {
			margin: 0;
			grid-column: 2;
			grid-row: 1;
		}

		.formContainer {
			grid-column: 1;
			grid-row: span 2;
		}

		.certificationContainer {
			grid-column: 2;
			grid-row: 1;
			margin-top: 250px;
		}
    }
`;

const AddressWrapDiv = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 3rem;
`;

const Label = styled.label`
    margin: .25rem 0;
`;

const LabelText = styled.p`
    font-size: 1rem;
    margin: .5rem 0;
    text-align: left;
	font-size: 18px;
	line-height: 30px;
	color: #707070;
`;

const TextArea = styled.textarea`
	border: solid 1px #ccc;
	border-radius: 5px;
	font-size: 18px;
	line-height: 30px;
	width: 100%;
	resize: none;
	color: #333333;
	padding: 20px;
	box-sizing: border-box;

	:focus {
		outline: #7662a5 auto 1px;
	}
`;

const ButtonContainer = styled.div`
	margin-top: 4rem;
	margin-bottom: 2rem;
	text-align: center;

	@media ${device.laptop} {
		text-align: left;
	}

	button {
		width: 250px;
		height: 50px;
		margin: 0 auto;

		@media ${device.tablet} {
			margin: unset;
			width: 300px;
			height: 70px;
		}
	}
`;

const Certification = styled.div`
	margin-top: 2rem;
	font-size: 18px;
	line-height: 30px;
`;

const CertificationHeader = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 2rem;
`;

const CertificationContentNull = styled.div`

`;

const CertificationContent = styled.ul`

`;

const CertificationListItem = styled.li`
	display: grid;
    grid-template-columns: 70px 1fr 20px;
	grid-gap: 1rem;
    margin-bottom: 1rem;
	align-items: center;
`;

const ProfilePictureContainer = styled.div`
	display: flex;
    text-align: right;
    justify-content: flex-end;
`;

const FileUploadContainer = styled.div`
	position: relative;
	

	.instImage {
		font-size: 0;

		img {
			border-radius: 20px;
		}
	}
	.upload_icon {
		position: absolute;
		/* top: 0; */
		bottom: 0;
		background-color: rgba(232, 232, 232, 0.77);
		left: 0;
		right: 0;
		color: #333333;
		border-bottom-left-radius: 20px;
		border-bottom-right-radius: 20px;

		svg {
			padding-right: 1rem;
		}
	}
`;

const UploadFile = styled.input.attrs({ type: 'file' })`
	display: none;
`;

export default Profile;