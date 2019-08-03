const { Pool } = require('pg');

console.log(process.env.CONNECTIONSTRING)
// const connectionString = process.env.CONNECTIONSTRING;
const connectionString = 'postgres://andrewtang@localhost/snape'

const pool = new Pool({
  connectionString: connectionString,
});

pool.connect();

const createFuncList = 
  `CREATE TABLE IF NOT EXISTS 
   mastertable (id int UNIQUE NOT NULL, by varchar(100), text varchar DEFAULT null, descendants smallint DEFAULT null, type varchar, time int DEFAULT null, title varchar DEFAULT null,score smallint DEFAULT null, kids smallint DEFAULT null)`


const testQuery = 
`INSERT INTO mastertable (id, by, text, descendants, type, time, title, url, kids)
 VALUES (1,'testuser', 'hello', 3,'story',23789, 'hello world','wwww.google.com', 23)`

 const testQuery2 = 
`INSERT INTO mastertable (id)
 VALUES (3)`



pool.query( createFuncList, (err, res) => {
  if (err) return err;
  return res
});


module.exports = pool