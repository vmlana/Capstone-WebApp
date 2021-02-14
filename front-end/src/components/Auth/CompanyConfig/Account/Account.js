import React, {useState, useEffect} from 'react';
import styled from "styled-components";

import InputWithLabel from '../../../ReusableElement/InputWithLabel';

import dummyImg from '../../../../assets/dummy.jpg';

import { readFileURL } from '../../../../services/readFileURL';

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
        employeeName: "",
        employeeId: "",
        employeeDepartment: "",
        employees: [],
    })
    const [windowWidth, setwindowWidth] = useState(window.innerWidth);
    const [uploadImage, setUploadImage] = useState("");
    const [uploadCSV, setUploadCSV] = useState("");

    const addNewEmployee = (e) => {
        e.persist();
        if (companyInfo.employeeName === "" || companyInfo.employeeId === "" || companyInfo.employeeDepartment === "") {
            alert("Please fill in all employee infomation!!");
            return;
        }
        const newEmployees = [
            {
                employeeName: companyInfo.employeeName,
                employeeId: companyInfo.employeeId,
                employeeDepartment: companyInfo.employeeDepartment
            }
        ];

        if (employeesIdValidator(newEmployees)){
            return alert("Same ID cannot be used more than once.")
        }

        setCompanyInfo((prev) => ({
            ...prev,
            employeeName: "",
            employeeId: "",
            employeeDepartment: "",
            employees: [
                {
                    employeeName: companyInfo.employeeName,
                    employeeId: companyInfo.employeeId,
                    employeeDepartment: companyInfo.employeeDepartment
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

    const deleteEmployee = (e) => {
        e.persist();
        const employeeId = e.target.id;
        setCompanyInfo((prev) => ({
            ...prev,
            employees: [
                ...prev.employees.filter(em=>{
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
    
    // Listen window width ********************************************
    useEffect(() => {
        window.addEventListener("resize", displaySizeListener);

        return () => {
        window.removeEventListener("resize", displaySizeListener);
        };
    }, []);

    function csvJSON(csv){
        console.log(csv);

        let lines=csv.split("\n");
        let result = [];
      
        // let headers=lines[0].split(",");

        const headers =["employeeName", "employeeId", "employeeDepartment"]
      
        for(let i=1;i<lines.length;i++){
            let obj = {};
            let currentline=lines[i].split(",");
      
            for(let j=0;j<headers.length;j++){
                obj[headers[j]] = currentline[j];
            }
            result.push(obj);
        }

        console.log(result);
        
        //return result; //Array
        return result;
      }

    const uploadCSVToList = (e) => {
        e.persist();
        if(uploadCSV) {
            const reader = new FileReader();
            reader.readAsBinaryString(uploadCSV);
            reader.onload = (e) => {
                const newEmployees = csvJSON(e.target.result);

                if (employeesIdValidator(newEmployees)){
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
            newEmployees.forEach((el_2,i)=>{
                if (el_1.employeeId == el_2.employeeId) {
                    return findError = true;
                }
            })
        })

        return findError;
    }

    return (
        <AccountPageContainer>
            <HeaderDiv>
                <HeaderWrapDiv>
                    <AccountPageHeader>Company account</AccountPageHeader>
                </HeaderWrapDiv>
                <UploadLogoDiv>
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
                            {/* {
                                uploadImage
                                ?
                                null
                                :
                                <small>Upload Logo</small>
                            } */}
                        <InvisibleInput
                            type="file"
                            onChange={(e)=>{
                                setUploadImage(e.target.files[0]);
                                e.target.value = '';
                            }}
                        />
                    </UploadLogoLabel>
                </UploadLogoDiv>
            </HeaderDiv>
            {
                windowWidth >= 767 ?
                <EmployeeInfoHeader>
                    Employees Information
                </EmployeeInfoHeader>
                : null
            }
            <Form>
                <div>
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
                    <PhoneCityPostalDiv>
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
                    </PhoneCityPostalDiv>
                </div>
                {
                    windowWidth >= 767 ?
                    null:
                    <EmployeeInfoHeader>
                        Employees Information
                    </EmployeeInfoHeader>
            }
                <EmployeeInformationDiv>
                    <div>
                        <CSVHeaderAndUploadDiv>
                            <UploadCSVHeader>
                                Upload CSV file
                            </UploadCSVHeader>
                            <DownloadCSVLink href="https://pivotcare-s3.s3-us-west-2.amazonaws.com/others/employees_list" target="_blank">
                                Download CSV format
                            </DownloadCSVLink>
                        </CSVHeaderAndUploadDiv>
                        <UploadCSVDiv>
                            <UploadCSVLabel>
                                <ChooseFilePElement>
                                    Choose File
                                </ChooseFilePElement>
                                <SelectedFilePElement
                                    uploadCSV={uploadCSV}
                                >
                                    {
                                        uploadCSV.name ?
                                        uploadCSV.name:
                                        "No File chosen"
                                    }
                                </SelectedFilePElement>
                                <InvisibleInput
                                    type="file"
                                    accept=".csv"
                                    onChange={(e)=>{
                                        setUploadCSV(e.target.files[0])
                                        e.target.value = ''
                                    }}
                                />
                            </UploadCSVLabel>
                            <UploadPElement
                                onClick={uploadCSVToList}
                            >
                                Upload
                            </UploadPElement>
                        </UploadCSVDiv>
                    </div>
                    <InputEmployeesDiv>
                        <InputWithLabel
                            label="Full Name"
                            type="text"
                            name="employeeName"
                            labelStyle={{width:"33%"}}
                            value={companyInfo.employeeName}
                            onChange={handleOnChange}
                        />
                        <InputWithLabel
                            label="ID"
                            type="text"
                            name="employeeId"
                            labelStyle={{width:"18%"}}
                            value={companyInfo.employeeId}
                            onChange={handleOnChange}
                        />
                        <InputWithLabel
                            label="Department"
                            type="text"
                            name="employeeDepartment"
                            labelStyle={{width:"33%"}}
                            value={companyInfo.employeeDepartment}
                            onChange={handleOnChange}
                        />
                        <AddNewEmployeeElement
                            onClick={addNewEmployee}
                        >
                            +
                        </AddNewEmployeeElement>
                    </InputEmployeesDiv>
                    {
                        companyInfo.employees.length === 0 ?
                        <EmployeesList>
                            No employees added
                        </EmployeesList>
                        :
                        <EmployeesList>
                        {companyInfo.employees.map(employee => 
                            <EmployeesListItem key={employee.employeeId}>
                                <span>{employee.employeeName}</span>
                                <span>{employee.employeeId}</span>
                                <span>{employee.employeeDepartment}</span>
                                <span
                                    onClick={deleteEmployee}
                                    id={employee.employeeId}
                                >x</span>
                            </EmployeesListItem>
                        )}
                    </EmployeesList>
                    }
                </EmployeeInformationDiv>
                <SaveBtnDiv>
                    <button>Save</button>
                </SaveBtnDiv>
            </Form>
        </AccountPageContainer>
    );
};

const mobileBreakPoint = "767px";

const AccountPageContainer = styled.div`
    max-width: 1300px;
    margin: 0 auto;
    padding: 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
`;

const HeaderDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr 65px;
    @media (max-width: ${mobileBreakPoint}) {
        display: block;
    }
`;

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
    /* @media (max-width: ${mobileBreakPoint}) {
        top: -1.75rem;
    } */
`;

const UploadLogoDiv = styled.div`
    position: relative;
    @media (max-width: ${mobileBreakPoint}) {
        width: 100px;
        height: auto;
    }
`;

const UploadLogoLabel = styled.label`
    position: absolute;
    top: -1rem;
    cursor: pointer;
    @media (max-width: ${mobileBreakPoint}) {
        position: initial;
    }
`;

const Form = styled.form`
	display: grid;
	grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
    height: 440px;
    grid-column: span 2;
    @media (max-width: ${mobileBreakPoint}) {
        display: block;
        height: auto;
    }
`;

const PhoneCityPostalDiv = styled.div`
    display: grid;
    grid-column-gap: .5rem;
    grid-template-columns: 1.5fr 2fr 2fr;
    align-items: flex-end;
    @media (max-width: ${mobileBreakPoint}) {
        display: block;
    }
`;

const EmployeeInfoHeader = styled.h3`
    text-align: center;
    font-weight: normal;
    margin: 0;
    @media (max-width: ${mobileBreakPoint}) {
        margin-top: 3rem;
        margin-bottom: 2rem;
    }
`;

const EmployeeInformationDiv = styled.div`
    display: grid;
    flex-direction: column;
    grid-template-rows: 1fr 1fr 3fr;
    @media (max-width: ${mobileBreakPoint}) {
        display: block;
    }
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
    
`;

const UploadCSVDiv = styled.div`
    display: flex;
    @media (max-width: ${mobileBreakPoint}) {
        display: block;
    }
`;

const UploadCSVLabel = styled.label`
    display: flex;
    width: 70%;
    @media (max-width: ${mobileBreakPoint}) {
        display: block;
        width: 100%;
    }
`;

const InvisibleInput = styled.input`
    display: none;
`;

const ChooseFilePElement = styled.p`
  text-transform: uppercase;
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
  }
  @media (max-width: ${mobileBreakPoint}) {
        width: 100%;
        margin-bottom: 1rem;
    }
`;

const SelectedFilePElement = styled.p`
  padding: 0.5rem;
  color: ${props => props.uploadCSV ? "black" : "#ccc" };
  border: solid 1px #ccc;
  border-radius: 3px;
  margin: 0 .5rem;
  width: 100%;
  cursor: pointer;
  @media (max-width: ${mobileBreakPoint}) {
    margin: 0 auto;
    width: 100%;
    margin-bottom: 1rem;
  }
`;

const UploadPElement = styled.p`
    text-transform: uppercase;
    padding: 0.5rem;
    background-color: grey;
    color: white;
    border: solid 1px #ccc;
    border-radius: 3px;
    text-align: center;
    margin: 0;
    width: 30%;
    cursor: pointer;
    &:active {
        opacity: .5;
    }
    @media (max-width: ${mobileBreakPoint}) {
        width: 100%;
        margin-bottom: 1rem;
    }
`;

const InputEmployeesDiv = styled.div`
    display: flex;
    justify-content: space-between;
    @media (max-width: ${mobileBreakPoint}) {
        display: block;
    }
`;

const AddNewEmployeeElement = styled.div`
    border-radius: 50%;
    font-size: 1.5rem;
    color: white;
    padding: .5rem;
    background-color: grey;
    cursor: pointer;
    align-self: flex-end;
    margin: .25rem;
    margin-bottom: .75rem;
    height: 1rem;
    width: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    &:active {
        opacity: .5;
    }
`;

const EmployeesList = styled.ul`
    border: solid 1px #ccc;
    border-radius: 3px;
    padding: .5rem;
    overflow: scroll;
    overflow-y: scroll;
    height: 175px;
    ::-webkit-scrollbar{
        width: 10px;
        height: 10px;
    }
    ::-webkit-scrollbar-track{
        /* background: #ddd; */
        border: none;
        border-radius: 20px;
    }
    ::-webkit-scrollbar-thumb{
        background: #ddd;
        border-radius: 20px;
        box-shadow: none;
    }
`;

const EmployeesListItem = styled.li`
    display: grid;
    grid-column-gap: .5rem;
    grid-template-columns: 35% 20% 35% 10%;
    margin-bottom: .75rem;
    min-width: 450px;
`;

const SaveBtnDiv = styled.div`
    grid-column: span 2;
    justify-self: right;
`;


export default Account;