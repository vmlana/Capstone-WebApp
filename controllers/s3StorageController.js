require("dotenv").config();
const aws = require('aws-sdk'); 

// S3 API ********************
// Configure aws with your accessKeyId and your secretAccessKey
aws.config.update({
    region: 'us-west-2',
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey,
    signatureVersion: 'v4'
})

const S3_BUCKET = process.env.Bucket

exports.postS3Storage = (req, res) => {
    const s3 = new aws.S3();  // Create a new instance of S3
    const fileName = req.body.fileName;
    let fileType = req.body.fileType;
    if (fileType === "mp4" || fileType === "mov") {
        fileType = "video/" + fileType;
    }
    // Set up the payload of what we are sending to the S3 api
    const s3Params = {
        Bucket: S3_BUCKET,
        Key: fileName,
        Expires: 500,
        ContentType: fileType,
        ACL: 'public-read'
    };

    // Make a request to the S3 API to get a signed URL which we can use to upload our file
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if(err){
        console.log(err);
        res.json({success: false, error: err})
        }
        // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved. 
        const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
        };

        // Send it all back
        res.json({success:true, data:{returnData}});
    });
};
