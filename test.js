const express = require('express');
const { S3Client } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
const db = require('./mysqlDatabase');
require('dotenv').config();

const app = express();
const port = 3000;

// AWS S3 설정
const s3 = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.accessKey,
    secretAccessKey: process.env.secretKey,
  },
});

// Multer와 multerS3 설정
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'pophub2024',
    key: function (req, file, cb) {
      cb(null, Date.now().toString()); // 업로드 시 파일명 변경
    },
  }),
});

// Express 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('start');
});

app.get('/get', (req, res) => {
  db.query('SELECT * FROM users', (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.post('/add', upload.single('img'), (req, res) => {
  const imgLocation = req.file ? req.file.location : '';
  
  db.query('INSERT INTO posts (img) VALUES (?)', [imgLocation], (error, results) => {
    if (error) {
      console.error('Failed to insert post into MySQL', error);
      return res.status(500).send('서버 에러');
    }
    res.status(201).send('성공');
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});