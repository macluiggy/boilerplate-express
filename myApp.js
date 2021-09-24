var express = require('express');
var app = express();
//esto sirve para ejecutar el paquete que servira para traer las enviroment variables
require('dotenv').config();

module.exports = app;

//la funcion que se encuentra dentro de app.use() es la middleware, esta toma 3 argumentos, el
//objeto de peticion (request object), el de respesta (response object) y la funcion next() en
//el ciclo de peticion-respuesta (request-response) de la aplicacion, este tipo de funciones 
//ejecutan codigo que puede tener efectos secundarios, y usualmente tambien le añaden informacion
// al objeto de repition o respuesta, estas tambien pueden terminar el ciclo cuando se envia una
//respuesta cuando alguna condicion es topada. Si no se envia la respuesta cuando terminan, 
//inician la ejecucion de la funcion next() en el stack. Esto desencadena la llamada el 3er 
//argumento, next().
app.use((req, res, next) => {
    let { method, path, ip } = req
    console.log(`${method} ${path} - ${ip}`)
    next()
})

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
//en este caso la middleware es express.static(path), el path es la ruta absoluta donde se 
//enncuentran los assets, por ejemplo los estilos css para la pagina
app.use('/public/', express.static(__dirname+'/public'))

//usamos el metodo get para traer una api, el path en get sera donde estara el json api
/*app.get('/json', (req, res) => {
    //una vez se haga la peticion, se crea la api y se pone como argumento un objeto javascript
    //se uso '' en vez de "" para demostrar que es un objeto javascript, que luego va a ser
    //transformado en un json object
    res.json({
        "message": 'Hello json'
    })
})*/

//usamos el metodo get, el endpoint json sera donde se encontrara la api
app.get('/json', (req, res) => {
    //definimos el mensaje
    let msg = 'Hello json';
    //si la enviroment variable (variable de entorno) MESSAGE_STYLE es igual a
    //uppercase, transformamos el mensaje en uppercase, si no, se devuelve la misma variable
    msg = process.env.MESSAGE_STYLE === 'uppercase'
                        ? msg.toUpperCase()
                        : msg
    //se usa la respuesta y el metodo json para tranformar el objeto javascript en un json
    res.json({
        "message": msg
    })
})

//console.log(process.env.MESSAGE_STYLE)

//las middleware se pueden montar en un path especifico usando app.METHOD(path, middleware)
//El middleware también se puede encadenar dentro de la definición de ruta.
app.get('/now', (req, res, next) => {
    //ejecuta codigo dentro del middleware para actualizar los datos de la request (req)
    //en este caso se esta añadiento una nueva propiedad (key/value) al objeto
    req.time = new Date().toString();
    //se llama a la funcion next() para continuar con la handler funcion
    next()
}, (req, res) => {
    res.json({
        time: req.time
    })
})