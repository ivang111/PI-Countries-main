const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const { Country, Activity, country_activity } = require("../db.js");

const { Op } = require("sequelize");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//GET ALL//
const dataLand = async () => {
    
}; 

router.get("/all", async (req, res) => {
    const dataArr = await axios.get("https://restcountries.com/v3.1/all");
    res.send(dataArr.data.results);


})


module.exports = router;
