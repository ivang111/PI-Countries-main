router.get("/allTypes", async (req, res) => {
    /*
      trae los datos de la api la remaneja y arma un array
      con los dietas.
      Luego carga la tabla dietas
    */
    try {
      let apiDiet = await getAllDietas();
      const dietas = await Diet.bulkCreate(apiDiet);
      res.json("Se cargó la tabla de Diet correctamente.").status(200);
    } catch (e) {
      res.send(e).status(400);
    }
  });



// ruter.get("/start", async (req, res) =>{
//     try {
//         const dataOne = await Countries.findAll({
//           attributes: ['id', 'name', 'flag', 'continents', 'capital', "area", "population" ]
//         })
//         if(dataOne.length > 100) return res.send(dataOne)
//         const dataApi = await axios.get(`https://restcountries.com/v3/all`)
//         let  allCountries = dataApi.data.map( (d) => {
//             return {
//                 id: d.cca3,
//                 name: d.name.common,
//                 flag: d.flags[1],
//                 continents: d.region,
//                 capital: (d.capital) ? d.capital  : "Has no capital",
//                 subregion: d.subregion,
//                 area: parseInt(d.area),
//                 population: parseInt(d.population),
//             }
//         })
//         console.log("dataByAPi:", allCountries)
//         res.send(allCountries)
//     }catch (error){
//         res.send(error).status(400);
//     } 
// })

const { Router } = require('express');
const { Activities, Countries } = require('../db')
const router = Router();


router.post('/', async (req, res, next)=> { 
    try {
        const { name, dificulty, duration, season, selectedCountries } = req.body;
        const newActivity = await Activities.findOrCreate({ 
            where: { 
                name, 
                dificulty,
                duration, 
                season 
            } 
        })
        // console.log("----------ACTIVIDAD CREADA?---> " + newActivity[1])
        await newActivity[0].addCountries(selectedCountries);  //pais
        let response = await Activities.findByPk(newActivity[0].id, {
            include: Countries // active
        })  
        res.status(201).send(response)
    } catch(error){
        next(error);
    } 
})

router.delete('/:id', async (req, res, next)=> { 
    try {
        const id = req.params.id;
        // console.log("-----Action-delete-activity-id: " + id)
        const deleted = await Activities.destroy({ where: { id: id } });
        const remainingActivities = await Activities.findAll({
            include: Countries
        });    
        res.send(remainingActivities)
    } catch(error){
        next(error);
    } 
    
})

router.get('/', async (req, res, next)=>{
    // console.log("----activities--get---")
    try {
        const acti = await Activities.findAll({
            include: Countries
        })
        if(acti.length) {
            // console.log("---CON actividades---")
            return res.send(acti)
        }else{ 
            // console.log("---SIN actividades---")
            return res.sendStatus(404)
        }
    } catch (error) { 
        next(error)
    }
})

router.get('/:id', async (req, res, next)=>{
  // console.log("----activities--get-with-:id--")
    try {
        let id = req.params.id;
        if(id){
          // console.log("----BACK-filter-by-activity----" + id)    
            const atci = await Activities.findByPk(id,{
                include: Countries
            })
            // console.log("---Countries with Activity from back---")
            // console.log(acti)
            res.send(atci)
        }else{
            const acti = await Activities.findAll()
            if(acti.length) {
              // console.log("---CON actividades---")
                return res.send(acti)
            }else{ 
              // console.log("---SIN actividades---")
                return res.sendStatus(404)
            }
        }
        
    } catch (error) {
        next(error)
    }
})

module.exports = router;

router.post('/', async (req, res) =>{
  try {
      let createActivity = await Activities.create(
             req.body[0]
      )
      
          req.body[1].forEach(async e =>{
          const CountriesPush = await Countries.findOne({
              where: { alpha3Code: e }
          })
          
           createActivity.addCountries(CountriesPush)
      })
      console.log(createActivity)
      res.json(createActivity)
  } catch (e) {
      res.status(404).send(e)
  }
})

router.post("/recipe", async function (req, res) {
  
    try {
      const { name, summary, score, healthScore, steps, dietTypes,  } =
        req.body;
      const [newRecipe, created] = await Recipe.findOrCreate({
        where: { name: name },
        defaults: {
          summary: summary,
          score: score,
          healthScore: healthScore,
          steps: steps,
          dietTypes: dietTypes,
          // dishTypes: dishTypes
        },
      });
  
      let TipoDieta = dietTypes.split(",");
  
      for (let i = 0; i < dietTypes.length; i++) {
        let dietTypesRecipeDb = await Diet.findAll({
          where: { name: TipoDieta[i] },
        });
        await newRecipe.addDiet(dietTypesRecipeDb);
      }
  
      res.status(200).json(newRecipe);
    } catch (e) {
      res.send(e);
    }
  });

  router.post("/dog", async (req, res, next) => {
    try {
      let { temperament, name, image, height, weight, years } = req.body;
      const [newRaza, created] = await Raza.findOrCreate({
        where: { name: name },
        defaults: {
          temperament: temperament,
          image: image,
          height: height,
          weight: weight,
          years: years,
        },
      });
  
      let TipoTemperamento = temperament.split(",");
      console.log(TipoTemperamento);
      for (let i = 0; i < TipoTemperamento.length; i++) {
        let temperamentoArrayDB = await Temperamento.findAll({
          where: { temperament: TipoTemperamento[i] },
        });
  
        await newRaza.addTemperamento(temperamentoArrayDB);
        console.log(temperamentoArrayDB);
      }
  
      res.status(201).json({ newRaza, created });
    } catch (e) {
      next(e);
    }
  });