var express = require('express');
var app = express();


module.exports = app;

app.get("/", (req, res) => {
  res.send('Hello Express');
});

console.log('Hello World')