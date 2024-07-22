const express = require("express");
const app = express();

const db = require('./mysqlDatabase');

app.get("/", (req, res) => {
    res.send('start');
})

app.get('/get', (req, res) => {
    db.query('SELECT * FROM users', (error, results) => {
      if (error) throw error;
      res.send(results);
    });
  });

app.listen(3000, () => {
})