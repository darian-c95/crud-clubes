require('dotenv').config();

const fs = require('fs');
const express = require('express');

const path = require('path'); 
const methodOverride = require('method-override')

const exphbs = require('express-handlebars');

const app = express();
const hbs = exphbs.create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');  

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.use(express.static(`${__dirname}/uploads`)); 


app.use(require('./routes/lista'));
app.use(require('./routes/ver'));
app.use(require('./routes/eliminar'));
app.use(require('./routes/actualizar'));
app.use(require('./routes/crear'));


app.listen(process.env.PUERTO);
console.log(`Escuchando en el puerto ${process.env.PUERTO}`);