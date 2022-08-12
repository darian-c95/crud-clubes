const fs = require('fs');
const express = require('express');
const multer = require('multer');

const datosEquipos = require('./data/equipos.json')
const path = require('path'); 
const methodOverride = require('method-override')

const upload = multer({ dest: './uploads/imagenes' });
const exphbs = require('express-handlebars');

const PUERTO = 8084; 
const app = express();
const hbs = exphbs.create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');  

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.use(express.static(`${__dirname}/uploads`));


app.get('/', (req, res) => {
    res.render('home_crud', {
        layout: 'home',
        data: {  
            dataEquipos: datosEquipos.map(equipo => equipo)
        }
    })
}); 


app.get('/equipo/:id/ver', (req, res) => {
    
    let idEquipo = Number(req.param('id')); 
    let [data] = datosEquipos.filter(equipo => equipo.id === idEquipo); 
 
    res.render('arsenal', {
        layout: 'equipo',
        objetoData: {   
            dataEquipo: datosEquipos.filter(equipo => equipo.id === idEquipo),
            url: data.crestUrl,
            boolean: data.crestUrl.startsWith('https') 
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

    let idEquipoEliminado = Number(req.param('id')); 
    const index = datosEquipos.findIndex(equipo => equipo.id === idEquipoEliminado); 
    if (index === -1) {
        return res.status(404).send('Product not found');
    } else {
        datosEquipos.splice(index,1);
    }
    
    res.redirect('/') 
}); 


app.get('/equipo/:id/actualizar', (req, res) => {
    
    let idEquipoActualizado = Number(req.param('id'));
    let [data] = datosEquipos.filter(equipo => equipo.id === idEquipoActualizado); 

    res.render('actualizar_equipo', {
        layout: 'actualizar',
        data: { 
            equipoActualizado: datosEquipos.filter(equipo => equipo.id === idEquipoActualizado),   
            url: data.crestUrl,
            boolean: data.crestUrl.startsWith('https') 
        }
    }) 
});


app.put('/:id/actualizado', upload.single('imagen'), (req, res) => {   

    let idEquipoActualizado = Number(req.param('id'));  
    let [data] = datosEquipos.filter(equipo => equipo.id === idEquipoActualizado);
    let fotoClub = req.file;

    if (fotoClub === undefined) { 
        fotoClub = data.crestUrl;
    } else { 
        fotoClub = req.file.filename; 
    } 

    let {name, shortName, country, tla, address, phone, website, founded, email, clubColors, venue} = req.body;
    let infoEquipoActualizada = {
        id: idEquipoActualizado,
        area: {id:data.area.id, name: country},
        name,
        shortName,
        country,
        tla,
        crestUrl: fotoClub,
        address,
        phone,
        website,
        founded,
        email,
        clubColors,
        venue,
        lastUpdated: data.lastUpdated
    } 
    
    const index = datosEquipos.findIndex(equipo => equipo.id === idEquipoActualizado);
    if (index === -1) {
        return res.status(404).send('Product not found');
    } else {
        datosEquipos.splice(index,1, infoEquipoActualizada);
    }  
    
    res.redirect('/');
}); 


app.listen(8084);
console.log(`Escuchando en el puerto ${PUERTO}`);