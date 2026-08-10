const express = require('express');
const path = require('path')
const app = express()

const port = 3000;

const swagger = require('swagger-ui-express')

app.get('/', (req, res) => {
    //const page = fs.readFile("index.html")

    res.sendFile((path.join(__dirname, 'index.html')))
})

app.listen(port, () => {
    console.log(`Makima is listening on ${port}`)
})
