const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')

app.use(bodyParser.json());
app.use(cors());

  const connectDB = require('./db');
const { use } = require('express/lib/application')

  dotenv.config({path: './config/config.env'});

  connectDB();

// Routes
app.use('/', require('./routes/index'));

  app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
  })

