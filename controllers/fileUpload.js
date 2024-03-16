const File = require('../models/File');

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