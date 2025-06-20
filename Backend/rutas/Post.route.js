const router = require('express').Router();
let Post = require('../modelos/Post.model');

//obtener todos los monstruos
router.route('/').get((req, res) => {
    Post.find()
        .then(Post => res.json(Post))
        .catch(err => res.status(400).json('Error: ' + err))
});

//obtener un solo monstruo
router.route('/:id').get((req, res) => {
    Post.findById(req.params.id)
        .then(Post => res.json(Post))
        .catch(err => res.status(400).json('Error: ' + err))
});

//borrar un monstruo por id
router.route('/:id').delete(async (req, res) => {
    try{
        await Post.findByIdAndDelete(req.params.id);
        res.json({ message: 'monstruo borrado con exito'})
    }catch(error){
        console.log("Error borrando monstruo: " + error);
        res.status(500).json({error: 'Error interno del servidor'})
    }
});

//agregar un monstruo
router.route('/add').post((req, res) => {
    const { ID, NOMBRE, IMAGEN, ICONO, CLASSIFICACION, DESCRIPCION, CONSEJO, LLANOS_VENTOSOS, BOSQUE_ESCARLATA, CUENCA_OLEOSA, ACANTILADOS_ESPINAHELADA, DEBILIDAD_FUEGO, DEBILIDAD_AGUA, DEBILIDAD_ELECTRICIDAD, DEBILIDAD_HIELO, DEBILIDAD_DRAGON } = req.body;
    const newPost = new Post({ ID, NOMBRE, IMAGEN, ICONO, CLASSIFICACION, DESCRIPCION, CONSEJO, LLANOS_VENTOSOS, BOSQUE_ESCARLATA, CUENCA_OLEOSA, ACANTILADOS_ESPINAHELADA, DEBILIDAD_FUEGO, DEBILIDAD_AGUA, DEBILIDAD_ELECTRICIDAD, DEBILIDAD_HIELO, DEBILIDAD_DRAGON });

    newPost.save()
        .then(() => res.json('monstruo se agrego con exito'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;