const { Pool } = require('pg');

console.log(process.env.CONNECTIONSTRING)
const connectionString = process.env.CONNECTIONSTRING;

const pool = new Pool({
  connectionString: connectionString,
});

pool.connect();

const createFuncList = 
  `CREATE TABLE IF NOT EXISTS 
   funclist (id SERIAL PRIMARY KEY, name varchar(100) UNIQUE NOT NULL, definition varchar NOT NULL, _type varchar(10))`
// initializing table for functions
pool.query( createFuncList, (err, res) => {
  if (err) return err;
  return res
});


module.exports = pool