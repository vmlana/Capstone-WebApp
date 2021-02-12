import React, { useState } from 'react';

const S3Test = () => {
  const [success, setSuccess] = useState(false);
  const [url, setUrl] = useState("");
  const [uploadInput, setUploadInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  
  const handleChange = (ev) => {
    setSuccess(false);
    setUrl("")    
  }

  // Perform the upload
  const handleUpload = (ev) => {
    setIsUploading(true);

    let file = uploadInput.files[0];
    // Split the filename to get the name and type
    let fileParts = uploadInput.files[0].name.split('.');
    let fileName = fileParts[0];
    let fileType = fileParts[1];
    console.log("Preparing the upload");
    fetch("http://localhost:3000/api/v1/s3storage",
      {
        method: "POST",
        mode: 'cors',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({fileName: fileName, fileType: fileType}),
      }
    ).then(response => {
      return response.json();
    }).then( response => {
      const returnData = response.data.returnData;
      const signedRequest = returnData.signedRequest;
      const url = returnData.url;
      setUrl(url)
      console.log("Recieved a signed request " + signedRequest);
      
      if (fileType === "mp4" || fileType === "mov") {
        fileType = "video/" + fileType;
      }    
      fetch(signedRequest, {
        method: "PUT",
        headers: { "Content-Type": fileType },
        body: file
        })
      // fetch(signedRequest,file,options)
      .then(result => {
        console.log("Response from s3")
        setSuccess(true);
        setIsUploading(false);
      })
      .catch(error => {
        alert("ERROR " + JSON.stringify(error));
        setIsUploading(false);
      })
    })
    .catch(error => {
      alert(JSON.stringify(error));
      setIsUploading(false);
    })
  }

  const Success_message = () => (
    <div style={{padding:50}}>
      <h3 style={{color: 'green'}}>SUCCESSFUL UPLOAD</h3>
      <a href={url}>Access the file here</a>
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
        <input onChange={handleChange} ref={(ref) => { setUploadInput(ref) }} type="file"/>
        <br/>
        <button onClick={handleUpload}>UPLOAD</button>
      </center>
    </div>
  );
}

export default S3Test;