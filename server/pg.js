const { Pool } = require('pg');

// const connectionString = process.env.CONNECTIONSTRING;
// storing this on my local computer due to size limitations. 
const connectionString = 'postgres://andrewtang@localhost/snape'

const pool = new Pool({
  connectionString: connectionString,
});

pool.connect();

const createMasterTable = 
  `CREATE TABLE IF NOT EXISTS 
   mastertable (id int UNIQUE NOT NULL, by varchar(100), text varchar DEFAULT null, descendants smallint DEFAULT null, type varchar, time int DEFAULT null, title varchar DEFAULT null,score smallint DEFAULT null, kids smallint DEFAULT null)`


const createCacheTable = 
`CREATE TABLE IF NOT EXISTS
 cached_results (id SERIAL PRIMARY KEY, query_string VARCHAR, labels VARCHAR, sentiment_data VARCHAR, frequency_data VARCHAR)`


// const testQuery = 
// `INSERT INTO mastertable (id, by, text, descendants, type, time, title, url, kids)
//  VALUES (1,'testuser', 'hello', 3,'story',23789, 'hello world','wwww.google.com', 23)`


pool.query( createMasterTable, (err, res) => {
  if (err) return err;
  return res
});

pool.query( createCacheTable, (err, res) => {
  if (err) return err;
  return res
});




module.exports = pool
