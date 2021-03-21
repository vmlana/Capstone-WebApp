import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

// Reusable Component
import Button from "../ReusableElement/Button";
import Image from "../ReusableElement/Image";
import InputWithLabel from '../ReusableElement/InputWithLabel';

// images
// import dummyImg from "../../assets/dummy.jpg";
import contactImage from "../../assets/contact-illustration.png";

// responsive 
import { device } from '../StyleComponent/responsiveDevice';

import { colors } from '../StyleComponent/colors';


const buttonStyle = {
  width: "100%",
  height: "auto",
  fontFamily: 'GothamRoundedLight'
}


const Contact = () => {
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null },
  });

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleServerResponse = (ok, msg) => {
    if (ok) {
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg: msg },
      });
      setInputs({
        name: "",
        email: "",
        message: "",
      });
    } else {
      setStatus({
        info: { error: true, msg: msg },
      });
    }
  };

  const handleOnChange = (e) => {
    e.persist();
    setInputs((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
    setStatus({
      submitted: false,
      submitting: false,
      info: { error: false, msg: null },
    });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    setStatus((prevStatus) => ({ ...prevStatus, submitting: true }));
    axios({
      method: "POST",
      url: "https://formspree.io/f/mnqorlqv",
      data: inputs,
    })
      .then((response) => {
        handleServerResponse(
          true,
          "Thank you, your message has been submitted."
        );
      })
      .catch((error) => {
        handleServerResponse(false, error.response.data.error);
      });
  };
  return (
    <ContactPageContainer>
      <ImageWrapperDiv>
        <Image src={contactImage} alt={"contact"} style={{ display: "flex" }} />
      </ImageWrapperDiv>
      <div>
        <ContactHeader>
          We'd love to hear from you.
        </ContactHeader>
        <ContactP>Our team is ready to answer all your questions.</ContactP>
        <Form onSubmit={handleOnSubmit}>
          {/* <label htmlFor="name" style={{ textAlign: "left" }}>
            Name
          </label>
          <Input
            id="name"
            type="text"
            name="name"
            onChange={handleOnChange}
            required
            value={inputs.name}
          /> */}
          <InputWithLabel
              label="Name"
              type="text"
              name="name"
              value={inputs.name}
              required
              onChange={handleOnChange}
          />
          <InputWithLabel
              label="Email"
              type="email"
              name="_replyto"
              value={inputs.email}
              required
              onChange={handleOnChange}
          />
          {/* <label htmlFor="email" style={{ textAlign: "left" }}>
            Email
          </label>
          <Input
            id="email"
            type="email"
            name="_replyto"
            onChange={handleOnChange}
            required
            value={inputs.email}
          /> */}
          <label htmlFor="message" style={{ textAlign: "left" }}>
            Message
          </label>
          <TextArea
            id="message"
            name="message"
            onChange={handleOnChange}
            required
            value={inputs.message}
            rows="5"
          />
          <Button
            type="submit"
            disabled={status.submitting}
            text={"Submit"}
            style={buttonStyle}
            onClick={()=>{}}
          >
            {!status.submitting
              ? !status.submitted
                ? "Submit"
                : "Submitted"
              : "Submitting..."}
          </Button>
        </Form>
        {status.info.error && (
          <div className="error">Error: {status.info.msg}</div>
        )}
        {!status.info.error && status.info.msg && <p>{status.info.msg}</p>}
      </div>
    </ContactPageContainer>
  );
};

const ContactPageContainer = styled.div`
  height: 100%;
  margin: 3rem auto;
  padding: 0 3rem;
  /* @media ${device.mobileM} {
    padding: 0 2rem;
  } */
  /* @media ${device.mobileL} {
    padding: 0 3rem;
  } */
  @media ${device.laptop} {
    /* margin: 10rem; */
    padding: 0 5rem;
    max-width: 1500px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 5rem;
    align-items: flex-end;
  }
  @media ${device.desktopM} {
    /* margin: 10rem; */
    grid-gap: 10rem;

  }
`;

const ContactHeader = styled.h3`
  font-family: 'GothamRoundedLight', sans-serif;
  text-align: center;
  font-size: 1.5rem;
  padding: 0 1rem;
  color: ${colors.darkGrey};
  text-transform: capitalize;
`;

const ContactP = styled.p`
  font-family: 'GothamRoundedLight', sans-serif;
  text-align: center;
  margin: 2rem 0;
`;

const ImageWrapperDiv = styled.div`
  margin: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-flow: column;
`;

const Input = styled.input`
  bordr: none;
  border: solid 1px #ccc;
  border-radius: 5px;
  margin: 0.3rem 0 2rem;
  height: 30px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  border: none;
  border: solid 1px #ccc;
  border-radius: 5px;
  margin: 0.3rem 0 2rem;
`;

export default Contact;
