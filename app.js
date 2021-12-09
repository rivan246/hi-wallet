const express = require('express')
const ejs = require('ejs');
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const multer = require('multer')
const upload = multer({ dest: './public/uploads' })

const { uploadFile, getFileStream } = require('./s3');


const app = express()

app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('index'));


//upload file
app.post('/upload', upload.single('myImage'), async (req, res) => {
  const file = req.file
  console.log(file)

  const result = await uploadFile(file)
  await unlinkFile(file.path);
  console.log(result)
  const description = req.body.description
  res.send({imagePath: `/down/${result.key}`});
  
})

//download file
app.get('/down',async (req,res)=>{
    
    key = '6a4ad7d7c1363dffdd92df763bb1d330';
    const readStream = getFileStream(key);
    
})



app.listen(3000, () => console.log('Server Started at port 3000'));