const router = require('express').Router()
const app = require('../app')
const {Coffee} = require('../models')

// Your code here!

router.get('/', async (req, res, next) => {
  const listOfCoffees = await Coffee.findAll()

  if (listOfCoffees) {
    res.send(listOfCoffees)
  }
  else {
    throw 'No Coffee found'
  }
})
router.get('/:id', async (req, res, next) => {
  try {
  const coffee = await Coffee.findOne({
    where:
    {id: req.params.id}
  })
  if (coffee) {
    res.send(coffee)
  }
  else {
    res.status(404).send('Couldnt be found')
  }
}
  catch (err) {
    next(err)
  }
})

router.get('/ingredients/:ingredientName', async (req, res, next) => {
  const arr = await Coffee.findByIngredient(req.params.ingredientName)
  res.send(arr);
})

router.post('/', async (req, res, next) => {
  try {
     const {name, ingredients} = req.body
     const newCoffee = {}
     if (name) newCoffee.name = name
     if (ingredients) newCoffee.ingredients = ingredients
     const createdDrink = await Coffee.create(newCoffee)
     res.status(201).send(createdDrink)
  } catch (error) {
     next(error)
  }
})




// Remember that these routes are already mounted on
// /api/coffee!

module.exports = router
