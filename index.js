const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const dotenv = require('dotenv')

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.send('Work Hrs tracker app')
})

app.post('/post', (req, res) => {
  console.log(req.body)
})

app.post('/employee',(req,res) => {
    employeeCollection.insertOne(req.body)
    .then(result => {
      console.log(result)
    })
    .catch(error => console.error(error));
  })

  const connectDB = require('./db');

  dotenv.config({path: './config/config.env'});

  connectDB();

  app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
  })

