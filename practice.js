var express = require('express');
var app = express()

module.exports = app

/*app.get('/', (req, res) => {
	res.send('practicando express')
})*/

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/views/practice.html')
})

app.use('/public', express.static(__dirname + '/public/'))