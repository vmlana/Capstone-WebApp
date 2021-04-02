import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from "styled-components";
import * as FAIcons from "react-icons/fa";

import InputWithLabel from '../../../ReusableElement/InputWithLabel';
import DropdownInput from './DropdownInput';
import DropdownInputCityName from './DropdownInputCityName';

import dummyImg from '../../../../assets/dummy.jpg';
import csv from '../../../../assets/employee_list.csv';

import { readFileURL } from '../../../../services/readFileURL';
import { customFetch } from '../../../../services/tokenApi';
import { s3UploadHandler } from '../../../../services/s3Handler';

import { apiUrl } from '../../../../services/apiUrl';

import { device } from '../../../StyleComponent/responsiveDevice';
import { colors } from '../../../StyleComponent/colors';

import Button from "../../../ReusableElement/Button";

const Account = () => {
    const dispatch = useDispatch();
    const [companyInfo, setCompanyInfo] = useState({
        companyName: "",
        accountResponsible: "",
        contactEmail: "",
        phoneNumber: "",
        address: "",
        cityName: "",
        cityId: "",
        postalCode: "",
        employeeName: "",
        employeeId: "",
        departmentName: "",
        employees: [],
    })
    const [windowWidth, setwindowWidth] = useState(window.innerWidth);
    const [uploadImage, setUploadImage] = useState("");
    const [uploadCSV, setUploadCSV] = useState("");
    const userInfo = useSelector(state => state.user.userInfo);
    const { userType, authId, accessToken } = userInfo;
    const [imageUrl, setImageUrl] = useState("");
    const [logo, setLogo] = useState("");
    const [saveSuccess, setSaveSuccess] = useState(false);


    const addNewEmployee = (e) => {
        e.persist();
        if (companyInfo.employeeName === "" || companyInfo.employeeId === "" || companyInfo.departmentName === "") {
            alert("Please fill in all employee infomation!!");
            return;
        }
        const newEmployees = [
            {
                employeeName: companyInfo.employeeName,
                employeeId: companyInfo.employeeId,
                departmentName: companyInfo.departmentName
            }
        ];

        if (employeesIdValidator(newEmployees)) {
            return alert("Same ID cannot be used more than once.")
        }

        setCompanyInfo((prev) => ({
            ...prev,
            employeeName: "",
            employeeId: "",
            // departmentName: "",
            employees: [
                {
                    employeeName: companyInfo.employeeName,
                    employeeId: companyInfo.employeeId,
                    departmentName: companyInfo.departmentName
                },
                ...prev.employees
            ],
        }));
    };

    const handleOnChange = (e) => {
        e.persist();
        setCompanyInfo((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const departmentUpdate = (value) => {
        setCompanyInfo((prev) => ({
            ...prev,
            departmentName: value,
        }));
    };

    const cityIdUpdate = (value) => {
        setCompanyInfo((prev) => ({
            ...prev,
            cityId: value,
        }));
    };

    const deleteEmployee = (e) => {
        e.persist();
        const employeeId = e.target.id;
        setCompanyInfo((prev) => ({
            ...prev,
            employees: [
                ...prev.employees.filter(em => {
                    return em.employeeId !== employeeId
                })
            ],
        }));
    }

    const displaySizeListener = () => {
        const newWindowWidth = window.innerWidth;
        // console.log(newWindowWidth);
        setwindowWidth(newWindowWidth);
    };

    function csvJSON(csv) {
        // console.log(csv);

        let lines = csv.split("\n");
        let result = [];

        // let headers=lines[0].split(",");

        const headers = ["employeeName", "employeeId", "departmentName"]

        for (let i = 1; i < lines.length; i++) {
            let obj = {};
            let currentline = lines[i].split(",");

            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }
            result.push(obj);
        }

        // console.log(result);

        //return result; //Array
        return result;
    }

    const uploadCSVToList = (e) => {
        e.persist();
        if (uploadCSV) {
            const reader = new FileReader();
            reader.readAsBinaryString(uploadCSV);
            reader.onload = (e) => {
                const newEmployees = csvJSON(e.target.result);

                if (employeesIdValidator(newEmployees)) {
                    setUploadCSV("");
                    return alert("Same ID cannot be used more than once.")
                }

                setCompanyInfo((prev) => ({
                    ...prev,
                    employees: [
                        ...newEmployees,
                        ...prev.employees
                    ],
                }));
                setUploadCSV("");
            }
        } else {
            console.log("Error");
        }
    }

    const employeesIdValidator = (newEmployees) => {
        let findError = false;

        companyInfo.employees.forEach((el_1, i) => {
            newEmployees.forEach((el_2, i) => {
                if (el_1.employeeId == el_2.employeeId) {
                    return findError = true;
                }
            })
        })

        return findError;
    }

    const updateCompanyInfo = async () => {

        // console.log({
        //     companyId: authId,
        //     companyName: companyInfo.companyName,
        //     accountResponsible: companyInfo.accountResponsible,
        //     contactEmail: companyInfo.contactEmail,
        //     phoneNumber: companyInfo.phoneNumber,
        //     address: companyInfo.address,
        //     cityName: companyInfo.cityName,
        //     postalCode: companyInfo.postalCode,
        //     employees: companyInfo.employees,
        // });

        if (
            !companyInfo.companyName ||
            !companyInfo.accountResponsible ||
            !companyInfo.contactEmail ||
            !companyInfo.phoneNumber ||
            !companyInfo.address ||
            !companyInfo.cityName ||
            !companyInfo.postalCode ||
            companyInfo.employees.length === 0
        ) {
            alert("You are missing something");
            return;
        }

        if (uploadImage !== "") {
            try {
                const url = await s3UploadHandler(uploadImage);
                setImageUrl(url);
                setSaveSuccess(true);
            } catch (error) {
                alert("Image Upload failed.")
                setSaveSuccess(false);
            }
        } else {
            setSaveSuccess(true);
        }

        // try {
        //     const resultData = await customFetch(`${apiUrl}/updcompany`,
        //         {
        //             method: "POST",
        //             headers: {
        //                 "Content-Type": "application/json",
        //             },
        //             body: JSON.stringify(
        //                 {
        //                     companyId: authId,
        //                     companyName: companyInfo.companyName,
        //                     accountResponsible: companyInfo.accountResponsible,
        //                     contactEmail: companyInfo.contactEmail,
        //                     phoneNumber: companyInfo.phoneNumber,
        //                     address: companyInfo.address,
        //                     // cityName: companyInfo.cityName,
        //                     cityId: companyInfo.cityId,
        //                     postalCode: companyInfo.postalCode,
        //                     employees: companyInfo.employees,
        //                 }
        //             ),
        //         }).then(response => {
        //             alert("Successfully Uploaded!!!");
        //             // return response.json();
        //             return response.body;
        //         });
        //     // console.log(resultData);
        // } catch (error) {
        //     alert("Error happnes")
        //     console.log(error);
        // }
    }

    useEffect(() => {
        if (saveSuccess === false) {
            return;
        }
        (async () => {
            try {
                await customFetch(`${apiUrl}/updcompany`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(
                            {
                                companyId: authId,
                                companyName: companyInfo.companyName,
                                accountResponsible: companyInfo.accountResponsible,
                                contactEmail: companyInfo.contactEmail,
                                phoneNumber: companyInfo.phoneNumber,
                                address: companyInfo.address,
                                // cityName: companyInfo.cityName,
                                cityId: companyInfo.cityId,
                                postalCode: companyInfo.postalCode,
                                employees: companyInfo.employees,
                                imageFile: imageUrl
                            }
                        ),
                    }).then(response => {
                        setSaveSuccess(false);
                        setImageUrl("");
                        alert("Successfully Updated!!!");
                        // return response.json();
                        return response.body;
                    });
                // console.log(resultData);
            } catch (error) {
                alert("Error happnes")
                console.log(error);
            }
        })()
    }, [saveSuccess])

    // Listen window width ********************************************
    useEffect(() => {
        window.addEventListener("resize", displaySizeListener);

        return () => {
            window.removeEventListener("resize", displaySizeListener);
        };
    }, []);

    useEffect(() => {

        (async () => {
            // Validation TESE Code ====================
            // const companyData = await customFetch(`${apiUrl}/verify`,{
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     }}).then(results => {
            //         console.log(results)
            //         return results;
            //     }).catch(err => {
            //         console.log(err)
            //         throw err;
            //     })

            try {
                const companyData = await customFetch(`${apiUrl}/company?companyId=${authId}`, { method: "GET", })
                    .then(results => {
                        // console.log("results",results)
                        // return results.json(); // returns error
                        return results.body;
                    }).catch(err => {
                        console.log("err", err)
                        throw err;
                    })

                // console.log(companyData);

                let {
                    companyName,
                    accountResponsible,
                    contactEmail,
                    phoneNumber,
                    address,
                    cityName,
                    postalCode,
                    employees,
                    imageFile
                } = companyData;

                if (postalCode == null) {
                    postalCode = "";
                }

                setCompanyInfo((prev) => ({
                    ...prev,
                    companyName,
                    accountResponsible,
                    contactEmail,
                    phoneNumber,
                    address,
                    cityName,
                    postalCode,
                    employees
                }))

                setLogo(imageFile ? imageFile : "")

            } catch (err) {
                console.log("No user data found")
            }
        })();
    }, [authId]);

    useEffect(() => {
        console.log(uploadImage);
    }, [uploadImage])

    return (
        <MaxWidthWrapper>
            <AccountPageContainer>
                <HeaderDiv>
                    <HeaderWrapDiv>
                        {
                            windowWidth < 768 ?
                                <AccountPageHeader>Account</AccountPageHeader> :
                                <AccountPageHeader>Company account</AccountPageHeader>
                        }
                    </HeaderWrapDiv>
                </HeaderDiv>
                <LogoPositionDiv>
                    {
                        windowWidth < 1024 ?
                            <CompanyLogoP>Company Logo</CompanyLogoP>
                            :
                            null
                    }
                    <CompanyLogoContainer>
                        <label>
                            <FileUploadContainer>
                                <img
                                    src={
                                        uploadImage ?
                                            readFileURL(uploadImage)
                                            : logo ?
                                                logo :
                                                dummyImg
                                    }
                                    alt="company logo"
                                    style={{ width: "125px", height: "auto" }} />
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <FAIcons.FaUpload
                                        style={{ margin: ".2rem 0.35rem", fontSize: ".8rem", color: `${colors.darkGrey}` }} />
                                    <FAIcons.FaPencilAlt style={{ margin: ".2rem 0.35rem", fontSize: ".8rem", color: `${colors.darkGrey}` }} />
                                </div>
                            </FileUploadContainer>
                            <InvisibleInput
                                type="file"
                                accept=".jpg,.jpeg,.png"
                                onChange={(e) => {
                                    setUploadImage(e.target.files[0]);
                                    e.target.value = '';
                                }}
                            />
                        </label>
                        <UploadFile
                            type="file"
                            id="fileUpload"
                        // onChange={}
                        />
                    </CompanyLogoContainer>
                </LogoPositionDiv>
                {/* <UploadLogoDiv>
                    <UploadLogoLabel>
                        <img
                            src={
                                uploadImage
                                    ?
                                    readFileURL(uploadImage)
                                    :
                                    dummyImg
                            }
                            alt="logo" />
                        <InvisibleInput
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            onChange={(e) => {
                                setUploadImage(e.target.files[0]);
                                e.target.value = '';
                            }}
                        />
                    </UploadLogoLabel>
                </UploadLogoDiv> */}
                {/* {
                windowWidth >= 767 ?
                    <EmployeeInfoHeader>
                        Employees Information
                </EmployeeInfoHeader>
                    : null
            } */}
                <Form>
                    <div>
                        <InputWithLabel
                            label="Company Name"
                            type="text"
                            name="companyName"
                            required
                            value={companyInfo.companyName}
                            onChange={handleOnChange}
                            inputStyle={{ marginBottom: "1rem" }}
                        />
                        <InputWithLabel
                            label="Name"
                            type="text"
                            name="accountResponsible"
                            required
                            value={companyInfo.accountResponsible}
                            onChange={handleOnChange}
                            inputStyle={{ marginBottom: "1rem" }}
                        />
                        <InputWithLabel
                            label="Email"
                            type="email"
                            name="contactEmail"
                            required
                            value={companyInfo.contactEmail}
                            onChange={handleOnChange}
                            inputStyle={{ marginBottom: "1rem" }}
                        />
                        <InputWithLabel
                            label="Company Address"
                            type="text"
                            name="address"
                            required
                            value={companyInfo.address}
                            onChange={handleOnChange}
                            inputStyle={{ marginBottom: "1rem" }}
                        />
                        <PhoneCityPostalDiv>
                            <InputWithLabel
                                label="Phone Number"
                                type="tel"
                                name="phoneNumber"
                                required
                                value={companyInfo.phoneNumber}
                                onChange={handleOnChange}
                                inputStyle={{ marginBottom: "1rem" }}
                            />
                            <DropdownInputCityName
                                labelText="city"
                                onChange={cityIdUpdate}
                                currentCityName={companyInfo.cityName}
                            />
                            <InputWithLabel
                                label="Postal Code"
                                type="text"
                                name="postalCode"
                                required
                                value={companyInfo.postalCode}
                                onChange={handleOnChange}
                                inputStyle={{ marginBottom: "1rem" }}
                            />
                        </PhoneCityPostalDiv>
                    </div>
                    <EmployeeInformationDiv>
                        <EmployeeInfoHeader>
                            Employees Information
                    </EmployeeInfoHeader>
                        <CSVUploadDiv>
                            <CSVHeaderAndUploadDiv>
                                <UploadCSVHeader>
                                    Upload CSV file
                            </UploadCSVHeader>
                                <DownloadCSVLink href={csv} download="employees_list">
                                    Download CSV format
                                </DownloadCSVLink>
                            </CSVHeaderAndUploadDiv>
                            <UploadCSVDiv>
                                <UploadCSVLabel>
                                    {/* <ChooseFilePElement>
                                    Choose File
                                </ChooseFilePElement> */}
                                    <SelectedFilePElement
                                        uploadCSV={uploadCSV}
                                    >
                                        {
                                            uploadCSV.name ?
                                                uploadCSV.name :
                                                "No File chosen"
                                        }
                                    </SelectedFilePElement>
                                    <InvisibleInput
                                        type="file"
                                        accept=".csv"
                                        onChange={(e) => {
                                            setUploadCSV(e.target.files[0])
                                            e.target.value = ''
                                        }}
                                    />
                                </UploadCSVLabel>
                                {/* <Button
                                text="Upload"
                                onClick={uploadCSVToList}
                                style={
                                {
                                    width: windowWidth < 768 ? "100%" : "30%",
                                    backgroundColor: colors.UIViolet,
                                    padding: ".25rem"
                                }}
                            /> */}
                                <UploadPElement
                                    onClick={uploadCSVToList}
                                >
                                    Upload
                            </UploadPElement>
                            </UploadCSVDiv>
                        </CSVUploadDiv>

                        <InputEmployeesDiv>
                            <InputWithLabel
                                label="Full Name"
                                type="text"
                                name="employeeName"
                                labelStyle={
                                    windowWidth < 768 ?
                                        { width: "100%" }
                                        :
                                        { width: "33%" }
                                }
                                value={companyInfo.employeeName}
                                onChange={handleOnChange}
                            />

                            {
                                windowWidth < 768 ?
                                    <>
                                        <DepartmentWrapper>
                                            <DropdownInput
                                                labelText="Department"
                                                onChange={departmentUpdate}
                                            />
                                        </DepartmentWrapper>
                                        <AddEmployeeMobileDiv>
                                            <InputWithLabel
                                                label="ID"
                                                type="text"
                                                name="employeeId"
                                                labelStyle={
                                                    windowWidth < 768 ?
                                                        { width: "100%" }
                                                        :
                                                        { width: "18%" }
                                                }
                                                value={companyInfo.employeeId}
                                                onChange={handleOnChange}
                                            />
                                            <AddNewEmployeeElement
                                                onClick={addNewEmployee}
                                            >
                                                +
                                    </AddNewEmployeeElement>
                                        </AddEmployeeMobileDiv>
                                    </>
                                    :
                                    <>
                                        <InputWithLabel
                                            label="ID"
                                            type="text"
                                            name="employeeId"
                                            labelStyle={
                                                windowWidth < 768 ?
                                                    { width: "100%" }
                                                    :
                                                    { width: "18%" }
                                            }
                                            value={companyInfo.employeeId}
                                            onChange={handleOnChange}
                                        />
                                        <DropdownInput
                                            labelText="Department"
                                            onChange={departmentUpdate}
                                        />
                                        <AddNewEmployeeElement
                                            onClick={addNewEmployee}
                                        >
                                            +
                                </AddNewEmployeeElement>
                                    </>
                            }
                        </InputEmployeesDiv>

                        {
                            companyInfo.employees.length === 0 ?
                                <EmployeesList>
                                    No employees added
                            </EmployeesList>
                                :
                                <>
                                    <EmployeesListLabel>Employees List</EmployeesListLabel>
                                    <EmployeesList>
                                        {companyInfo.employees.map(employee =>
                                            <EmployeesListItem key={employee.employeeId}>
                                                <span>{employee.employeeName}</span>
                                                <span>{employee.employeeId}</span>
                                                <span>{employee.departmentName}</span>
                                                <DeleteButton
                                                    onClick={deleteEmployee}
                                                    id={employee.employeeId}
                                                >x</DeleteButton>
                                            </EmployeesListItem>
                                        )}
                                    </EmployeesList>
                                </>
                        }
                    </EmployeeInformationDiv>
                    <SaveBtnDiv>
                        {/* <button
                        onClick={e => {
                            e.preventDefault();
                            updateCompanyInfo();
                        }}
                    >Save</button> */}
                        <Button
                            size="med"
                            onClick={e => {
                                e.preventDefault();
                                updateCompanyInfo();
                            }}
                            text="Save"
                            style={
                                {
                                    width: windowWidth < 768 ? "100%" : "50%",
                                    backgroundColor: colors.UIViolet
                                }
                            } />
                    </SaveBtnDiv>
                </Form>
            </AccountPageContainer>
        </MaxWidthWrapper>
    );
};

