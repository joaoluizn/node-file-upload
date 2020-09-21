'use strict';

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const multer = require('multer');
const upload = setupUploadHandler();

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), function(req, res) {
  res.json({ size: req.file.size, name: req.file.originalname});
});

app.listen(process.env.PORT || 3000, function() {
  console.log('Node.js listening ...');
});

function _createDirectory(dir) {
  if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
  }
}

function setupUploadHandler() {
  const destinyDir = './uploads';
  _createDirectory(destinyDir);
  return multer({ dest: destinyDir });
}