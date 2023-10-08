const express = require('express')
const route = express.Router()

const {
 login,
 register
} = require('./userController')

route.post('/login', login)
route.post('/register', register)

module.exports = route