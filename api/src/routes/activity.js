const { Router } = require('express');
const { Activities, Countries } = require('../db')
const router = Router();

router.post("/activity", async (req, res) => {
   
    try {
      const { name, dificulty, duration, season, selecCountry } = req.body;
      const[ newActivity, created] = await Activities.findOrCreate({
        where: { name: name },//verifica que no se repita el valor 
        defaults: {
          dificulty: dificulty,
          duration: duration, 
          season: season, 
          selecCountry: selecCountry,
        }
      });
      //console.log(newActivity)
    let countryArr = selecCountry.split(",");
    for (let i = 0; i<countryArr.length; i++) {
      let ContriApiBD = await Countries.findAll({
        where: { name: countryArr[i] },
      });
      await newActivity.addCountries(ContriApiBD);
    }

    res.status(200).json(newActivity);
  } catch (e) {
    res.send(e);
  }
});
  

module.exports = router;