const express = require('express');
const Routerauth = express.Router()
const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const user = require('../model/user-model.js')
const decoded = require('../authentification/auth-verification')

// Schema validator
const schema = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()

})

Routerauth.get('/users', async function(req, res) {

    try {
        const adding = await user.find(function(err, docs) {
            console.log(docs)
            res.send(docs)
        })

    } catch (error) {

        res.status(404).send(error)

    }
})

// check if user is admin?   stactics methods
Routerauth.get('/users/admin', async function(req, res) {

    try {
        const adding = await user.getbyadmin(req.query.admin, function(err, docs) {
            res.send(docs)
        })

    } catch (error) {

        res.status(404).send(error)

    }


})



Routerauth.post('/register', async function(req, res) {
    const { error } = schema.validate(req.body)
    if (error) { return res.status(404).send(error.details[0].message) }
    const hashedpassword = await bcrypt.hash(req.body.password, 10)
    const newuser = new user({
        email: req.body.email,
        password: hashedpassword,
        admin: req.body.admin
    })
    try {
        await newuser.generateToken()
        const adding = await newuser.save()
        res.send(adding.userProfile())
    } catch (error) {
        res.status(404).send(error)
    }
})

Routerauth.post('/login', async function(req, res) {
    const { error } = schema.validate(req.body)

    if (error) return res.status(404).send(error.details[0].message)

    const finding = await user.findOne({ email: req.body.email }).exec()
    if (!finding) return res.status(404).send('user not found')
    const comparing = await bcrypt.compare(req.body.password, finding.password)
    if (!comparing) return res.status(404).send('error password')
    const token = await finding.generateToken()

    res.send(finding.userProfile())


})
Routerauth.post('/logout', decoded, async function(req, res) {

    const userlogout = await user.findById(req.User[0]._id)
    await userlogout.logOut()
    console.log(userlogout)
})







module.exports = Routerauth