const MaxWidthWrapper = styled.div`
    width: 100%;
    max-width: 1500px;
    margin: 0 auto;
    position: relative;

`

const AccountPageContainer = styled.div`
    max-width: 550px;
    /* margin: 0 auto; */
    padding: 2rem;
    margin: 0 auto;
    
    color: ${colors.darkGrey};
    @media ${device.laptop} {
        margin: 0;
        margin-left: 0;
        /* margin-left: 5%; */
        max-width: 650px;
    }
    @media ${device.desktopM} {
        max-width: 750px;
    }
    /* @media ${device.desktopL} {
        max-width: 850px;
    } */
`;

const HeaderDiv = styled.div`
    position: relative;
    height: 1.5rem;
    margin-bottom: 1rem;
    @media ${device.tablet} {
        margin-bottom: 3.5rem;
    }
`;

const HeaderWrapDiv = styled.div`
    margin-right: 0;
    margin-left: 0;
    max-width: 100%;
    position: relative;
    border-bottom: solid 2.5px ${colors.darkGrey};
    /* max-width: 300px; */
    margin-top: 3rem;
    margin-bottom: 3rem;

    @media ${device.tablet} {
        max-width: 400px;
    }
`;

const AccountPageHeader = styled.h2`
    /* font-size: 1.25rem; */
    font-weight: bold;
    position: absolute;
    top: -2.25rem;
    background-color: #fff;
    color: ${colors.darkGrey};
    padding-right: 2rem;
    text-transform: uppercase;
    font-family: 'GothamRoundedBold', sans-serif;
    font-size: 28px;
`;

