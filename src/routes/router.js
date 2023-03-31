/**
 * @module router
 * @requires express
 */
const express = require('express')
const router = express.Router()

const test = require('./test/tmp')

/**
 * Main router connection
 * @namespace mainRouter
 */

router.use('/test', test)

module.exports = router
