/**
 * @module router
 * @requires express
 */
const express = require('express')
const router = express.Router()

const loginRouter = require('./user/router')
const adminRouter = require('./admin/router')

/**
 * Main router connection
 * @namespace mainRouter
 */

router.use('/user', loginRouter)
router.use('/admin', adminRouter)

module.exports = router
