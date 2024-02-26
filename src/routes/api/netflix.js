const express = require('express');
// Nous créons un objet router qui va nous permettre de gérer les routes
const router = express.Router();
const chercherNetflix = require('../../controllers/netflix.controller');

router.get('/titres/:type_titre', (req, res) => {
    console.log('ici');
    chercherNetflix.listeNetflix(req, res);
});

module.exports = router;