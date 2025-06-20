const router = require('express').Router();
let Post = require('../modelos/Post.model');

//obtener todos los monstruos
router.route('/').get((req, res) => {
    Post.find()
        .then(Post => res.json(Post))
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router;