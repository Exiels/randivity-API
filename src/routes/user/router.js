const express = require('express')
const router = express.Router()

const auth = require('../../middleware/auth')

const login = require('./login')
const changePassword = require('./changePassword')

/**
 * User router connection
 * @memberof module:router~mainRouter
 * @inner
 * @namespace userRouter
 */

// Created router routes connection
router.post('/login', login)
router.patch('/password', auth, changePassword)

module.exports = router
