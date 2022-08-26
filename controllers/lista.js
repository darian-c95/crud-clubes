const datosEquipos = require('../data/equipos.json');

const listaEquipos = (req, res) => { 
    res.render('home_crud', {
        layout: 'home',
        data: {  
            dataEquipos: datosEquipos.map(equipo => equipo)
        }
    });
}

module.exports = {
    listaEquipos
};