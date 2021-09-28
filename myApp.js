var express = require('express');
var app = express();
//esto sirve para ejecutar el paquete que servira para traer las enviroment variables
require('dotenv').config();
var bodyParser = require('body-parser')

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
    //console.log(`${method} ${path} - ${ip}`)
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
//enncuentran los assets, por ejemplo los estilos css para la pagina, esto quiere decir que
//tanto en el argumento path de app.use() y el path the la middleware, se van a poner el
//endpoint
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
    //en este caso se esta añadiento una nueva propiedad (key/value) al objeto req
    req.time = new Date().toString();
    //se llama a la funcion next() para continuar con la handler funcion
    next()
}, (req, res) => {
    //una vez que se aña añadido la nueva propiedad, se pasa el json a la ruta
    //conteniendo la fecha que se creo en el middleware
    res.json({
        time: req.time
    })
})

//aqui en el endpoint la parte la parte 'word' se puede poner cualquier palabra, ya que es una
//variable sin olvidar los dos puntos, de esta forma cualquier route parameter (las palabras que
//estan entre los slashes) para word que el usuario ponga, se guardara en req.params.word
app.get("/:word/echo", (req, res) => {
    let { word } = req.params.word;
    //console.log(req.params)
    //una vez se haya puesto una palabra para el route parameter, podremos crear la api json con
    //con esa palabra, enviando un objeto javascript que se transforma en json y este se podra 
    //visualizar en your-app-rootpath/whateverword/echo
    res.json({
        echo: req.params.word,
    })
})

//vamos a obtener otro route parameter con mas de los mismos
app.get('/user/:userId/book/:bookId', (req, res) => {
    //console.log(req.params)
    const { userId, bookId } = req.params 
    res.json({
        userId: userId,
        bookId: bookId,
    })
})

//console.log(bodyParser)
//este packete bodyParser te deja usar una serie de middlewares, las cuales pueden decodificar
//datos en diferentes formatos
//el middleware que se usa aqui es para manejar urlencoded data, este devuelve la urlencoded
//data
//esta middleware se pone antes de los siguientes métodos, debido a que los routes de estos
//dependen de esta
//extended es una opcion de configuracion que le dice a body-parser que parsing (analisis), debe
//usarse. Si se pone extended=false la libreria querystring es usada. Mientras que si es
//exteded=true, se usa la libreria qs para el parsin (analisis).
app.use(bodyParser.urlencoded({ extended: false }));

//lo que viene despues del route path ('/name') es el query string. Este esta delimitado por
//un question mark (?), y despues de ese viene las parejas field=value, estas se pueden dividir
//con un ampersand (&), cuando ponenos un url con esta sintaxis
//(/route-path?field=value&field2=value2&...fieldi=valuei&...fieldN=valueN)
//express añade otra propiedad al objeto req, esta es req.query el cual es un objeto como este:
/*req.query: {
    field: value,
    field2: value2,
    .
    .
    .
    fieldi: valuei,
    .
    .
    .
    fieldN: valueN,
} */
//lo de abajo se puede hacer tambien asi: app.(path).get(handler)
app.get('/name', (req, res) => {
    //?first=firstname&last=lastname
    //console.log(req.query)
    //let firstName = req.query.firs
    let { first: firstName, last } = req.query
    res.json({
        name: `${firstName} ${last}`,
    })
    //lo de arriba es para obtener un json poninedo un link con el formato correspondiente
    //en cambio lo que sigue, el metodo post, sirve para mandar los datos directamente desde
    //un html form, estos se van a guardar en el objeto req.body
}).post('/name', (req, res) => {
    //cabe recalcar que para que los valores se vean reflejados, los key del objeto req.body
    //deben ser iguales que el valor de name='key' en el input que contiene la action con el
    //endpoint correspondiente
    let { first: firstName, last } = req.body
    res.json({
        name: `${firstName} ${last}`,
    })
})
