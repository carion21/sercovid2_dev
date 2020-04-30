var express = require('express');
var router = express.Router();

const idgmap = require('../config/constante').constMap()
const Zone = require('../models/Zone')
const Individu = require('../models/Individu')
const PositionIndividu = require('../models/PositionIndividu')

const geolib = require('geolib')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SERCOVID-2' });
});

router.get('/:apikey/zones_a_risques', (req, res, next) => {

    var apikey = req.params.apikey
    //var latitude = req.params.latitude
    //var longitude = req.params.longitude

    Individu.findByOneField('cle_api', apikey, (futindividu) => {
        if(futindividu.length === 1){
            PositionIndividu.findLastByOneField('code_individu', futindividu[0].codeIndividu, (futlast) => {

                if (futlast.length === 1) {
                    var longitudeIndividu = futlast[0].longitude
                    var latitudeIndividu = futlast[0].latitude

                    console.log(longitudeIndividu)
                    console.log(latitudeIndividu)

                    Zone.findByOneField('statut', 1, (futzones) => {
                        let info = "yes"
                        let zonar = 1
                        if(futzones.length !== 0 && futzones !== null){
                            let info = "yes"
                            var polycenter = {}
                            var totalposit = []
                            let fzone = {}
                            let fzones = []
                            var z = 0
                            futzones.forEach(zposit => {
                                fzone = {
                                    zid: z,
                                    zone: zposit
                                }
                                fzones.push(fzone)
                                z++
                            });
                            if (futzones.length >= 2) {
                                let havecenter = 1
                                futzones.forEach(zone => {
                                    zposit = {
                                        latitude: zone.latitudeCentre,
                                        longitude: zone.longitudeCentre
                                    }
                                    totalposit.push(zposit)
                                });
                                polycenter = geolib.getCenter(totalposit)

                                res.render(
                                    'zonarisque0', {
                                        idgmap: idgmap,
                                        info: info,
                                        zonar: zonar,
                                        ztotal: futzones.length,
                                        havecenter: havecenter,
                                        zcenter: polycenter,
                                        fzones: fzones,
                                        latitudeIndividu: latitudeIndividu,
                                        longitudeIndividu: longitudeIndividu
                                    });
                            } else {
                                let havecenter = 0

                                res.render(
                                    'zonarisque0', {
                                        idgmap: idgmap,
                                        info: info,
                                        zonar: zonar,
                                        ztotal: futzones.length,
                                        havecenter: havecenter,
                                        fzones: fzones,
                                        latitudeIndividu: latitudeIndividu,
                                        longitudeIndividu: longitudeIndividu
                                    });
                                
                            }

                        } else {
                            let info = "no"
                            var error = "Aucune zônes à risque pour l'instant. Merci."
                            res.render(
                                'zonarisque0', {
                                    info: info,
                                    error: error
                                }
                            );
                        }
                    })
                } else {
                    res.redirect('/sercovid2/zones_a_risques')
                }
            })
        }else {
            res.redirect('/sercovid2/zones_a_risques')
        }
    })
})

router.get('/zones_a_risques', (req, res, next) => {
    Zone.findByOneField('statut', 1, (futzones) => {
        let info;
        let zonar = 1
        if(futzones.length !== 0 && futzones !== null){
            let info = "yes"
            var polycenter = {}
            var totalposit = []
            let fzone = {}
            let fzones = []
            var z = 0
            futzones.forEach(zposit => {
                fzone = {
                    zid: z,
                    zone: zposit
                }
                fzones.push(fzone)
                z++
            });
            if (futzones.length >= 2) {
                let havecenter = 1
                futzones.forEach(zone => {
                    zposit = {
                        latitude: zone.latitudeCentre,
                        longitude: zone.longitudeCentre
                    }
                    totalposit.push(zposit)
                });
                polycenter = geolib.getCenter(totalposit)

                res.render(
                    'zonarisque', {
                        idgmap: idgmap,
                        info: info,
                        zonar: zonar,
                        ztotal: futzones.length,
                        havecenter: havecenter,
                        zcenter: polycenter,
                        fzones: fzones,
                    }
                );
            } else {
                let havecenter = 0

                res.render(
                    'zonarisque', {
                        idgmap: idgmap,
                        info: info,
                        zonar: zonar,
                        ztotal: futzones.length,
                        havecenter: havecenter,
                        fzones: fzones,
                    }
                );
                
            }

        } else {
            let info = "no"
            var error = "Aucune zônes à risque pour l'instant. Merci."
            res.render(
                'zonarisque', {
                    info: info,
                    error: error
                }
            );
        }
    })
})

module.exports = router;
