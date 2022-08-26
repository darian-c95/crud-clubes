const datosEquipos = require('../data/equipos.json');

const eliminarEquipo = (req, res) => {
    
    let idEquipoEliminado = req.param('id'); 

    res.render('eliminar_equipo', {
        layout: 'home',
        data: { 
            equipoEliminado: datosEquipos.filter(equipo => equipo.id === Number(idEquipoEliminado)),   
        }
    });
}

const equipoEliminado = (req, res) => {

    let idEquipoEliminado = Number(req.param('id')); 
    const index = datosEquipos.findIndex(equipo => equipo.id === idEquipoEliminado); 
    if (index === -1) {
        return res.status(404).send('Product not found');
    } else {
        datosEquipos.splice(index,1);
    }
    
    res.redirect('/')
}


module.exports = {
    eliminarEquipo,
    equipoEliminado
};