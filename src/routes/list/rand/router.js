const express = require('express')
const router = express.Router()

const rand = require('./rand')
/**
 * List router connection
 * @memberof module:router~mainRouter
 * @inner
 * @namespace randRouter
 */

// Created router routes connection
router.get('', rand)

module.exports = router
