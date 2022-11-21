const express = require('express');
const routerApi = require('./routes');
const app = express();
const port = 3000;

const { logError, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

app.use(express.json()); //perminte al Nodejs interpretar el contenido en formato JSON

app.get('/', (req, res) => {
  res.send("Restaurante");
});

routerApi(app); //aca esta todo lo que se dentro del router y service
//estos son los siguientes middleware
app.use(logError);//imprime el error en consola
app.use(boomErrorHandler);//si es un error de tipo boom lo detiene y muestra el RESPONS
app.use(errorHandler);//muestra la salida en formato JSON

app.listen(port, () => {
  console.log("express activo: " + port);
});
