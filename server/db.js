const { Pool } = require('pg');

const pool = new Pool({
  user: 'andramataloja',
  host: 'localhost',
  database: 'expensetrackerdb',
  password: '',
  post: 5432
})

pool.on('connect', () => {
  console.log('connected to the db');
});

module.exports = pool;