const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const express = require('express');
const PORT = 4040;
const cors = require('cors');
const app = express();
const fs = require('fs');
const multer = require('multer');
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.use(express.json());
app.use(cors('*'))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage }).single('file');

app.post('/upload', (req, res) => {
    try {
        upload(req, res, (err) => {
            if (err) {
                return res.status(500).json(err)
            }
            filePath = req.file.path
            res.status(200).json({ message: "Uploaded successfully" })
        })
    } catch (error) {
        res.send(500).json({ err: 'Something went wrong' });
        console.error(error)
    }
})

app.post('/gemini', async (req, res) => {
    try {
        function fileToGenerativePart(path, mimeType) {
            return {
                inlineData: {
                    data: Buffer.from(fs.readFileSync(path)).toString('base64'), mimeType
                }
            }
        }
        const prompt = req.body.message
        const result = await model.generateContent([prompt, fileToGenerativePart(filePath, "image/jpeg")]);
        const text = result.response.text();
        res.send(text)
    } catch (err) {
        console.error(err)
    }
})

app.post("/gemini/text", async (req, res) => {
    try {
        const result = await model.generateContentStream(req.body.message);

        // Set headers for a chunked response
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Transfer-Encoding', 'chunked');

        // Stream chunks to the client as they come in
        for await (const chunk of result.stream) {
            const chunkText = chunk.text();

            // Print text to the console and stream to the client
            // process.stdout.write(chunkText);
            res.write(chunkText);
        }

        // End the response when streaming is finished
        res.end();
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred: ' + err.message);
    }
});


app.listen(PORT, () => {
    console.log(`App is listening to PORT: ${PORT}`)
})
