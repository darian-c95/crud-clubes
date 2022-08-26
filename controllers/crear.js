const datosEquipos = require('../data/equipos.json');

const crearEquipo = (req, res) => {
    
    res.render('crear_equipo', {
        layout: 'home' 
    });
}

const nuevoEquipo = (req, res) => {

    let ultimoEquipoDelArray = datosEquipos[datosEquipos.length - 1];
    let idNuevoEquipo = ultimoEquipoDelArray.id + 1;

    let fotoClub = req.file;

    if (fotoClub === undefined) { 
        return;
    } else { 
        fotoClub = req.file.originalname; 
    }; 
    
    
    let {name, shortName, country, tla, address, phone, website, founded, email, clubColors, venue} = req.body;
    let infoNuevoEquipo = {
        id: idNuevoEquipo,
        area: {id:2072, name: country},
        name,
        shortName, 
        tla,
        crestUrl: fotoClub,
        address,
        phone,
        website,
        email,
        founded,
        clubColors,
        venue,
        lastUpdated: new Date().toISOString()
    };
    
    datosEquipos.push(infoNuevoEquipo); 
    
    res.redirect('/');
}


module.exports = {
    crearEquipo,
    nuevoEquipo
};