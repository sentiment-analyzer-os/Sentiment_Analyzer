const Sentiment = require('sentiment');
const db = require('./pg');

const dataController = {};

/**
 * searchCache - Middleware that searches cache first for processed results. 
 *               If in cache, sticks results on response.locals.
 * @param {*} request 
 * @param {*} response 
 * @param {*} next 
 */
dataController.searchCache = (request, response, next) => {
  // Extract the query string from the request object.
  let queryString = request.body.queryString;

  // Clean the query string.
  queryString = queryString.trim();
  console.log(queryString)
  // Build query
  const cacheQuery = {
    name: 'cache-query',
    text: `SELECT * FROM cached_results WHERE query_string = $1;`,
    values: [queryString],
  }

  // Execute Query.
  db.query(cacheQuery, (err, result) => {
    // Handle error.
    if (err) console.log(err);
    console.log(result);
    
    // If results are not null, we have a cached result.
    if (result.rows.length) {
      // Stick it on res.locals.
      response.locals.result = {
        'labels':        JSON.parse(result.rows[0].labels),
        'frequencyData': JSON.parse(result.rows[0].frequency_data),
        'sentimentData': JSON.parse(result.rows[0].sentiment_data)
      };
      // Set the toCache property of res.locals.
      response.locals.toCache = false;
    }

    // Pass control.
    return next();   
  })
}

/**
 * processSentiment - Searches DB for instances of string and processes
 *                    sentiment.  Sticks result on res.locals.
 * @param {*} request 
 * @param {*} response 
 * @param {*} next 
 */
dataController.processSentiment = (request, response, next) => {
  // Pass control if response.locals.result exists.
  if (response.locals.result) return next();
  console.log(`processSentiment middleware function activated`)
  // Init new Sentiment object.
  const sentiment = new Sentiment();

  // Build query.
  const procesSentimentQuery = {
    name: 'processsentiment-query',
    text: 'SELECT * FROM mastertable WHERE text ILIKE $1;',
    values: [`%${request.body.queryString}%`],
  }

  // Execute query.
  db.query(procesSentimentQuery, (err, result) => {
    // Handle error.
    if (err) {
      return next(err)
    } else {
      console.log(`inside of processSentimentQuery`)
      const sentimentArray = result.rows.map(row => {
        // Put the date and sentiment score into a new array.
        return [row.time, sentiment.analyze(row.text).score];
      });
  
      // Group by month and stick it on results.
      response.locals.result = groupByMonth(sentimentArray);
  
      // Set the toCache property of res.locals to true.
      response.locals.toCache = true;

      // Pass control.
      return next();
    }
  })
}

/**
 * updateCache - Sticks results in cache if did not exist previously.
 * @param {*} request 
 * @param {*} response 
 * @param {*} next 
 */
dataController.updateCache = (request, response, next) => {
  // Pass control if locals.toCache is true.
  if (!response.locals.toCache) return next();

  // Stick the results in the cache.
  const cacheSentimentQuery = {
    name: 'cachesentiment-query',
    text: 'INSERT INTO cached_results(query_string, labels, sentiment_data, frequency_data) VALUES ($1, $2, $3, $4);',
    values: [`${request.body.queryString}`,
             `${JSON.stringify(response.locals.result.labels)}`,
             `${JSON.stringify(response.locals.result.sentimentData)}`,
             `${JSON.stringify(response.locals.result.frequencyData)}`],
  }

  // Execute query.
  db.query(cacheSentimentQuery, (err, result) => {
    if (err) next(err);
    else console.log(result.rows[0]);
    return next();
  })
}


/**
 * groupByMonth - Takes array of arrays in which first element is seconds
 *                since epoch and groups by (averages) second element.
 * @param {*} array 
 */
const groupByMonth = (array) => {
  // month number to month name object.
  const monthNumToName = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
  }
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
      labels.push(monthNumToName[monthString.toString()] + " " + yearString);

      // If data for this bin...
      if (yearString in groupedByObj && monthString in groupedByObj[yearString]) {
        frequencyData.push(groupedByObj[yearString][monthString].frequency);
        sentimentData.push(Number(groupedByObj[yearString][monthString].ave_sentiment.toFixed(2)));
      } else {
        frequencyData.push(0);
        sentimentData.push(0);
      }
    })
  })

  // Pop off months that don't exist yet.
  // TODO: make this function subject to current day.
  for (let i = 0; i < 5; i++) {
    labels.pop();
    frequencyData.pop();
    sentimentData.pop();
  }

  // Return the groupedByObj.
  return { labels, sentimentData, frequencyData };
}


module.exports = dataController;