const LogoPositionDiv = styled.div`
    position: inherit;

    @media ${device.laptop} {
        position: absolute;
        right: 3rem;
        margin-bottom: 1rem;
    }
`;

const CompanyLogoP = styled.p`
    margin: 0;
    margin-bottom: .5rem;
    text-align: center
`;

const FileUploadContainer = styled.div`
	width: 125px;
    border: solid 1px ${colors.mediumGrey};
    border-radius: 5px;
    background-color: ${colors.lightGrey};
    margin-bottom: 1.5rem;
    /* display: flex; */
`;

const CompanyLogoContainer = styled.div`
    text-align: right;
    display: flex;
    justify-content: center;


    @media ${device.laptop} {
        display: flex;
        justify-content: flex-end;
    }
    
`;

const UploadFile = styled.input.attrs({ type: 'file' })`
	display: none;
`;

// *****************************
const UploadLogoDiv = styled.div`
    width: 100px;
    height: auto;

    @media ${device.tablet} {
        position: relative;
    }
`;

const UploadLogoLabel = styled.label`
    position: initial;

    @media ${device.tablet} {
        position: absolute;
        top: -1rem;
        cursor: pointer;
    }
`;
// *******************************

const Form = styled.form`
    display: block;
    height: auto;
`;

const PhoneCityPostalDiv = styled.div`
    display: block;

    @media ${device.tablet} {
        display: grid;
        grid-column-gap: .5rem;
        grid-template-columns: 1.5fr 2fr 2fr;
        align-items: flex-end;
    }
`;

