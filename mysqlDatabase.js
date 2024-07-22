const mysql = require("mysql");

let connection = mysql.createConnection({
    host     : 'database-1.cxqnlezsld9q.us-east-1.rds.amazonaws.com', //실제로 연결할 데이터베이스의 위치
    user     : 'root',
    password : 'pophub123!',
    database : 'test' //데이터베이스 이름
  });

connection.connect();

module.exports = connection;