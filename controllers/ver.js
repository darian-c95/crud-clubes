const datosEquipos = require('../data/equipos.json');

const verEquipo = (req, res) => {
    
    let idEquipo = Number(req.param('id')); 
    let [data] = datosEquipos.filter(equipo => equipo.id === idEquipo);  
 
    res.render('ver_equipo', {
        layout: 'home',
        objetoData: {   
            dataEquipo: datosEquipos.filter(equipo => equipo.id === idEquipo),
            url: data.crestUrl,
            boolean: data.crestUrl.startsWith('https') 
        }
    });
}

module.exports = {
    verEquipo
};