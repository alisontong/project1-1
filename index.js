// server.js



mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/YOUR_LOCAL_DATABASE_NAME' // plug in the db name you've been using
);

app.listen(process.env.PORT || 3000);