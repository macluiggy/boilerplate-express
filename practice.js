var express = require('express');
var app = express()
require('dotenv').config()

module.exports = app

/*app.get('/', (req, res) => {
	res.send('practicando express')
})*/

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/views/practice.html')
})

app.use('/public', express.static(__dirname + '/public/'))

app.get('/json', (req, res) => {
	let msg = 'hola mi compa';
	res.json({
		'mensaje': process.env.MESSAGE_STYLE === 'uppercase'
							? msg.toUpperCase()
							: msg,
		'hola': 'hello',
	})
})