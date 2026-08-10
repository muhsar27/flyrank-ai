const express = require('express');
const path = require('path')
const app = express()
const taskList = 
[{id:1,title:"First Task",done:true}]
const port = 3000;

const swagger = require('swagger-ui-express')

app.get('/', (req, res) => {
  res.json({ 
        name: 'Task API', 
        version: '1.0', 
        endpoints: ['/tasks']
    });
})

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
})

app.get('/tasks', (req, res) => {
    
    res.json(taskList)
})

app.listen(port, () => {
    console.log(`Makima is listening on ${port}`)
})
