import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useHistory, Link } from 'react-router-dom';

// Reusable Component
import Button from "../ReusableElement/Button";
import Image from "../ReusableElement/Image";
import InputWithLabel from '../ReusableElement/InputWithLabel';

// images
// import dummyImg from "../../assets/dummy.jpg";
import contactImage from "../../assets/contact-illustration.png";
import backImage from "../../assets/bottom-of-page.png";

// responsive 
import { device } from '../StyleComponent/responsiveDevice';

import { colors } from '../StyleComponent/colors';


const buttonStyle = {
  width: "100%",
  height: "auto",
  fontFamily: 'GothamRoundedLight'
}

const buttonStyleLaptop = {
  width: "50%",
  height: "auto",
  padding: "1rem",
  fontFamily: 'GothamRoundedMedium'
}

const buttonBackToHome = {
  width: "220px",
  height: "auto",
  fontSize: "18px",
  padding: ".75rem"
}


const Contact = () => {
  const history = useHistory();
  // const [status, setStatus] = useState({
  //   submitted: true,
  //   submitting: false,
  //   info: { error: false, msg: "We will answer you as soon as possible." },
  // });
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

  const [windowWidth, setwindowWidth] = useState(window.innerWidth);

  const displaySizeListener = () => {
    const newWindowWidth = window.innerWidth;
    // console.log(newWindowWidth);
    setwindowWidth(newWindowWidth);
  };


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
      [e.target.name === "_replyto" ? "email" : e.target.name]: e.target.value,
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
          "We will answer you as soon as possible."
        );
      })
      .catch((error) => {
        handleServerResponse(false, error.response.data.error);
      });
  };

  useEffect(() => {
    window.addEventListener("resize", displaySizeListener);

    return () => {
        window.removeEventListener("resize", displaySizeListener);
    };
  }, []);

  return (
    <BackImageWrapperDiv>
    <ContactPageContainer>
      <ImageWrapperDiv>
        <Image src={contactImage} alt={"contact"} style={{ display: "flex" }} />
      </ImageWrapperDiv>
        {
          !status.info.error && !status.info.msg ?
          <FormDiv>
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
                  label="Name *"
                  type="text"
                  name="name"
                  value={inputs.name}
                  required
                  onChange={handleOnChange}
                  labelTextStyle={{margin: 0}}
              />
              <InputWithLabel
                  label="Email *"
                  type="email"
                  name="_replyto"
                  value={inputs.email}
                  required
                  onChange={handleOnChange}
                  labelTextStyle={{margin: 0}}
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
              <MessageLabel>
                <LabelText>Message *</LabelText>
                <TextArea
                  name="message"
                  onChange={handleOnChange}
                  required
                  value={inputs.message}
                  rows="5"
                />
              </MessageLabel>
              <Button
                type="submit"
                disabled={status.submitting}
                text={"Submit"}
                style={
                  windowWidth < 1024 ? buttonStyle : buttonStyleLaptop}
                onClick={()=>{}}
              >
                {!status.submitting
                  ? !status.submitted
                    ? "Submit"
                    : "Submitted"
                  : "Submitting..."}
              </Button>
            </Form>
          </FormDiv>
          :null
        }
        {status.info.error && (
          <div className="error">Error: {status.info.msg}</div>
        )}
        {!status.info.error && status.info.msg ?
        (
          <ThankYouMessageDiv>
            <ContactHeader style={{textTransform: "uppercase"}}>Thank you</ContactHeader>
            <ThankYouMessageP>{status.info.msg}</ThankYouMessageP>
            <Link to="/">
              <Button
                  text={"Back To Home"}
                  style={buttonBackToHome}
                  onClick={()=>{}}
                >
              </Button>
            </Link>
          </ThankYouMessageDiv>
        )
        : null
        }
    </ContactPageContainer>
    </BackImageWrapperDiv>
  );
};

const BackImageWrapperDiv = styled.div`
  @media ${device.laptop} {
    background-image: url(${backImage});
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center bottom;
  }
`;

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
    margin: 7rem 0 10rem;
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
  @media ${device.laptop} {
    font-family: 'GothamRoundedMedium', sans-serif;
    text-align: left;
    padding: 0;
    margin: 0;
  }
`;

const ContactP = styled.p`
  font-family: 'GothamRoundedLight', sans-serif;
  color: ${colors.darkGrey};
  text-align: center;
  margin: 2rem 0;
  line-height: 1.5;
  @media ${device.laptop} {
    text-align: left;
    margin-top: 0;
  }
`;

const ImageWrapperDiv = styled.div`
  margin: 2rem;
  text-align: center;
  @media ${device.laptop} {
    margin: 0;
  }
`;

const FormDiv = styled.div`
  @media ${device.laptop} {
    align-self: center;
    /* justify-self: flex-end */
  }
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

const MessageLabel = styled.label`
  margin: 0rem 0rem 0.25rem 0;
  font-size: 18px;
	line-height: 30px;
	color: #707070;
`;

const LabelText = styled.p`
  font-size: 1rem;
  margin: 0;
  text-align: left;
`;

const TextArea = styled.textarea`
  border: none;
  border: solid 1px #ccc;
  border-radius: 5px;
  margin: 0.3rem 0 2rem;
  width: 100%;
  padding: 1rem;
  box-sizing:  border-box;
`;

const ThankYouMessageDiv = styled.div`
  margin: 5rem;
  text-align: center;
  @media ${device.laptop} {
    text-align: left;
    margin: 0;
    margin-left: 5rem;
    align-self: center;
    justify-self: flex-end;
  }
`

const ThankYouMessageP = styled.p`
  font-family: 'GothamRoundedLight', sans-serif;
  color: ${colors.darkGrey};
  margin: 1.5rem 0 2rem;
`;

export default Contact;
