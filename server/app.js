const express = require('express'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    bodyParser= require('body-parser');

const indexRouter = require('./routes/index'),
    usersRouter = require('./routes/users'),
    app = express();

mongoose.connect('mongodb://localhost:27017/victory-quotes');

app
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(cors());

app
  .use('/', indexRouter)
  .use('/users', usersRouter);

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
})