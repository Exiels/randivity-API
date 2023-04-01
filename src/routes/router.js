/**
 * @module router
 * @requires express
 */
const express = require('express')
const router = express.Router()

const loginRouter = require('./user/router')

/**
 * Main router connection
 * @namespace mainRouter
 */

router.use('/user', loginRouter)

module.exports = router
