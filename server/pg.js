const { Pool } = require('pg');

const connectionString = 'postgres://yiipbrhe:yj9Gz49eSXl_xFV1GdgrAunrhHV9obYr@raja.db.elephantsql.com:5432/yiipbrhe';

const pool = new Pool({
  connectionString: connectionString,
});

pool.connect();



