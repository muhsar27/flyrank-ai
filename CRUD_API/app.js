const express = require('express');
const fs = require('fs')
const app = express()

const PORT = 5000;

app.get('/', (req, res) => {
    const page = fs.readFile("index.html")
    fs.
        res.send("Hello world, I'm using express for the first time")
})

app.listen(PORT, () => {
    console.log(`Makima is listening on ${PORT}`)
})