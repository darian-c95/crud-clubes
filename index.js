
const fs = require('fs');
const express = require('express');
const datosEquipos = require('./data/equipos.json')
const path = require('path'); 
const exphbs = require('express-handlebars');


const PUERTO = 8084; 
const app = express();
const hbs = exphbs.create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');  
app.use(express.static(path.join(__dirname, 'public')));

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
 

app.get('/equipo/:id/eliminar', (req, res) => {
    
    let idEquipoEliminado = req.param('id'); 

    res.render('eliminar_equipo', {
        layout: 'eliminar',
        data: { 
            equipoEliminado: datosEquipos.filter(equipo => equipo.id === Number(idEquipoEliminado)),   
        }
    }) 
});


app.post('/:id/eliminado', (req, res) => { 

    let idEquipoEliminado = req.param('id'); 
    const index = datosEquipos.findIndex(equipo => equipo.id === Number(idEquipoEliminado)) 
    if (index === -1) {
        return res.status(404).send('Product not found');
    } else {
        datosEquipos.splice(index,1);
    }
    
    res.redirect('/') 
}); 


app.listen(8084);
console.log(`Escuchando en el puerto ${PUERTO}`);