const Sentiment = require('sentiment');
const db = require('./pg');

/**
 * Query - Middleware that searches cache first for processed results. 
 *         If not in cache, performs analysis. Sticks results on response.locals.
 * @param {*} request 
 * @param {*} response 
 * @param {*} next 
 */
const queryDB = (request, response, next) => {

  // Extract the query string from the request object.
  let queryString = request.body.queryString;

  // Clean the query string.
  queryString = queryString.trim();

  // Build query
  const cacheQuery = {
    name: 'cache-query',
    text: 'SELECT $1 FROM $2 WHERE $3 IS $4;',
    values: ['*', 'cached_results', 'query_string', queryString],
  }

  // Execute Query.
  db.query(cacheQuery, (err, result) => {
    // Handle error.
    if (err) next(err);
    
    // If results are not null, we have a cached result.
    if (result.length) {
      // Stick it on res.locals.
      response.locals.result = {
        'labels': result[0].labels,
        'data': result[0].data 
      };
      // Pass control.
      return next();
    };

    // If results are null, we need to execute db search and processing.
    response.locals.result = processSentiment(queryString);

    // Pass control.
    next();
  })
}

/**
 * processSentiment - Searches DB for instances of string and processes
 *                    sentiment.  Sticks result on res.locals.
 * @param {*} string
 */
const processSentiment = (string) => {
  // Init new Sentiment object.
  const sentiment = new Sentiment();

  // Build query.
  const procesSentimentQuery = {
    name: 'processsentiment-query',
    text: 'SELECT $1 FROM $2 WHERE $3 LIKE $4;',
    values: ['*', 'items', 'text', `%${string}%`],
  }

  // Execute query.
  db.query(cacheQuery, (err, result) => {
    // Handle error.
    if (err) next(err);
    
    // Process sentiments.
    const sentimentArray = result.map(row => {
      // Put the date and sentiment score into a new array.
      return [row.time, row.sentiment.analyze(row.text)];
    });

    // Group by month(?).
    const [labels, data] = groupByMonth(sentimentArray);

    // Return the object.
    return { 'labels': labels, 'data': data };
  })
}


module.exports = queryDB;
