
const fs = require('fs');
const express = require('express');
const datosEquipos = require('./data/equipos.json')
// const path = require('path');

// const multer = require('multer');

// const upload = multer({ dest: './uploads/imagenes' });
const exphbs = require('express-handlebars');


const PUERTO = 8084; 
const app = express();
const hbs = exphbs.create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');  
// app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
    res.render('home_crud', {
        layout: 'home',
        data: {  
            dataEquipos: datosEquipos.map(equipo => equipo)
        }
    })
});
 

app.get('/equipo/:id/ver', (req, res) => {
    
    let idEquipo = req.param('id'); 

    res.render('arsenal', {
        layout: 'equipo',
        objetoData: {   
            dataEquipo: datosEquipos.filter(equipo => equipo.id === Number(idEquipo)),  
        }
    })
});

app.listen(8084);
console.log(`Escuchando en el puerto ${PUERTO}`);