const EmployeeInformationDiv = styled.div`
    display: block;
    margin-top: 3rem;

    @media ${device.tablet} {
        display: grid;
    }
`;

const EmployeeInfoHeader = styled.h3`
    text-align: left;
    font-weight: bold;
    font-size: 28px;
    margin: 0;
    margin-bottom: 2rem;
    text-transform: uppercase;
    font-family: 'GothamRoundedBold', sans-serif;
`;

const CSVUploadDiv = styled.div`
    margin-bottom: 2rem;
`;

const CSVHeaderAndUploadDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const UploadCSVHeader = styled.p`
    margin: .5rem 0;
`;

const DownloadCSVLink = styled.a`
    display: inline-block;
    font-weight: lighter;
    font-size: .8rem;
    color: ${colors.primaryViolet}
`;

const UploadCSVDiv = styled.div`
    display: block;

    @media ${device.tablet} {
        display: flex;
    }
`;

const UploadCSVLabel = styled.label`
    display: block;
    width: 100%;

    @media ${device.tablet} {
        display: flex;
        width: 70%;
    }
`;

const InvisibleInput = styled.input`
    display: none;
`;

const ChooseFilePElement = styled.p`
    width: 100%;
    margin-bottom: 1rem;
    text-transform: uppercase;
    font-size: .8rem;
    padding: 0.5rem;
    background-color: #ddd;
    color: grey;
    border: solid 1px #ccc;
    border-radius: 3px;
    text-align: center;
    margin: 0 auto;
    cursor: pointer;
    &:focus {
        outline: none;
        box-shadow: none;
    }

    @media ${device.tablet} {
        width: 40%;
        /* text-transform: uppercase;
        font-size: .8rem;
        padding: 0.5rem;
        background-color: #ddd;
        color: grey;
        border: solid 1px #ccc;
        border-radius: 3px;
        text-align: center;
        margin: 0 auto;
        width: 40%;
        cursor: pointer;
        &:focus {
            outline: none;
            box-shadow: none;
        } */
    }
`;

