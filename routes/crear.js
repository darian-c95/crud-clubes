const {Router} = require('express');
const router = Router();

const express = require('express');
const multer = require('multer');

const app = express();
app.use(express.static(`${__dirname}/uploads`));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/imagenes')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage });

const { crearEquipo, nuevoEquipo } = require('../controllers/crear');


router.get('/crear', crearEquipo);

router.post('/nuevo-equipo', upload.single('imagen'), nuevoEquipo);


module.exports = router;