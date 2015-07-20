var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    _ = require("underscore");
    User = require('./models/user'),
    session = require('express-session'),
    Food = require('./models/food');

mongoose.connect('mongodb://localhost/test');


app.use(bodyParser.urlencoded({extended: true}));

// set session options
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'SuperSecretCookie',
  cookie: { maxAge: 60000 }
}));

// middleware to manage sessions
app.use('/', function (req, res, next) {
  // saves userId in session for logged-in user
  req.login = function (user) {
    req.session.userId = user.id;
  };

  // finds user currently logged in based on `session.userId`
  req.currentUser = function (callback) {
    User.findOne({_id: req.session.userId}, function (err, user) {
      req.user = user;
      callback(null, user);
    });
  };

  // destroy `session.userId` to log out user
  req.logout = function () {
    req.session.userId = null;
    req.user = null;
  };

  next();
});

// signup route (renders signup view)
app.get('/signup', function (req, res) {
  req.currentUser(function (err, user) {
    // redirect if current user
    if (user) {
      res.redirect('/profile');
    } else {
      res.sendFile(__dirname + '/public/views/signup.html');
    }
  });
});

// user submits the signup form
app.post('/users', function (req, res) {

  // grab user data from params (req.body)
  var newUser = req.body.user;

  // create new user with secure password
  User.createSecure(newUser.email, newUser.password, function (err, user) {
    res.redirect('/login');
  });
});

// login route (renders login view)
app.get('/login', function (req, res) {
  req.currentUser(function (err, user) {
    // redirect if current user
    if (user) {
      res.redirect('/profile');
    } else {
      res.sendFile(__dirname + '/public/views/login.html');
    }
  });
});

// user submits the login form
app.post('/login', function (req, res) {

  // grab user data from params (req.body)
  var userData = req.body.user;

  // call authenticate function to check if password user entered is correct
  User.authenticate(userData.email, userData.password, function (err, user) {
    // saves user id to session
    req.login(user);

    // redirect to user profile
    res.redirect('/profile');
  });
});

// user profile page
app.get('/profile', function (req, res) {
  // finds user currently logged in
  req.currentUser(function (err, user) {
    if (user) {
      res.send('Welcome ' + user.email);
    // redirect if there is no current user
    } else {
      res.redirect('/login');
    }
  });
});

// logout route (destroys session)
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/login');
});

// listen on port 3000
app.listen(3000, function () {
  console.log('server started on locahost:3000');
});


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