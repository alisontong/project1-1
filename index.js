var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    _ = require("underscore");

mongoose.connect('mongodb://localhost/test');
var Food = require('./models/food');

app.use(bodyParser.urlencoded({extended: true}));


app.use(express.static(__dirname + '/public'));


var foods =[
  {id:1, name:"Gongbaojiding", price:15,  description: "It is one of the most famous Sichuan dish in China. It is made of chicken, cucumber, chilli pepper, peanuts and sugar. People who love authentic Sichuan style food would find it very delicious."},
  {id:2, name:"Shuizhuyu", price:18, description:"It is made of fish and vegetables. For people who like delicately cooked tender fish, this dish will be a great choice."}
];
var totalFoodCount = 5;

 

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});


app.get('/api/foods', function (req, res) {
  
  Food.find(function(err,foods){
    res.json(foods);
  });
});


app.post('/api/foods', function (req, res) {
  var newFood = new Food({
    name: req.body.name,
    price:req.body.price,
    description:req.body.description
  });
  newFood.save(function(err,savedFood){
    res.json(savedFood);
  });
});
  

app.get('/api/foods/:id', function (req, res) {
  var targetId = req.params.id;

  Food.findOne({_id: targetId}, function (err, foundFood) {
    res.json(foundFood);
  });
});


app.put('/api/foods/:id', function(req, res) {

  var targetId = req.params.id;

  Food.findOne({_id:targetId},function(err,foundFood){
    foundFood.name = req.body.name;
    foundFood.price = req.body.price;
    foundFood.description = req.body.description;

    foundFood.save(function(err,savedFood){
      res.json(savedFood);
    });
  });
});

app.delete('/api/foods/:id', function (req, res) {
 
  var targetId = req.params.id;

  Food.findOneAndRemove({_id: targetId}, function (err, deletedFood) {
    res.json(deletedFood);
  });
});


mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/YOUR_LOCAL_DATABASE_NAME' // plug in the db name you've been using
);

app.listen(process.env.PORT || 3000);