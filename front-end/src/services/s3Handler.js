exports.s3UploadHandler = async (file) => {
    
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

    if (fileType === "mp4" || fileType === "mov") {
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

exports.s3DeleteHandler = async (filePath) => {

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

    console.log(result);

    return result;
}