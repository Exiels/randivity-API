/**
 * @module router
 * @requires express
 */
const express = require('express')
const router = express.Router()

const sanitizer = require('../middleware/sanitize')

const loginRouter = require('./user/router')
const adminRouter = require('./admin/router')

/**
 * Main router connection
 * @namespace mainRouter
 */

router.use('/user', sanitizer, loginRouter)
router.use('/admin', sanitizer, adminRouter)

module.exports = router
