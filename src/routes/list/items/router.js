const express = require('express')
const router = express.Router()

const items = require('./items')
/**
 * List router connection
 * @memberof module:router~mainRouter
 * @inner
 * @namespace listRouter
 */

// Created router routes connection
router.get('', items.getItems)
router.get('/all', items.getAllItems)
router.post('', items.postItems)
router.patch('', items.patchItems)
router.delete('', items.deleteItems)

module.exports = router