const SelectedFilePElement = styled.p`
    margin: 0 auto;
    width: 100%;
    margin-bottom: 1rem;
    padding: .75rem 0.5rem;
    color: ${props => props.uploadCSV ? "black" : "#ccc"};
    border: solid 1px #ccc;
    border-radius: 5px;
    width: 100%;
    cursor: pointer;
    box-sizing: border-box;
    height: 46px;

    @media ${device.tablet} {
        margin: 0 .5rem 0 0;
        width: 45%;
        /* padding: 0.5rem;
        color: ${props => props.uploadCSV ? "black" : "#ccc"};
        border: solid 1px #ccc;
        border-radius: 3px;
        margin: 0 .5rem;
        width: 100%;
        cursor: pointer; */
  }
`;

const UploadPElement = styled.p`
    width: 100%;
    height: 46px;
    margin-bottom: 1rem;
    /* text-transform: uppercase; */
    padding: 1.1rem 0.5rem;
    background-color: ${colors.UIViolet};
    color: white;
    font-weight: bold;
    border: solid 1px #ccc;
    border-radius: 5px;
    text-align: center;
    margin: 0;
    cursor: pointer;
    box-sizing: border-box;
    &:active {
        opacity: .5;
    }

    @media ${device.tablet} {
        width: 30%;
    }
`;

