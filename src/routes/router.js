/**
 * @module router
 * @requires express
 */
const express = require('express')
const router = express.Router()

const loginRouter = require('./user/router')
const adminRouter = require('./admin/router')
const listRouter = require('./list/router')

/**
 * Main router connection
 * @namespace mainRouter
 */

router.use('/user', loginRouter)
router.use('/admin', adminRouter)
router.use('/list', listRouter)

module.exports = router
