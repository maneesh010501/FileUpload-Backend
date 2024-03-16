const express = require('express');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 4000;

app.use(express.json());

const fileUpload = require('express-fileupload');
app.use(fileUpload());

const dbConnect = require('./config/database');
dbConnect();

const cloudinaryConnect = require('./config/cloudinary');
cloudinaryConnect();

const Upload = require('./routes/FileUpload');
app.use('/api/v1/upload', Upload);

app.listen(PORT, () => {
    console.log(`app started at port ${PORT}`);
})