const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});

mongoose.connect(process.env.DATABASE, {useNewUrlParser:true});

mongoose.connection.on('error', (error) => {
    console.log(error);
});

// Importamos los modelos
require('../models/Vacantes');