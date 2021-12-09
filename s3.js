const dotenv = require('dotenv').config();
const fs = require('fs');
const S3 = require('aws-sdk/clients/s3')


const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyID = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new S3({
    region: region,
    accessKeyID: accessKeyID,
    secretAccessKey: secretAccessKey
});
console.log(bucketName)
// upload ke s3
function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    };
    return s3.upload(uploadParams).promise();
}
exports.uploadFile = uploadFile;



//download dari s3

function getFileStream(Key) {
    const downloadParams = {
        Key: Key,
        Bucket: bucketName
    }

    s3.getObject(downloadParams, function(err, data) {
        // Handle any error and exit
        if (err)
            return err;
    
      // No error happened
      // Convert Body from a Buffer to a String
      let objectData = data.Body.toString('utf-8'); // Use the encoding necessary
    });
}
exports.getFileStream = getFileStream







