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
        'labels': JSON.parse(result[0].labels),
        'data': JSON.parse(result[0].data)
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
    text: 'SELECT $1 FROM $2 WHERE $3 ILIKE $4;',
    values: ['*', 'items', 'text', `%${string}%`],
  }

  // Execute query.
  db.query(procesSentimentQuery, (err, result) => {
    // Handle error.
    if (err) next(err);
    
    // Process sentiments.
    const sentimentArray = result.rows.map(row => {
      // Put the date and sentiment score into a new array.
      return [row.time, sentiment.analyze(row.text)];
    });

    // Group by month(?).
    const { labels, data } = groupByMonth(sentimentArray);

    // Stick the results in the cache.
    const cacheSentimentQuery = {
      name: 'cachesentiment-query',
      text: 'INSERT INTO $1 VALUES ($2, $3, $4);',
      values: ['cached_results', string, JSON.stringify(labels), JSON.stringify(data)],
    }

    // Execute query.
    db.query(cacheSentimentQuery, (err, result) => {
      if (err) next(err);
      else console.log(result.rows[0])
    })

    // Return the object.
    return { 'labels': labels, 'data': data };
  })
}

/**
 * groupByMonth - Takes array of arrays in which first element is seconds
 *                since epoch and groups by (averages) second element.
 * @param {*} array 
 */
const groupByMonth = (array) => {
  // Init an object to hold months/years.
  const groupedByObj = {};

  // Declare a function that calculates a new moving average.
  const calcMovingAverage = (oldAve, newVal, newFreq) => {
    return (oldAve * (newFreq-1) / newFreq) + (newVal / newFreq);
  }

  // Iterate through the array.
  array.forEach(row => {
    // Convert the first element (seconds since epoch) to a JS Date object.
    // ** arg to Date must be milliseconds, so multiply by 1000.
    let jsDate = new Date(row[0] * 1000);
    let month = jsDate.getMonth();
    let year = jsDate.getFullYear();

    // If year not in obj, init new object literal.
    if (!(year in groupedByObj))
      groupedByObj[year] = {};

    // If month not in year, init new object literal with sentiment/frequency keys. 
    if (!(month in groupedByObj[year]))
      groupedByObj[year][month] = { ave_sentiment: 0, frequency: 0 };

    // Increment frequency.
    groupedByObj[year][month].frequency += 1;

    // Update average sentiment.
    groupedByObj[year][month].ave_sentiment =
      calcMovingAverage(groupedByObj[year][month].ave_sentiment,
                        row[1],
                        groupedByObj[year][month].frequency);
  });

  // Init output arrays.
  const labels = [];
  const frequencyData = [];
  const sentimentData = [];

  // Get the Keys out and sort.
  const sortedYearsArr = ['2008', '2009', '2010', '2011', '2012', '2013',
                          '2014', '2015', '2016', '2017', '2018', '2019'];
  const sortedMonthsArr = ['0', '1', '2', '3', '4', '5',
                           '6', '7', '8', '9', '10', '11'];

  // Iterate through object.
  sortedYearsArr.forEach(yearString => {
    sortedMonthsArr.forEach(monthString => {
      // Push label.
      labels.push(monthString + " " + yearString);

      // If data for this bin...
      if (yearString in groupedByObj && monthString in groupedByObj[yearString]) {
        frequencyData.push(groupedByObj[yearString][monthString].frequency);
        sentimentData.push(groupedByObj[yearString][monthString].ave_sentiment);
      } else {
        frequencyData.push(0);
        sentimentData.push(0);
      }
    })
  })

  // Return the groupedByObj.
  return { labels, sentimentData };
}


module.exports = queryDB;
