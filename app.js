const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./src/config/config')();

const url = config.bd_string;
const options = {reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true}; //Se não usar o userNewUrlParser = true ele ficando dando mensagem no console

mongoose.connect(url, options);
mongoose.set('useCreateIndex', true); //Se não usar ele fica dando uma mensagem no console

mongoose.connection.on('error', (err)=> {
    console.log('erro na conexão com o banco de dados' + err);
})

mongoose.connection.on('disconnected', () =>{
    console.log('aplicação desconectada do banco de dados')
})

mongoose.connection.on('connected', () =>{
    console.log('conexão com o banco feita com sucesso')
})

//BODY PARSER
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const usersRoute = require('./src/routes/usersRoute')

app.use('/users', usersRoute);

app.listen(3000);

module.exports = app;