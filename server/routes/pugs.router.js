const router = require('express').Router()
const {Pug} = require('../models')

// Your code here!

router.get('/', async (req, res) => {
  const allPugs = await Pug.findAll();
  res.status(200).send(allPugs)
})

router.get('/favoriteCoffee/:favoriteCoffeeName', async (req, res) => {
  try {
  const favCoffee = req.params.favoriteCoffeeName;
  const listOfPugFavs = await Pug.findByCoffee(favCoffee)
  res.send(listOfPugFavs)

} catch (error) {
  console.log(error)
}
})

router.get('/:pugId', async (req,res, next) => {
  try {
  const particularPug = await Pug.findOne({
    where:
    {id: req.params.pugId}
  })
  if (particularPug){
  res.send(particularPug)
  }
  else {
    res.status(404).send('Couldnt be found')
  }
  }
  catch (error) {
      next(error)
   }
})

router.post('/', async (req,res,next) => {
  try {
    const {name} = req.body
    const newPugAdded = await Pug.create({name})
    res.status(201).send(newPugAdded)
 } catch (error) {
    next(error)
 }
})


router.put('/:pugId', async (req,res,next) => {
  try {
    const specificPug = await Pug.findByPk(req.params.pugId)
    if (!specificPug) {
      res.status(404).send('Cant Find this pug')
    }
    else{
    await specificPug.update(req.body)
    res.status(200).send(specificPug)
    }
  }
  catch (err) {
    next(err)
  }
})

router.delete('/:pugId', async (req,res,next) => {
  try {
    const deletePug = await Pug.findByPk(req.params.pugId)
    if (!deletePug) {
      res.status(404).send('Cant Find this pug')
    }
    else {
      const deletingDone = await Pug.destroy({where: {
        id: req.params.pugId
      }})
      if (deletingDone) {
        res.sendStatus(204)
      }
      else{
        res.sendStatus(404)
      }
    }
  }
  catch (err) {
    next(err)
  }

})

// Remember that these routes are already mounted on
// /api/pugs!

module.exports = router
