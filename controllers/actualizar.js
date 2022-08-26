const datosEquipos = require('../data/equipos.json');

const actualizarEquipo = (req, res) => {
    
    let idEquipoActualizado = Number(req.param('id'));
    let [data] = datosEquipos.filter(equipo => equipo.id === idEquipoActualizado); 

    res.render('actualizar_equipo', {
        layout: 'home',
        data: { 
            equipoActualizado: datosEquipos.filter(equipo => equipo.id === idEquipoActualizado),   
            url: data.crestUrl,
            boolean: data.crestUrl.startsWith('https') 
        }
    }); 
}

const equipoActualizado = (req, res) => {

    let idEquipoActualizado = Number(req.param('id'));  
    let [data] = datosEquipos.filter(equipo => equipo.id === idEquipoActualizado);
    let fotoClub = req.file;

    if (fotoClub === undefined) { 
        fotoClub = data.crestUrl;
    } else { 
        fotoClub = req.file.originalname; 
    } 

    let {name, shortName, country, tla, address, phone, website, founded, email, clubColors, venue} = req.body;
    let infoEquipoActualizada = {
        id: idEquipoActualizado,
        area: {id:data.area.id, name: country},
        name,
        shortName, 
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
}


module.exports = {
    actualizarEquipo,
    equipoActualizado
};