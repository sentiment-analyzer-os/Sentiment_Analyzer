const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const db = require('./pg');
const bodyParser = require('body-parser')

const dataController = require('./controllers/data-controller');

// Parse application/json
app.use(bodyParser.json())

// Default endpoint GET request.  Serves html.
app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname,'../client/index.html'))
})

// Default endpoint POST request.  Performs search and returns result.
app.post('/', /*dataController.query,*/ (request, response) => {

  // MOCK DATA.  FOR TESTING PURPOSES ONLY.
  const mockData = {
    'labels': [],
    'values': []
  }
  response.locals.result = mockData;

  // Send success status code and JSON'd data stored in res.locals.result.
  response.status(200).json(response.locals.result);
});

// Global error handler.
app.use((request, response, error, next) => response.send(error) );

// Listen on...
app.listen(3000);
 