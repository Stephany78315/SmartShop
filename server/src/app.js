'use strict'

const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

const port = 3900;

var url = 'mongodb://127.0.0.1:27017/smartshop-db-2023';

mongoose.Promise = global.Promise;

var article_routes = require('./routes/article'); 

//Cargamos boy-parser, es un middleware para analizar cuerpos a través de la URL
app.use(bodyParser.urlencoded({extended: false}));

//Cualquier pertición la convertimos a json:
app.use(bodyParser.json());

//Activamos el CORS para permitir las peticiones AJAX y HTTP desde el frontend:
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, POST, DELETE');
    next();
})  

app.use('/api', article_routes); 


mongoose.connect(url, {useNewUrlParser: true}).then(() =>{
    console.log('Conexion a la bdd realizada con éxito!!!');
    app.listen(port, () => {
        console.log('Lanzando la aplicación en el puerto ' + port);
    });
})





