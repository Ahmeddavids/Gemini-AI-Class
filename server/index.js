require('dotenv').config();
const express = require('express');
const PORT = 4040;
const cors = require('cors');
const app = express();


app.listen(PORT, () => {
    console.log(`App is listening to PORT: ${PORT}`)
})
