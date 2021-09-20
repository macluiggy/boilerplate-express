var express = require('express');
var app = express();


module.exports = app;

//esta estructura es app.METHOD.(PATH, HANDLER). METHOD es un metodo http, PATH es un directorio
//especifico, HANDLER es una funcion que que Express llama cuando el PATH encaja, el HANDLER toma
//los parametros req y res, req es un objeto de peticion y res es un objeto de respuesta
app.get("/", (req, res) => {
  res.send('Hello Express');
});

console.log('Hello World')