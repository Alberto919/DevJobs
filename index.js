const mongoose = require('mongoose');
require('./config/db');
const express = require('express');
const exphbs = require('express-handlebars');
const esphbs = require('express-handlebars');
const router = require('./routes');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);


require('dotenv').config({path: 'variables.env'});

const app = express();


// habilitar handlebars como view
app.engine('handlebars', 
    exphbs({
        defaultLayout: 'layout'
    })
);

app.set('view engine', 'handlebars');

// Archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));


//Habilita las sesiones
app.use(session({ 
    secret: process.env.SECRETO, 
    key: process.env.KEY, 
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use('/', router());

app.listen(process.env.PUERTO);