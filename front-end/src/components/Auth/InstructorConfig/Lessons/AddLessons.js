import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Dropzone, { defaultClassNames } from "react-dropzone-uploader";
import { s3UploadHandlerListeningProgress } from "../../../../services/s3Handler";
import { getCategories, createLesson } from "../../Api/api";

// Reusable Components
import Button from "../../../ReusableElement/Button";
import InputWithLabel from "../../../ReusableElement/InputWithLabel";

import "react-dropzone-uploader/dist/styles.css";
import "./DragAndDrop.css";

const Layout = ({
  input,
  previews,
  submitButton,
  dropzoneProps,
  files,
  extra: { maxFiles, multiple },
}) => {
  return (
    <div className="previewContainer">
      {files.length == 0 || multiple ? (
        <div {...dropzoneProps}>{files.length < maxFiles && input}</div>
      ) : null}
      <div className="previews">{previews}</div>

      {/* {files.length > 0 && submitButton} */}
    </div>
  );
};

const AddLessons = () => {
  const [categories, setCategories] = useState([]);
  const [lesson, setLesson] = useState({
    action: "add",
    lessonName: "",
    categoryId: "",
    description: "",
    imageFile: "",
    videoFile: "",
    instructorId: 2,
  });

  // File Upload
  const [success, setSuccess] = useState(false);
  const [urls, setUrls] = useState("");
  const [uploadInput, setUploadInput] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadingProgress, setUploadingProgress] = useState(0);

  const handleChange = (ev) => {
    setSuccess(false);
    setUrls("");
  };

  const Success_message = () => (
    <div style={{ padding: 15 }}>
      <h3 style={{ color: "green" }}>SUCCESSFUL UPLOAD</h3>
      <div>
        <a href={urls} target="_blank">
          {urls}
        </a>
      </div>
      <br />
    </div>
  );

  const Uploading_message = () => (
    <div style={{ padding: 15 }}>
      <h3 style={{ color: "red" }}>UPLOADING NOW...</h3>
      {uploadingProgress && isUploading ? (
        <div>
          <h3 style={{ color: "red" }}>{uploadingProgress}%</h3>
          <div
            style={{
              backgroundColor: "#ccc",
              width: "500px",
              height: "2rem",
              textAlign: "center",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                backgroundColor: "red",
                height: "2rem",
                width: (uploadingProgress / 100) * 100 + "%",
              }}
            ></div>
          </div>
        </div>
      ) : null}
      <br />
    </div>
  );
  // File Upload

  const handleOnChange = (e) => {
    setLesson((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("uploadinput", uploadInput);
    const uploadTracker = async (percent, fileName) => {
      // console.log(percent);
      // console.log(fileName);
      setUploadingProgress(Math.floor(percent));
      if (percent === 100) {
        setSuccess(true);
        setUploadInput([]);
        setIsUploading(false);
        setUploadingProgress(0);
      }
    };

    setIsUploading(true);

    try {
      for (let i = 0; i < 1; i++) {
        const dataURL = await s3UploadHandlerListeningProgress(
          uploadInput[i],
          "dummyToken",
          uploadTracker
        );
        console.log(dataURL);
        setUrls(dataURL);
        // console.log(urls);

        setLesson((lesson) => ({
          ...lesson,
          videoFile: dataURL,
        }));
      }
      setSuccess(true);

      // console.log(lesson)
    } catch (err) {
      setSuccess(false);
    }

    createLesson(lesson).then((result) => {
      // console.log(result)
      // return null
      setLesson({
        action: "add",
        lessonName: "",
        categoryId: "",
        description: "",
        imageFile: "",
        videoFile: "",
        instructorId: 2,
      });
    });
  };

  // DropZOne Uploader
  // specify upload params and url for your files
  const getUploadParams = ({ file, meta }) => {
    handleChange();
    // console.log(file);
    if (!file) {
      return;
    }
    setUploadInput((state) => [...state, file]);

    return { url: "https://httpbin.org/post" };
  };

  // called every time a file's `status` changes
  // const handleChangeStatus = ({ meta, file }, status) => { /* console.log(status, meta, file) */ }

  const handleSubmit = (files, allFiles) => {
    console.log(files.map((f) => f.meta));
    allFiles.forEach((f) => f.remove());
  };
  //  DropZoe Uploader

  useEffect(() => {
    getCategories().then((categoryList) => {
      setCategories(categoryList);
    });
  }, []);

  // useEffect(() => {
  //     console.log(lesson)
  // }, [lesson])

  return (
    <PageContainer>
      {success ? <Success_message /> : null}
      {isUploading ? <Uploading_message /> : null}

      <TitleContainer>
        <PageHeader>create lessons</PageHeader>
      </TitleContainer>
      <PageSubHeader>
        Get started by adding Lessons to your list. We will post after reviewing
        the content.
      </PageSubHeader>
      <Form onSubmit={onSubmit}>
        <div>
          <InputWithLabel
            label="lessonName"
            type="text"
            name="lessonName"
            value={lesson.lessonName}
            required
            onChange={handleOnChange}
          />

          <Label>
            <LabelText>Category</LabelText>
            <SelectOption name="categoryId" required onChange={handleOnChange}>
              <option value="">Select Category</option>
              {categories.map((category) => {
                return (
                  <option key={category.categoryId} value={category.categoryId}>
                    {category.name}
                  </option>
                );
              })}
            </SelectOption>
          </Label>

          <Label>
            <LabelText>Lesson description</LabelText>
            <TextArea
              name="description"
              rows="10"
              required
              value={lesson.description}
              onChange={handleOnChange}
              placeholder="Start typing the description"
            />
          </Label>
        </div>
        <div>
          <div>
            <Dropzone
              getUploadParams={getUploadParams}
              // onChangeStatus={handleChangeStatus}
              LayoutComponent={Layout}
              onSubmit={handleSubmit}
              classNames={{ inputLabelWithFiles: defaultClassNames.inputLabel }}
              inputContent="Drag and drop your video here or click in the box."
              accept="video/*"
              maxFiles={1}
              multiple={false}
              submitButtonContent="UPLOAD VIDEO"
            />
          </div>
          <ButtonGroup>
            <Button text="Delete" />
            <Button text="Save" />
          </ButtonGroup>
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
  max-width: 275px;
  margin-bottom: 2rem;
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

const PageSubHeader = styled.h3`
  font-size: 1rem;
  margin: 0;
  padding: 0;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10rem;
  margin-top: 3rem;
  align-items: center;
`;

const Label = styled.label`
  margin: 0.25rem 0;
`;

const LabelText = styled.p`
  font-size: 1rem;
  margin: 0.5rem 0;
  text-align: left;
`;

const TextArea = styled.textarea`
  border: solid 1px #ccc;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
  padding: 0.25rem 0.5rem;
  resize: none;
`;

const SelectOption = styled.select`
  border: solid 1px #ccc;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
  padding: 0.25rem 0.5rem;
  resize: none;
  height: 36px;
  margin-bottom: 0.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export default AddLessons;
