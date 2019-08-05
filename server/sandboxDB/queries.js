const db = require('../pg');
const Sentiment = require('sentiment')

// NOTE: the purpose of this file is to run tests queries on our massive database. Please use read only queries and do not write. 

db.query(`SELECT * from mastertable where text like $1`,['%'+ 'javascript'+ '%'], (err, res) => {
  if (err) {
    console.log(err)
  }

  const sentimentArray = res.rows.map(row => {
    // Put the date and sentiment score into a new array.
    return [row.time, row.text];
  });

  console.log(sentimentArray)
})

