const { Router } = require('express');
const { Activities, Countries } = require('../db')
const router = Router();

router.post("/", async (req, res) => {
   
    try {
      const { name, dificulty, duration, season, selecCountry, activitySelect } = req.body;
      const[ newActivity, created] = await Activities.findOrCreate({
        where: { name: name },//verifica que no se repita el valor 
        defaults: {
          dificulty: dificulty,
          duration: duration, 
          season: season, 
          //selecCountry: selecCountry,
        }
      });
      //console.log(newActivity)
    //let countryArr = selecCountry.split(", ");
    for (let i = 0; i<activitySelect.length; i++) {
      let ContriApiBD = await Countries.findAll({
        where: { id: activitySelect[i].trim() },
      });
      await newActivity.addCountries(ContriApiBD);
    }

    res.status(200).json(newActivity);
  } catch (e) {
    res.send(e);
  }
});

router.get("/", async  (req, res) => {
  try {
    const activities = await Activities.findAll({
      attributes: [ "id", "name", "dificulty", "duration", "season",  ],
      include: { model: Countries }
    })
    return res.json(activities).status(200)

  }catch (error) {
    next(error);
}
})

 


module.exports = router;