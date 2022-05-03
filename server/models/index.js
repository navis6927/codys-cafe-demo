const db = require('./database')
const Pug = require('./pug.model')
const Coffee = require('./coffee.model')

// VVV assign relations below VVV //
Pug.belongsTo(Coffee, {as: 'favoriteCoffee'});
Coffee.hasMany(Pug);
Pug.hasMany(Pug, {as: 'friends'})


Pug.prototype.isPuppy = function () {
  if (this.age < 1) {
    return true
  }
  else {
    return false
  }
}

Pug.prototype.shortBio = function () {
  return this.biography.split(/[.!?]/)[0];
}

Pug.findByCoffee = async function (coffee) {

  return Pug.findAll({
    include: {
      model: Coffee,
      as: 'favoriteCoffee',
      where: {
        name: coffee
      }
    }
  })
}

Pug.beforeSave(function(pug){

  pug.name = pug.dataValues.name.charAt(0).toUpperCase() + pug.dataValues.name.slice(1);

  }
)








// ^^^ assign relations above ^^^ //

module.exports = {
  db,
  Pug,
  Coffee
}
