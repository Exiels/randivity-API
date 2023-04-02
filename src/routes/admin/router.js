const express = require('express')
const router = express.Router()

const auth = require('../../middleware/auth')
const codeM = require('../../middleware/code')

const code = require('./code/code')
const codeGenerator = require('./codeGenerator')
const codeChecker = require('./code/check')

/**
 * User router connection
 * @memberof module:router~mainRouter
 * @inner
 * @namespace adminRouter
 */

// Created router routes connection
router.get('/code', auth, code)
router.post('/generate', auth, codeGenerator)
router.get('/code/check', codeM, codeChecker)

module.exports = router
