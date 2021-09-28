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

app.use('/public/', express.static(__dirname + '/public/'))

app.get('/json', (req, res) => {
	let msg = 'hola mi compa';
	res.json({
		'mensaje': process.env.MESSAGE_STYLE === 'uppercase'
							? msg.toUpperCase()
							: msg,
		'hola': process.env.VAR_1,
	})
})

//console.log(process.env.MESSAGE_STYLE)

app.get('/ahora', (req, res, next) => {
	//al parecer no es necesario que usar solo req para añadir propiedades a el objeto, tambien
	//se pueden añadir en el objeto res
	//res.tiempo = new Date().toString();
	req.tiempo = new Date().toString();
	next();
}, (req, res) => {
	res.json({
		tiempo: req.tiempo,
	})
})

//la posicion para las variables route parameters puede ser cualquiera en el url
app.get('/user/:user/id/:id', (req, res, next) => {
	req.time = new Date().toString()
	next();
}, (req, res) => {
	let { user, id } = req.params;
	let { time } = req
	res.json({
		user: user,
		id: id,
		'Reviewed in': time,
	})
})

app.get('/nombre', (req, res) => {
	//nombre?nombre=nombre&apellido=apellido
	let { nombre, apellido } = req.query;

	res.json({
		nombre: nombre,
		apellido: apellido,
	})
})
//