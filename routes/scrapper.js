var express = require('express');
var router = express.Router();

const StatLocal = require('../models/StatLocal')
const StatNonLocal = require('../models/StatNonLocal')

const cheerio = require("cheerio");
const axios = require("axios");

const siteLocal = require('../config/constante').constSiteLocal()
const siteNonLocal = require('../config/constante').constSiteNonLocal()
const removeExtraEspace = require('../config/config').removeExtraSpace

/* GET home page. */
router.get('/', async function (req, res, next) {

    var total_cas = ""
    var total_gueris = ""
    var total_non_gueris = ""
    var total_deces = ""

    var totalex = []
    var totawex = []

    const fetchData = async () => {
        const result = await axios.get(siteLocal);
        return cheerio.load(result.data);
    };


    const getResults = async () => {
        const $ = await fetchData();
        
        $('tr.sgXwHf.Iryyw > td.l3HOY').each((index, element) => {
            totawex.push($(element).text())
            //console.log($(element).text())
        })

        $('tr.sgXwHf.ROuVee > td.l3HOY').each((index, element) => {
            totalex.push($(element).text())
            //console.log($(element).text())
        })
        //total_cas = $('h4.heading.text-danger').text()
        total_non_gueris = $('h4.heading.text-success').text()
        total_gueris = $('h4.heading').text()

        console.log(totalex)
        //console.log(total_gueris)
        //console.log(total_non_gueris)

        return {
            totalex: totalex,
            totawex: totawex
        }
    };


    const total = await getResults()

    totalex = total.totalex
    totawex = total.totawex



    var statlocal = {
        codeStat: StatLocal.gencodeStat(),
        totalCas: parseFloat(removeExtraEspace(totalex[0])),
        totalGueris: parseFloat(removeExtraEspace(totalex[2])),
        totalNonGueris: parseFloat(removeExtraEspace(totalex[0]))-parseFloat(removeExtraEspace(totalex[2])),
        totalDeces: parseFloat(removeExtraEspace(totalex[3])),
        source: siteLocal
    }

    var statnonlocal = {
        codeStat: StatNonLocal.gencodeStat(),
        totalCas: parseFloat(removeExtraEspace(totawex[0])),
        totalGueris: parseFloat(removeExtraEspace(totawex[2])),
        totalNonGueris: parseFloat(removeExtraEspace(totawex[0]))-parseFloat(removeExtraEspace(totawex[2])),
        totalDeces: parseFloat(removeExtraEspace(totawex[3])),
        source: siteLocal
    }
    

    StatLocal.create(statlocal, (msg) => {
        console.log(msg)
    })

    StatNonLocal.create(statnonlocal, (msg) => {
        console.log(msg)
    })

    //console.log(removeExtraEspace(totawex[0]))
    //console.log(getResultsLocal())

    res.json(total)
});

module.exports = router;