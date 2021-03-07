import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from "styled-components";
import * as FAIcons from "react-icons/fa";

// Reusable Components
import Button from '../../../ReusableElement/Button';
import InputWithLabel from '../../../ReusableElement/InputWithLabel';
import CertificationModal from './CertificationModal';
import Image from '../../../ReusableElement/Image';

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
				certificationImage: '1.jpg',
				certificationName: 'Teacher of Hatha Yoga',
				issuingOrganization: '',
				issueDate: '',
				expirationdate: '',
				credentialID: '1',
				doesExpire: false
			},
			{
				certificationImage: '2.jpg',
				certificationName: 'Certified Personal Trainer',
				issuingOrganization: '',
				issueDate: '',
				expirationdate: '',
				credentialID: '2',
				doesExpire: false
			}
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
			// console.log(instructorData);
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
			} = instructorData[0];

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
			console.log("No user data found")
		}

	}, [authId]);

	return (
		<PageContainer>

			<Form onSubmit={onSubmit}>
				<div>
					<TitleContainer>
						<PageHeader>Profile</PageHeader>
					</TitleContainer>
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
				<div>

					<ProfilePictureContainer>
						<label htmlFor="fileUpload" style={{ backgroundColor: "lightgrey" }}>
							{instructorInfo.imageFile ? (
								<FileUploadContainer>
									<img src={instructorInfo.imageFile} alt={instructorInfo.instructorName} style={{ width: "125px", height: "125px" }} />
									<FAIcons.FaUpload style={{ margin: "0.30rem" }} />
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
					<ButtonContainer>
						<Button text='save' />
					</ButtonContainer>
				</div>

			</Form>
		</PageContainer>
	);
};

const PageContainer = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
`;

const TitleContainer = styled.div`
    position: relative;
    border-bottom: solid 1px #000000;
    max-width: 200px;
    margin-bottom: 3rem;
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

const Form = styled.form`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 10rem;
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
`;

const TextArea = styled.textarea`
	border: solid 1px #ccc;
	border-radius: 5px;
	font-size: 16px;
	width: 100%;
	padding: .25rem 0.5rem;
	resize: none;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const Certification = styled.div`
	margin-top: 2rem;
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
`;

const ProfilePictureContainer = styled.div`
	display: flex;
    text-align: right;
    justify-content: flex-end;
`;

const FileUploadContainer = styled.div`
	width: 125px;
`;

const UploadFile = styled.input.attrs({ type: 'file' })`
	display: none;
`;

export default Profile;