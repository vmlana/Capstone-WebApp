import React, { useState } from 'react';
import { s3UploadHandler } from '../../services/s3Handler';

import styled from "styled-components";

const S3Test = () => {
  const [success, setSuccess] = useState(false);
  const [urls, setUrls] = useState([]);
  const [uploadInput, setUploadInput] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  
  const handleChange = (ev) => {
    setSuccess(false);
    setUrls([])    
  }

  const handleUpload = async (ev) => {
    setIsUploading(true);
    console.log(uploadInput);
    try {
        for(let i = 0; i < uploadInput.length; i++) {
            const dataURL = await s3UploadHandler(ev, uploadInput[i]);
            console.log(dataURL);
            setUrls(state => [...state, dataURL])
        }
        setSuccess(true);
    } catch(err) {
        setSuccess(false);
    }
    setUploadInput([]);
    setIsUploading(false);
  };

  const Success_message = () => (
    <div style={{padding:50}}>
      <h3 style={{color: 'green'}}>SUCCESSFUL UPLOAD</h3>
      {urls.map(url=>
        (<div key={url}><a href={url}>{url}</a></div>)
      )}
      <br/>
    </div>
  )

  const Uploading_message = () => (
    <div style={{padding:50}}>
      <h3 style={{color: 'red'}}>UPLOADING NOW...</h3>
      <br/>
    </div>
  )

  return (
    <div className="App">
      <center>
        <h1>UPLOAD A FILE</h1>
        {success ? <Success_message/> : null}
        {isUploading ? <Uploading_message/> : null}
        <ChooseLabel>
            <UploadInput 
                onChange={ (ev) => {
                    handleChange();
                    console.log(ev.target.files[0]);
                    setUploadInput(
                        state => [...state, ev.target.files[0]])
                }}
                type="file"
            />
            Choose files
        </ChooseLabel>
        <br/>
        <div>
            {
                uploadInput.length === 0
                ?
                <p>No file is selected.</p>
                :
                <ul>
                {uploadInput.map(file=>{
                    return (<li key={file.name}>{file.name}</li>)
                })}
            </ul>
            }
        </div>
        <button onClick={handleUpload}>UPLOAD</button>
      </center>
    </div>
  );
}

const UploadInput = styled.input`
    display: none;
`;

const ChooseLabel = styled.label`
    display: block;
    width: 200px;
    border: 1px solid black;
    margin: 2rem;
    padding: 1rem;
    cursor: pointer;
    &:hover {
        background-color: black;
        color: white
    }
`;

export default S3Test;