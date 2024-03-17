const File = require('../models/File');
const cloudinary = require('cloudinary').v2;

exports.localFileUpload = async (req, res) => {
    try {
        const file = req.files.file;
        // console.log(req);
        console.log("file : ", file);

        let path = __dirname + '/files/' + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("path : ", path);

        file.mv(path, (err) => {
            console.log(err);
        })

        res.status(200).json({
            success: true,
            message: 'Local File uploaded successfully'
        })
    }
    catch (err) {
        console.error(err);
    }
}

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
    const options = { folder };
    if (quality) {
        options.quality = quality;
    }
    options.resource_type = 'auto';
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

//image upload to cloudinary
exports.imageUpload = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log("file : ", file);

        const supportedTypes = ['jpg', 'jpeg', 'png'];
        const fileType = file.name.split('.')[1].toLowerCase();

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'File format not supported'
            })
        }
        const response = await uploadFileToCloudinary(file, 'FileUpload');
        console.log("response : ", response);

        //save entry in db
        const fileData = await File.create({ name, tags, email, imageUrl: response.secure_url });

        res.status(200).json({
            success: true,
            imageUrl: response.secure_url,
            message: 'Image uploaded to cloudinary successfully'
        })
    }
    catch (err) {
        console.error(err);
        console.log(err);
        res.status(400).json({
            success: false,
            message: 'something went wrong'
        })
    }
}

//video upload to cloudinary
exports.videoUpload = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.videoFile;
        console.log("file : ", file);

        const supportedTypes = ['mp4', 'mov'];
        const fileType = file.name.split('.')[1].toLowerCase();

        //add validation for video file size(<5MB) 
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'File format not supported'
            })
        }
        if (file.size > 5000000) {
            return res.status(400).json({
                success: false,
                message: 'File size should be less than 5MB'
            })
        }

        const response = await uploadFileToCloudinary(file, 'FileUpload');
        console.log("response : ", response);

        //save entry in db
        const fileData = await File.create({ name, tags, email, imageUrl: response.secure_url });

        res.status(200).json({
            success: true,
            imageUrl: response.secure_url,
            message: 'Video uploaded to cloudinary successfully'
        })
    }
    catch (err) {
        console.error(err);
        console.log(err);
        res.status(400).json({
            success: false,
            message: 'something went wrong'
        })
    }
}

//image size reduce and upload to cloudinary
exports.imageSizeReduceAndUpload = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log("file : ", file);

        const supportedTypes = ['jpg', 'jpeg', 'png'];
        const fileType = file.name.split('.')[1].toLowerCase();

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'File format not supported'
            })
        }
        const response = await uploadFileToCloudinary(file, 'FileUpload', 50);
        console.log("response : ", response);

        //save entry in db
        const fileData = await File.create({ name, tags, email, imageUrl: response.secure_url });

        res.status(200).json({
            success: true,
            imageUrl: response.secure_url,
            message: 'Image uploaded to cloudinary successfully'
        })
    }
    catch (err) {
        console.error(err);
        console.log(err);
        res.status(400).json({
            success: false,
            message: 'something went wrong'
        })
    }
}
