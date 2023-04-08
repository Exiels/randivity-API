/**
 * @memberof module:router~mainRouter~randRouter
 * @inner
 * @namespace rand
 */

const { List, validateList } = require('../../../models/list')
const { Items, validateItems } = require('../../../models/items')
const mongoose = require('mongoose')

/**
 * Get rand function
 * @name GET /rand
 * @function
 * @memberof module:router~mainRouter~randRouter~rand
 * @inner
 * @async
 * @param {Object} req
 * @param {Object} res
 * @returns 200 if OK and return all competencies in db
 * @returns 500 if Internal Server Error
 */
module.exports = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.body.id)) {
        return res.status(400).json({ message: 'Invalid listId' })
    }
    const list = await List.findById(req.body.id)
    if (list === undefined || list === null || list.length === 0) {
      return res.status(400).json({ message: 'Invalid listId' })
    }
    const items = list.items
    const nbItems = items.length
    const itemIndex = Math.floor(Math.random() * (nbItems))
    const itemId = items.at(itemIndex)

    const item = await Items.findById(itemId)
    return res.status(200).json(item)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}