const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'popularSearch',
});

const incrementSearch = (keyword, callback) => {
  connection.query(`insert into keywords (keyword, count) VALUES (${keyword.value}, 1) ON DUPLICATE KEY UPDATE count = count + 1;)`, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}



module.exports.incrementSearch = incrementSearch;
