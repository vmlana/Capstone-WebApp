exports.readFileURL = (input) => {
    const fileUrl = URL.createObjectURL(input);
    // console.log(fileUrl);
    return fileUrl;
}