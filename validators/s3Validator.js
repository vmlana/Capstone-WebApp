const { check } = require('express-validator'); 

const validateFileType = value => {
    if (
        value === "jpg" ||
        value === "jpeg" ||
        value === "png" ||
        value === "mp4"
    ) {
        return true;
    } else {
        return false;
    }
}

exports.s3FileTypeValidator = [
    // express-validator middleware
    check('fileType')
    .custom(validateFileType)
    .withMessage('Please only submit valid file format.'),
];