const InputEmployeesDiv = styled.div`
    display: block;
    /* display: flex;
    flex-direction: column; */
    
    @media ${device.tablet} {
        display: flex;
        justify-content: space-between;
    }
`;

const DepartmentWrapper = styled.div`
    margin-bottom: 1rem;
    @media ${device.tablet} {
        margin-bottom: 0rem;
    }
`

const AddNewEmployeeElement = styled.div`
    border-radius: 50%;
    font-size: 2rem;
    font-weight: 500;
    color: white;
    padding: .75rem;
    background-color: ${colors.UIViolet};
    cursor: pointer;
    align-self: flex-end;
    margin: .25rem;
    margin-bottom: .75rem;
    margin-left: 2rem;
    height: 1rem;
    width: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    /* align-items: flex-start; */
    &:active {
        opacity: .5;
    }
    @media ${device.tablet} {
        margin-left: .25rem;
    }`;

const AddEmployeeMobileDiv = styled.div`
    display: flex;
`;

const EmployeesListLabel = styled.p`
    margin-bottom: 0
`;

const EmployeesList = styled.ul`
    border: solid 1px #ccc;
    border-radius: 5px;
    padding: 1rem;
    overflow-x: scroll;
    overflow-y: scroll;
    height: 175px;
    margin-top: .75rem;
    ::-webkit-scrollbar{
        width: 10px;
        height: 10px;
    }
    ::-webkit-scrollbar-track{
        /* background: #ddd; */
        border: none;
        /* border: solid 1px #ddd; */
        border-radius: 20px;
    }
    ::-webkit-scrollbar-thumb{
        background: ${colors.white};
        border: solid 1px ${colors.mediumGrey};
        border-radius: 20px;
        box-shadow: none;
        @media ${device.tablet} {
            background: ${colors.UIViolet};
            border: none;
        }
    }
    @media ${device.tablet} {
            overflow-x: hidden;
        }

`;

const EmployeesListItem = styled.li`
    display: grid;
    grid-column-gap: .5rem;
    grid-template-columns: 35% 25% 30% 10%;
    margin-bottom: .75rem;
    min-width: 450px;
`;

const DeleteButton = styled.span`
    &:hover {
        cursor: pointer;
    }
`;

const SaveBtnDiv = styled.div`
    grid-column: span 2;
    justify-self: right;
    margin-top: 2rem;
    @media ${device.laptop} {
        margin-top: 4rem;
    }
`;


export default Account;