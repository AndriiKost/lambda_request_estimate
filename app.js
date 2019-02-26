'use strict'
const express = require('express')
const app = express()
const AWS = require('aws-sdk')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const config = require('./config/database');
const Estimate = require('./models/estimate.model')

AWS.config.loadFromPath('./aws.config.json')

// Connect to DB and handle errors
mongoose.connect(config.database, { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
    console.log(`Connected to database ${config.database}`);
});
mongoose.connection.on('error', (err) => {
    console.log('database error '+err);
});

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/new-estimate', (req, res, next) => {
    const newEstimate = new Estimate ({
        name: req.body.name,
        email: req.body.email,
        projectCost: req.body.projectCost,
        projectDuration: req.body.projectDuration
    })
    newEstimate.save((err) => {
        if (err) {
          console.log(err)
          return next(err)
        }
        res.status(200)
        return res.send(newEstimate)
      })  
})

module.exports = app