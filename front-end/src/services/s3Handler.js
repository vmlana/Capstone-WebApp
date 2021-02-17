exports.s3UploadHandler = async (file, token) => {
    
    // Split the filename to get the name and type
    let fileParts = file.name.split('.');
    let fileName = fileParts[0];
    fileName += new Date().getTime();
    fileName = fileName.split(' ').join('_');
    let fileType = fileParts[1];
    // console.log("Preparing the upload");

    let returnData;
    let signedRequest;
    let url;

    // console.log(fileType);

    await fetch("http://localhost:3000/api/v1/s3storage",
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
      returnData = response.data.returnData;
      signedRequest = returnData.signedRequest;
      url = returnData.url;
    //   console.log("Recieved a signed request " + signedRequest);
    })
    .catch(error => {
      alert(JSON.stringify(error));
    })

    if (fileType === "mp4") {
        fileType = "video/" + fileType;
    }

    return await fetch(signedRequest, {
        method: "PUT",
        headers: { "Content-Type": fileType },
        body: file
    })
    .then(result => {
        // console.log("Response from s3")
        return url;
    })
    .catch(error => {
        alert("ERROR " + JSON.stringify(error));
    })
}

exports.s3UploadHandlerListeningProgress = async (file, token, progressCallback) => {
    const xhr = new XMLHttpRequest();

    // Split the filename to get the name and type
    let fileParts = file.name.split('.');
    let fileName = fileParts[0];
    fileName += new Date().getTime();
    fileName = fileName.split(' ').join('_');
    let fileType = fileParts[1];
    // console.log("Preparing the upload");

    let returnData;
    let signedRequest;
    let url;

    // console.log(fileType);

    try {
        await fetch("http://localhost:3000/api/v1/s3storage",
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
        returnData = response.data.returnData;
        signedRequest = returnData.signedRequest;
        url = returnData.url;
      //   console.log("Recieved a signed request " + signedRequest);
      })
      .catch(error => {
        alert(JSON.stringify(error));
      })
  
      if (fileType === "mp4") {
          fileType = "video/" + fileType;
      }
  
      xhr.onreadystatechange = () => {
          //Call a function when the state changes.
        if(xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText);
        }
    }
  
      if (progressCallback) {
          xhr.upload.onprogress = (e) => {
            if (e.lengthComputable) {
              let percentComplete = (e.loaded / file.size) * 100;
              progressCallback(percentComplete);
            }
          };
        }
    
      xhr.open("PUT", signedRequest);
      xhr.setRequestHeader('Content-type', fileType);
      xhr.send(file)

      return url;

    } catch(err) {
        alert("ERROR " + JSON.stringify(err));
    }
}

exports.s3DeleteHandler = async (filePath, token) => {

    const result = await fetch("http://localhost:3000/api/v1/s3storage",
    {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({filePath}),
    })
    .then(response => {
        return response.json();
    })
    .catch(error => {
        alert(JSON.stringify(error));
    })

    // console.log(result);

    return result;
}