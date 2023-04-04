const express = require('express')
const router = express.Router()

const auth = require('../../middleware/auth')
const code = require('../../middleware/code')

const list = require('./list')

/**
 * List router connection
 * @memberof module:router~mainRouter
 * @inner
 * @namespace listRouter
 */

// Created router routes connection
router.get('', code, list.getLists)
router.post('', code, list.postList)
router.delete('', code, list.deleteList)

module.exports = router
