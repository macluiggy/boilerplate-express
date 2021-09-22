var express = require('express');
var app = express();


module.exports = app;

//esta estructura es app.METHOD.(PATH, HANDLER). METHOD es un metodo http, PATH es un directorio
//especifico, HANDLER es una funcion que que Express llama cuando el PATH encaja, el HANDLER toma
//los parametros req y res, req es un objeto de peticion y res es un objeto de respuesta

/*app.get("/", (req, res) => {
    res.send(`/views/index.html`)

})*/
app.get("/", (req, res) => {
    //usando la respuesta, se usa el metodo sendFile para que de este modo se envie el archivo
    //html que queremos que el navegador lea, para eso necesitamos una ruta de archivo absoluta
    //(__dirname) el cual es el directorio donde se encuentra el archivo actual (myApp.js)
    res.sendFile(`${__dirname}/views/index.html`)

})
//sintax es app.use(path, middlewareFunction) path es el endpoint donde se encuentra los assets,
//en este caso la middleware es express.static(path), el path es la ruta absoluta donde se enncuentran los assets
app.use('/public/', express.static(__dirname+'/public'))
