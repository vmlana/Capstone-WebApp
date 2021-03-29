import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import styled from "styled-components";
import Dropzone, { defaultClassNames } from 'react-dropzone-uploader'
import { s3UploadHandlerListeningProgress } from '../../../../services/s3Handler';
import { getCategories, createLesson } from '../../Api/api'
import { useHistory } from "react-router-dom";
import FileUploadThumbnail from 'file-upload-thumbnail'

// Reusable Components
import Button from '../../../ReusableElement/Button';
import InputWithLabel from '../../../ReusableElement/InputWithLabel';

import { device } from '../../../StyleComponent/responsiveDevice';

import 'react-dropzone-uploader/dist/styles.css'
import './DragAndDrop.css';
import Image from '../../../ReusableElement/Image';

const Layout = ({ input, previews, submitButton, dropzoneProps, files, extra: { maxFiles, multiple } }) => {
    return (
        <div className="previewContainer">
            {(files.length == 0 || multiple) ? (
                <div {...dropzoneProps}>
                    {files.length < maxFiles && input}
                </div>) : null
            }
            <div className="previews">{previews}</div>

            {/* {files.length > 0 && submitButton} */}
        </div>
    )
}

const EditLesson = (props) => {
    // To access parameters paased: instructorId and lessonId
    const instructorId = props.match.params.instructorId
    const lessonId = props.match.params.lessonId

    // Lesson Data passed with history.push
    const lessonData = props.location.state.DataContent

    const history = useHistory();
    const dispatch = useDispatch();

    const userInfo = useSelector(state => state.user.userInfo);
    const { userType, authId, token } = userInfo;

    const [categories, setCategories] = useState([]);
    const [lesson, setLesson] = useState({
        action: 'edit',
        lessonName: lessonData.lessonName,
        categoryId: lessonData.categoryId,
        description: lessonData.description,
        imageFile: lessonData.imageFile,
        videoFile: lessonData.videoFile,
        videoDuration: 0,
        instructorId: lessonData.instructorId
    });

    // File Upload
    const [btnActive, setBtnActive] = useState(false);
    const [success, setSuccess] = useState(false);
    const [urls, setUrls] = useState('');
    const [uploadInput, setUploadInput] = useState([]);
    const [imageFileInput, setImageFile] = useState('')
    const [isUploading, setIsUploading] = useState(false);
    const [uploadingProgress, setUploadingProgress] = useState(0);

    function dataURItoBlob(dataURI) {
        var mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var binary = atob(dataURI.split(',')[1]);
        var array = [];
        for (var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }

        var toFile = new File([new Uint8Array(array)], lesson.instructorId + '.png', { type: mime, lastModifiedDate: Date.now() });
        return toFile;
    }

    const handleChange = (ev) => {
        setSuccess(false);
        setUrls('')
    }

    const Success_message = () => (
        <div style={{ padding: 15 }}>
            <h3 style={{ color: 'green' }}>SUCCESSFUL UPLOAD</h3>
            {/* <div><a href={urls} target="_blank">{urls}</a></div> */}
            <br />
        </div>
    )

    const Uploading_message = () => (
        <div style={{ padding: 15 }}>
            <h3 style={{ color: 'red' }}>UPLOADING NOW...</h3>
            {uploadingProgress && isUploading ?
                (
                    <div>
                        <h3 style={{ color: 'red' }}>{uploadingProgress}%</h3>
                        <div style={{ backgroundColor: '#ccc', width: "500px", height: "2rem", textAlign: "center", margin: "0 auto" }}>
                            <div style={
                                {
                                    backgroundColor: 'red',
                                    height: "2rem",
                                    width: uploadingProgress / 100 * 100 + '%'
                                }
                            }></div>
                        </div>
                    </div>
                )
                :
                null
            }
            <br />
        </div>
    )
    // File Upload

    const handleOnChange = (e) => {
        setLesson((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        return null;
        e.preventDefault();
        const uploadTracker = async (percent, fileName) => {
            setUploadingProgress(Math.floor(percent));
            if (percent === 100) {
                setSuccess(true);
                setUploadInput([]);
                setImageFile('')
                setIsUploading(false);
                setUploadingProgress(0);
            }
        }

        setIsUploading(true);

        try {
            for (let i = 0; i < 1; i++) {
                const dataURL = await s3UploadHandlerListeningProgress(uploadInput[i], "dummyToken", uploadTracker);
                setUrls(dataURL);
                setLesson(lesson => ({
                    ...lesson,
                    videoFile: dataURL
                }));

                const imageURL = await s3UploadHandlerListeningProgress(imageFileInput, "dummyToken", uploadTracker);
                setLesson(lesson => ({
                    ...lesson,
                    imageFile: imageURL
                }));
            }
            setSuccess(true);
            // console.log(lesson)
        } catch (err) {
            setSuccess(false);
        }
    }

    // DropZone Uploader
    // specify upload params and url for your files
    const getUploadParams = ({ file, meta }) => {
        handleChange();

        if (!file) {
            return;
        }
        setUploadInput(state => [...state, file]);
        setLesson(lesson => ({
            ...lesson,
            videoDuration: meta.duration
        }));

        return { url: 'https://httpbin.org/post' }
    }

    // called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file }, status) => {
        // console.log(status, meta, file)
        if (status == 'removed') {
            setUploadInput([])
            setImageFile('')
        }

        if (status == 'preparing') {
            new FileUploadThumbnail({
                maxWidth: 1024,
                maxHeight: 768,
                file: file,
                onSuccess: function (src) {
                    // console.log('src', src)
                    var fileObject = dataURItoBlob(src);
                    // console.log('fileObject', fileObject)
                    setImageFile(fileObject);
                }
            }).createThumbnailFromVideoFile();
        }
    }

    const handleSubmit = (files, allFiles) => {
        // console.log(files.map(f => f.meta))
        allFiles.forEach(f => f.remove())
    }
    //  DropZoe Uploader

    useEffect(() => {
        getCategories().then(
            categoryList => {
                setCategories(categoryList)
            }
        )
    }, [])

    useEffect(() => {
        // console.log('input', imageFileInput);
        // console.log(imageFileInput.name);

        if (imageFileInput.name != undefined && imageFileInput != '') {
            setBtnActive(true)
        } else {
            setBtnActive(false)
        }
    }, [imageFileInput])

    useEffect(() => {
        if (success === true) {
            createLesson(lesson).then(
                result => {
                    // console.log(result)

                    setLesson({
                        action: 'add',
                        lessonName: '',
                        categoryId: '',
                        description: '',
                        imageFile: '',
                        videoFile: '',
                        videoDuration: 0,
                        instructorId: authId
                    })

                    // history.go(0)

                }
            )
        }

    }, [success])

    return (
        <PageContainer>
            {success ? <Success_message /> : null}
            {isUploading ? <Uploading_message /> : null}

            <TitleContainer>
                <PageHeader>Edit Lesson</PageHeader>
            </TitleContainer>
            <PageSubHeader>Edit content of your lesson or delete lesson.</PageSubHeader>
            <Form onSubmit={onSubmit}>
                <div>
                    <InputWithLabel
                        label="Lesson Name"
                        type="text"
                        name="lessonName"
                        value={lesson.lessonName}
                        required
                        onChange={handleOnChange}
                    />

                    <Label>
                        <LabelText>Category</LabelText>
                        <SelectOption
                            name="categoryId"
                            required
                            onChange={handleOnChange}
                            value={lesson.categoryId}
                        >
                            <option value="">Select Category</option>
                            {
                                categories.map((category) => {
                                    return <option key={category.categoryId} value={category.categoryId} >{category.name}</option>
                                })
                            }
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
                            placeholder="Start typing the description for your video"
                        />
                    </Label>
                </div>
                <div>
                    <div className='dropzoneImg'>
                        {/* <Dropzone
                            getUploadParams={getUploadParams}
                            onChangeStatus={handleChangeStatus}
                            LayoutComponent={Layout}
                            onSubmit={handleSubmit}
                            classNames={{ inputLabelWithFiles: defaultClassNames.inputLabel }}
                            inputContent="Drag and drop your video here or click in the box."
                            accept="video/*"
                            maxFiles={1}
                            multiple={false}
                            submitButtonContent="UPLOAD VIDEO"
                        /> */}

                        <img src={lesson.imageFile} alt={lesson.lessonName} />
                    </div>

                </div>
                <ButtonGroup>
                    <Button text="Update" type="update_lesson" />
                    <button text="Delete" className="deleteBtn">Delete</button>
                </ButtonGroup>
            </Form>
        </PageContainer>
    )
}

const PageContainer = styled.div`
    max-width: 1500px;
    margin: 0 auto;
    padding: 2rem;
    padding-bottom: 2rem;
    padding-top: 4.5rem;
    color:#707070;
    font-family: 'GothamRoundedNormal', sans-serif;
`;

const TitleContainer = styled.div`
    position: relative;
    border-bottom: solid 2px #707070;
    margin-bottom: 1rem;

	@media ${device.mobileP} {
		max-width: 400px;
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
	font-family: GothamRoundedBold, sans-serif;
	font-weight: 900;
	color: #707070;
`;

const PageSubHeader = styled.h3`
    font-size: 18px;
    line-height: 30px;
    font-family: 'Gotham', sans-serif;
    font-weight: 300;
    margin: 0;
    padding: 0;
    padding-top: 16px;
`;

const Form = styled.form`
	display: grid;
	grid-gap: 2rem;
    margin-top: 3rem;
    align-items: center;

    @media ${device.laptop} {
		grid-template-columns: repeat(2, 1fr);
        grid-gap: 4rem;
        align-items: center;
	}

    .dropzoneImg {
        text-align: center;

        img {
            max-width:346px;
            height:346px;
            object-fit: cover;
        }
    }
`;

const Label = styled.label`
    margin: .25rem 0;
`;

const LabelText = styled.p`
    font-size: 1rem;
    margin: .5rem 0;
    text-align: left;
    margin-top: 2rem;
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

const SelectOption = styled.select`
	border: solid 1px #ccc;
	border-radius: 5px;
	font-size: 18px;
	line-height: 30px;
	width: 100%;
	padding: .25rem 0.5rem;
	resize: none;
    height: 46px;
    margin-bottom: 0.5rem;
    color: #333333;

    :focus {
        outline: #7662a5 auto 1px;
    }
`;

const ButtonGroup = styled.div`
    margin-bottom: 2rem;
    display: grid;
    grid-gap: 2rem;
    justify-content: center;

    @media ${device.tablet} {
		grid-template-columns: 1fr 1fr;
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

    .deleteBtn {
        color: #707070;
        font-size: 24px;
        line-height: 28px;
        font-family: 'GothamRoundedLight';
        outline: none;
        box-shadow: none;
        border:none;
        background-color: unset;
        display: inline-block;
        width: fit-content;
        text-decoration: underline;
        text-transform: capitalize;
        margin: 0 auto;

        @media ${device.tablet} {
            font-size: 20px;
            line-height: 24px;
            background-color: #FFFFFF;
            border: 4px solid #FBA76E;
            border-radius: 5px;
            width: 300px;
            height: 70px;
            text-decoration: none;

            &:focus {
                outline: none;
                box-shadow: none;
            }
        }
    }
`;

export default EditLesson
