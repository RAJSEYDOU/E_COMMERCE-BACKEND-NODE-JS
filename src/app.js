 const express = require('express');
 const bodyParser = require('body-parser')
 const cors = require('cors')
 require('dotenv').config()
 const port = process.env.PORT

 const app = express();
 const Router = require('../article/article.js')
 const Routerauth = require('../authentification/auth.js')
 const decoded = require('../authentification/auth-verification')

 const mongoose = require('./bdd.js')


 app.use(bodyParser.json())
 app.use(bodyParser.urlencoded({ extended: true }))
 app.use(cors({ origin: '*' }))

 app.use('/article', Router)
 app.use('/', Routerauth)

 app.listen(port, function() {
     console.log(`listenning on port:${port}`)
 })