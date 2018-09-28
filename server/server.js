const express = require('express');
const multer = require('multer');
const cors = require('cors');
const cloudinary = require('cloudinary');


cloudinary.config({ 
    cloud_name: 'dnn8pa36f', 
    api_key: '914688732981787', 
    api_secret: 'AxLHiXGmnQeThtz_cKn5VY1iOzA' 
});
  


const app = express();

app.use(cors());

/**
 ... express.js boilerplate
 routes, middlewares, helpers, loggers, etc
**/

// configuring Multer to use files directory for storing files
// this is important because later we'll need to access file path
const storage = multer.diskStorage({
  destination: './files',
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// express route where we receive files from the client
// passing multer middleware
app.post('/files', upload.single('file'), (req, res) => {
 const file = req.file; // file passed from client
 const meta = req.body; // all other values passed from the client, like name, etc..
 
 cloudinary.v2.uploader.upload(`./files/${file.originalname}`, 
    function(error, result) {    
        console.log(result, error);
        res.send({
            url: result.url
        })
    
    });

});

const port = process.env.PORT || 4000;
app.set('port', port);
app.listen(port, () => console.log('server started'));