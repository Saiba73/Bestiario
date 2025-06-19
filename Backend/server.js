const express = require('express');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 2025;

function checkApiKey(req, res, next){
    const apiKey = req.query.api_key;
    if(!apiKey || apiKey != process.env.API_KEY)
    {
        return res.status(401).json({error: 'No autorizado'})
    }
    next();
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.env.IMAGE_LOCATION)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage });

app.post('/upload', checkApiKey, upload.single('file'), (req, res) => {
    res.status(200).json({ message: 'El archivo se envio con exito' })
});

app.use('/image', checkApiKey, express.static(process.env.IMAGE_LOCATION))

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
});