const express = require('express')
const router = express.Router()

const auth = require('../../middleware/auth')
const codeM = require('../../middleware/code')

const code = require('./code/code')
const codeGenerator = require('./code/codeGenerator')
const codeChecker = require('./code/check')

/**
 * Admin router connection
 * @memberof module:router~mainRouter
 * @inner
 * @namespace adminRouter
 */

// Created router routes connection
router.get('/code', auth, code)
router.post('/code', auth, codeGenerator)
router.get('/code/check', codeM, codeChecker)

module.exports = router
