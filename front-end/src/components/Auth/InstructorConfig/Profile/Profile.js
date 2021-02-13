import React, { useState } from 'react';
import styled from "styled-components";

// Reusable Components
import Button from '../../../ReusableElement/Button';
import InputWithLabel from '../../../ReusableElement/InputWithLabel';
import CertificationModal from './CertificationModal';

const Profile = () => {
	const [instructorInfo, setInstructorInfo] = useState({
		instructorName: "John Doe",
		contactNumber: "0123456789",
		address: "Knight Street",
		city: "Vancouver",
		postalCode: "V5X2L6",
		resume: "Hi there",
		profilePicture: "",
	});

	const handleOnChange = (e) => {
		setInstructorInfo((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	// Certification Modal
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<ProfilePageContainer>
			<TitleContainer>
				<PageHeader>Profile</PageHeader>
			</TitleContainer>

			<Form>
				<div>
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
						name="contactNumber"
						value={instructorInfo.contactNumber}
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
							name="city"
							value={instructorInfo.city}
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
					<Button text='save' />
					<div>
						<button type="button" onClick={handleOpen}>
							Open Modal
      					</button>
						<CertificationModal open={open} onClose={handleClose} />
					</div>
				</div>

			</Form>
		</ProfilePageContainer>
	);
};

const ProfilePageContainer = styled.div`
    max-width: 1300px;
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

export default Profile;