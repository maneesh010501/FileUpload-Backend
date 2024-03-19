const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

require('dotenv').config();

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    tags: {
        type: String
    },
    email: {
        type: String
    }
})

fileSchema.post('save', async function (doc) {
    try {
        console.log("doc : ", doc);

        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        })

        let info = await transporter.sendMail({
            from: 'Maneesh',
            to: doc.email,
            subject: "New File Uploaded on Cloudinary",
            html: `<h2>Hello</h2> <p>File Uploaded</p> <p>View here : ${doc.imageUrl}</p>`
        })
    }
    catch (err) {
        console.error(err);
        console.log(err);
    }
})

const File = mongoose.model('File', fileSchema);
module.exports = File;