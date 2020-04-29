var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.redirect('/telechargement/fichierapk')
})

/* GET home page. */
router.get('/fichierapk', function (req, res, next) {
    var nomfichier = 'a.txt'
    res.render('telechar/fichierapk', {
        nomfichier: nomfichier,
        lienfichier: '/file/'+nomfichier
    });
});

module.exports = router;