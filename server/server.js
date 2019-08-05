const express = require('express');
const app = express();
const path = require('path');
// require('dotenv').config(); // included for future deployment -- not used in the current version
const db = require('./pg');
const bodyParser = require('body-parser')

const dataController = require('./data-controller');

// Parse application/json
app.use(bodyParser.json())

// Default endpoint GET request.  Serves html.
app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname,'../client/index.html'))
})

// Default endpoint POST request.  Performs search and returns result.
app.post('/', dataController.searchCache, dataController.processSentiment, dataController.updateCache, (request, response) => {
  // Send success status code and JSON'd data stored in res.locals.result.
  response.status(200).json(response.locals.result);
});




// app.post('/', (request, response) => {

//   // MOCK DATA.  FOR TESTING PURPOSES ONLY.

//   const mockData = {
//     'labels': Array.apply(null, Array(120)).map(() => "{Month} {Year}"),
//     'values': Array.apply(null, Array(120)).map(() => -10 + Math.random()*20),
//   }
//   response.locals.result = mockData;


//   // Send success status code and JSON'd data stored in res.locals.result.
//   response.status(200).json(response.locals.result);
// });


// Global error handler.
app.use((error, request, response, next) => response.status(500).send(error));

// Listen on...
app.listen(3000);
