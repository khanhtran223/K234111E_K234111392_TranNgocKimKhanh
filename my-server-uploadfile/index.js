const express = require('express'); 
const fileUpload = require('express-fileupload'); 
const app = express(); 
const port = 3001; 
const morgan = require("morgan");
const bodyParser = require("body-parser");

app.use(morgan("combined"));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true})); 

// Cấu hình file upload
app.use(
    fileUpload({
        limits: { 
            fileSize: 10000000  // 10MB
        },
        abortOnLimit: true
    })
); 

// Serve static files from public folder
app.use(express.static('public')); 

app.get('/', (req, res) => { 
    res.sendFile('index.html'); 
}); 

const cors=require("cors") 
app.use(cors()) 
app.get("/image/:id",cors(),(req,res)=>{ 
    id=req.params["id"] 
    console.log('upload/'+id) 
    res.sendFile(__dirname+'/upload/'+id); 
}) 

app.post('/upload', (req, res) => { 
    // Get the file that was set to our field named "image" 
    const { image } = req.files; 
    
    // If no image submitted, exit 
    if (!image) return res.sendStatus(400); 
 
    // Move the uploaded image to our upload folder 
    image.mv(__dirname + '/upload/' + image.name); 
     
    // All good 
    res.sendStatus(200); 
}); 
 
app.listen(port, () => { 
    console.log(`Server running on port 3001`);
});