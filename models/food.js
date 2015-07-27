var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FoodSchema = new Schema({
  name: String,
  price: String,
  description: String,
  picture: String,
  
});


var Food = mongoose.model('Food', FoodSchema);



module.exports = Food;
