const { Router } = require('express');
const axios = require('axios')
const { Countries, Activities} = require('../db');
//const express = require("express");
const { Op } = require("sequelize");
const router = Router();
//router.use(express.json());

//starting database//

const createdBD = async () => {
    const dataOne = await Countries.findAll({
       attributes: ['id', 'name', 'flag', 'continents', 'capital', "subregion", "area", "population" ]
        })  
        if(dataOne.length > 100) return res.send(dataOne)
    let firstDataApi = await axios.get(`https://restcountries.com/v3/all`);
    let  allCountries = firstDataApi.data.map( (d) => {
        return{
            id: d.cca3,
            name: d.name.common,
            flag: d.flags[1],
            continents: d.region,
            capital: (d.capital) ? d.capital[0]  : "Has no capital",
            subregion: d.subregion,
            area: parseInt(d.area),
            population: parseInt(d.population),

        }
        
    });
};

router.get("/", async (req, res) => {
    console.log(createdBD())
    const apiCountry = await createdBD();
    const name = req.query.name
    try {
        let countryBD =  await Countries.findAll();
        if (!countryBD.length) await Countries.bulkCreate(apiCountry)
    }catch (e) {
      res.send(e).status(400);
    }
  });
    






// //get by name or all//
router.get("/", async (req, res) => {
    let { name, page } = req.query
    try {
        if(page==="all"){
            let country = await Countries.findAll({
                include: { model: Activities },
            })
            return country ? res.status(200).json(country) : res.sendStatus(404)
        }
        if (name) {
            let country = await Countries.findAll({
                include: { model: Activities },
                where: { name: { [Sequelize.Op.iLike]: `%${name}%` } }
            })  
            return country ? res.json(country) : res.sendStatus(404)
        }

    } catch (e) {
        res.status(505).send(e)
    }
})
 

// //get by requested ID//
// router.get('/:idPais', async function (req, res) {
//     try {
//         let { idPais } = req.params
//         let country = await Countries.findByPk(
//             idPais.toUpperCase(),
//             { include: { model: Activities } }
//         )
//         country ? res.json(country) : res.sendStatus(404)
//     } catch (error) {
//         res.status(505).send(error)
//     }
// }) 



module.exports = router;