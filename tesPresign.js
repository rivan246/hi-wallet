const S3 = require('aws-sdk/clients/s3')

const dotenv = require('dotenv').config();


//konfigurasi S3
const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyID = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY


//key = nama file di bucketnya
//expire = lama linknya bisa di akses
const key = '6a4ad7d7c1363dffdd92df763bb1d330'
const signedUrlExpireSeconds = 60



const s3 = new S3({
    region: region,
    accessKeyID: accessKeyID,
    secretAccessKey: secretAccessKey
});


const url = s3.getSignedUrl('getObject', {
    Bucket: bucketName,
    Key: key,
    Expires: signedUrlExpireSeconds
})

console.log(url)
