import React, {useState} from 'react';
import styled from "styled-components";

import InputWithLabel from '../../../ReusableElement/InputWithLabel';

const Account = () => {
    const [companyInfo, setCompanyInfo] = useState({
        companyName: "",
        accountResponsible: "",
        contactEmail: "",
        phoneNumber: "",
        address: "",
        cityName: "",
        // database doesn't have postal code
        postalCode: "",
        employees: [],
    })

    const handleOnChange = (e) => {
        e.persist();
        setCompanyInfo((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        }));
    };

    return (
        <div>
            <HeaderWrapDiv>
                <AccountPageHeader>Company account</AccountPageHeader>
            </HeaderWrapDiv>

            <form>
                <InputWithLabel
                    label="Company Name"
                    type="text"
                    name="companyName"
                    required
                    value={companyInfo.companyName}
                    onChange={handleOnChange}
                />
                <InputWithLabel
                    label="Name"
                    type="text"
                    name="accountResponsible"
                    required
                    value={companyInfo.accountResponsible}
                    onChange={handleOnChange}
                />
                <InputWithLabel
                    label="Email"
                    type="email"
                    name="contactEmail"
                    required
                    value={companyInfo.contactEmail}
                    onChange={handleOnChange}
                />
                <InputWithLabel
                    label="Company Address"
                    type="text"
                    name="address"
                    required
                    value={companyInfo.address}
                    onChange={handleOnChange}
                />
                <InputWithLabel
                    label="Phone Number"
                    type="tel"
                    name="phoneNumber"
                    required
                    value={companyInfo.phoneNumber}
                    onChange={handleOnChange}
                />
                <InputWithLabel
                    label="City"
                    type="text"
                    name="cityName"
                    required
                    value={companyInfo.cityName}
                    onChange={handleOnChange}
                />
                <InputWithLabel
                    label="Postal Code"
                    type="text"
                    name="postalCode"
                    required
                    value={companyInfo.postalCode}
                    onChange={handleOnChange}
                />
            </form>
        </div>
    );
};

const mobileBreakPoint = "576px";

const HeaderWrapDiv = styled.div`
    position: relative;
    border-bottom: solid 1px #000000;
    max-width: 300px;
    margin-bottom: 3rem;
    @media (max-width: ${mobileBreakPoint}) {
        margin-right: 0;
        margin-left: 0;
        max-width: 100%;
    }
`;

const AccountPageHeader = styled.h2`
    font-size: 1.25rem;
    font-weight: normal;
    position: absolute;
    top: -1.75rem;
    background-color: #fff;
    padding-right: 2rem;
    text-transform: uppercase;
`;


export default Account;