const Sequelize = require('sequelize')
const db = require('./database')

const Coffee = db.define('coffee', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  ingredients: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: [],
  },
})

Coffee.prototype.getIngredients = function () {
  return this.ingredients.join(', ')
}


Coffee.findByIngredient = function (ingredient) {
  const arrOfNames = Coffee.findAll({
    where: {
      ingredients: {
        [Sequelize.Op.contains]: [ingredient]
      }
    }
  })
  return arrOfNames;
}


Coffee.beforeSave(function(coffee){
  if (!coffee.ingredients.includes('love')) {
    coffee.ingredients.push('love')
  }
})

// before save function here:


module.exports = Coffee
