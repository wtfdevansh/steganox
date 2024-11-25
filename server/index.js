const express = require('express');
const multer = require('multer');
const fs = require("fs")
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');
const User = require('./user');

const port = process.env.PORT || 5000; 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, "example.mp4");
    },
});

const upload = multer({ storage });

app.use(bodyParser.json()); 
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect('mongodb://localhost:27017/user', {

}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});



app.post('/register', async(req, res) => {
  const receivedData = req.body;
  console.log(receivedData);
 
      const { Fullname,Email,DOB,Gen,un,ps } = req.body;
      
      const user = new User(req.body);
      try {
        await user.save();
        res.sendStatus(201);

      } catch (error) {
        res.status(400).send(error);
      }
    });
    app.post('/login', async (req, res) => {
      const { username, password } = req.body;
      console.log(username);
      console.log(password);
      try {



        let answer = await User.find({ Fullname: username , ps: password })
        console.log(answer)
  
        if(answer.length != 0){
          console.log("success")
          res.sendStatus(200)
        }else{
         console.log("fail")
         res.sendStatus(404)
        }

      } catch (e) {
          res.send("Something Went Wrong");
      }
    });


app.post('/stillvideoe' , upload.single('video'),  async (req , res)=>{

    const { message, frameNo } = req.body;
    console.log(req.body)
    const videoPath = path.join(__dirname, 'uploads', req.file.filename);
    console.log(req.file)

 
  const form = new FormData();
  form.append('video', (fs.createReadStream(videoPath) || 'NA' )); 
  form.append('message', (message || 'NA'));
  form.append('frameNo', (frameNo ||  'NA'));



  try {

    const flaskResponse = await axios.post('http://localhost:6000/processvideo', form , {responseType: 'stream'}, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
   });

    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Content-Disposition', 'attachment; filename="video.mp4"');


    flaskResponse.data.pipe(res);

    
  } catch (err) {
    console.error('Error sending data to Flask:', err);
    res.status(500).json({ error: 'Failed to process video' });
  }

})

app.post('/stillvideod' , upload.single('video'),  async (req , res)=>{

  const { frameNo } = req.body;

  const videoPath = path.join(__dirname, 'uploads', req.file.filename);



  const form = new FormData();
  form.append('video', (fs.createReadStream(videoPath) || 'NA' )); 
  form.append('frameNo', (frameNo ||  'NA'));


  try{

    const flaskResponse = await axios.post('http://localhost:6000/decryptvideo', form , {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log(flaskResponse.data.message)
    const responseData = { message: flaskResponse.data.message };
    res.json(responseData)
   


  }catch (err){
    console.error('Error sending data to Flask:', err);
    res.status(500).json({ error: 'Failed to process video' });
  }



})





app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});