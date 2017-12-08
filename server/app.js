const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes');


const app = express();
const port = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, '../client/dist/')));

app.use('/', routes.home);
app.use('/todos', routes.todos);

module.exports = app;