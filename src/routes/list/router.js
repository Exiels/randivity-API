const express = require('express')
const router = express.Router()

const list = require('./list')
const items = require('./items/router')
const rand = require('./rand/router')

/**
 * List router connection
 * @memberof module:router~mainRouter
 * @inner
 * @namespace listRouter
 */

// Created router routes connection
router.get('', list.getLists)
router.post('', list.postList)
router.delete('', list.deleteList)

router.use('/items', items)
router.use('/rand', rand)

module.exports = router
