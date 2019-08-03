const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const db = require('./pg');
const fetch = require('node-fetch');
const scraperRouter = require('./scraper.js');


app.use('/scraper', scraperRouter);

app.get('/',(req,res)=> {
  res.sendFile(path.join(__dirname,'../client/index.html'))
})





app.listen(3000);