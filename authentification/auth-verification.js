const jwt = require('jsonwebtoken')
const user = require('../model/user-model.js')


const decoded = async function(req, res, next) {
    try {

        // // const token = req.header('auth-token')

        // if (!token) return res.status(404).send('ACCES REFUSE')

        // const verified = jwt.verify(token, 'tokenvalidation')

        const User = await user.find({ _id: verified._id, tokens: token })

        // if (!User) { throw new Error('invalid user') }

        // req.User = User;

        next()

    } catch (error) {
        res.status(400).send(error)
    }

}

module.exports = decoded;