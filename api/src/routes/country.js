const { Router } = require('express');
const axios = require('axios')
const { Countries, Activities} = require('../db');
//const express = require("express");
const { Op } = require("sequelize");
const router = Router();
//router.use(express.json());

//starting database//
router.get('/start', async (req, res, next)=>{
  
  try {
      const dataOne = await Countries.findAll({
          attributes: ['id', 'name', 'flag', 'continents', 'capital', "subregion", "area", "population" ]
      })  
      if(dataOne.length > 100) return res.send(dataOne) 
        const dataApi = await axios.get('https://restcountries.com/v3/all' ) 
        let  allCountries = dataApi.data.map( d => { 
            //solution capital [] || Null //
            return {
                id: d.cca3,
                name: d.name.common,
                flag: d.flags[1], 
                continents: d.region,
                capital: (d.capital) ? d.capital[0] : "Has no capital",
                subregion: d.subregion,
                area: parseInt(d.area),
                population: parseInt(d.population),
            }  
        })
        allCountries.forEach(async (c) => {  
            await Countries.create({
                id: c.id,
                name: c.name,
                flag: c.flag,
                continents: c.continents,
                capital: c.capital,
                subregion: c.subregion,
                area: c.area,
                population: c.population,
        })
          
      })
      
      // console.log("DB-CREADA")
      const countries = await Countries.findAll({
        attributes: ['id', 'name', 'flag', 'continents', 'capital', "subregion", "area", "population" ]
     });
      // console.log(countries)
      return res.send(countries) 
  }catch (error) {
      next(error);
  } 
});

//get by Name or All//
router.get("/", async (req, res, next) => {
   
    let {name} = req.query
    if(name){   
        try {
            const countries = await Countries.findAll({
                where:{
                    name: { [Op.iLike]: `%${name}%` }
                },
                attributes: { include: ['id', 'name', 'flag', 'continents', 'capital', "subregion", "area", "population" ]
                },
            })
            if(countries.length>0) return res.send(countries)
            else { res.status(404).send('Country not found')}
        } catch (error) {
            next(error);
        }
    }else{    
        try {
            const countries = await Countries.findAll({
                attributes: ['id', 'name', 'flag', 'continents', 'capital', "subregion", "area", "population" ]
            })
            return res.send(countries)
        } catch (error) {
            next(error);
        }
    }
})

//get by requested ID//
router.get('/:idPais', async function (req, res) {
    try {
        let { idPais } = req.params
        let country = await Countries.findByPk(
            idPais.toUpperCase(),
            { include: { model: Activities } }
        )
        country ? res.json(country) : res.sendStatus(404)
    } catch (error) {
        res.status(505).send(error)
    }
}) 



module.exports = router;