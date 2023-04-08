/**
 * @memberof module:router~mainRouter~itemsRouter
 * @inner
 * @namespace items
 */

const { List } = require('../../../models/list')
const { Items, validateItems } = require('../../../models/items')
const mongoose = require('mongoose')

/**
 * Get items function
 * @name GET /items
 * @function
 * @memberof module:router~mainRouter~itemsRouter~items
 * @inner
 * @async
 * @param {Object} req
 * @param {Object} res
 * @returns 200 if OK and return all competencies in db
 * @returns 500 if Internal Server Error
 */
exports.getItems = async (req, res) => {
  try {
    const data = []
    const listId = req.body.listId
    if (!listId) {
      return res.status(400).json({ message: 'Missing listId' })
    }
    if (!mongoose.isValidObjectId(listId)) {
      return res.status(400).json({ message: 'Invalid listId' })
    }
    const list = await List.findById(listId)
    if (list === undefined || list === null || list.length === 0) {
      return res.status(400).json({ message: 'Invalid listId' })
    }
    const items = list.items
    for (const element of items) {
      const item = await Items.findById(element)
      const json = {
        _id: item._id,
        name: item.name,
        author: item.author,
        description: item.description,
        maxParticipants: item.maxParticipants,
        price: item.price,
        address: item.address
      }
      data.push(json)
    }
    return res.status(200).json(data)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

/**
 * Get all items function
 * @name GET /items/all
 * @function
 * @memberof module:router~mainRouter~itemsRouter~items
 * @inner
 * @async
 * @param {Object} req
 * @param {Object} res
 * @returns 200 if OK and return all competencies in db
 * @returns 500 if Internal Server Error
 */
exports.getAllItems = async (req, res) => {
  try {
    const items = await Items.find()
    return res.status(200).json(items)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

/**
 * Post items function
 * @name POST /items
 * @function
 * @memberof module:router~mainRouter~itemsRouter~items
 * @inner
 * @async
 * @param {Object} req
 * @param {Object} res
 * @returns 200 if OK and return all competencies in db
 * @returns 500 if Internal Server Error
 */
exports.postItems = async (req, res) => {
  try {
    const { error } = validateItems(req.body)
    if (error) { return res.status(400).send(error.details[0].message) }

    const list = await List.findById(req.body.listId)
    if (list === undefined || list === null || list.length === 0) {
      return res.status(400).json({ message: 'Invalid listId' })
    }

    const itemCheck = await Items.findOne({ name: req.body.name })
    if (itemCheck !== undefined && itemCheck !== null && itemCheck.length !== 0) {
      return res.status(409).json({ message: 'Item already Exist' })
    }

    const item = new Items({
      name: req.body.name,
      author: req.body.author,
      description: req.body.description,
      maxParticipants: req.body.maxParticipants,
      price: req.body.price,
      address: req.body.address
    })
    await item.save()
    list.items.push(item._id)
    await list.save()
    return res.status(201).json({ message: 'Item created' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

/**
 * Patch items function
 * @name PATCH /items
 * @function
 * @memberof module:router~mainRouter~itemsRouter~items
 * @inner
 * @async
 * @param {Object} req
 * @param {Object} res
 * @returns 200 if OK and return all competencies in db
 * @returns 500 if Internal Server Error
 */
exports.patchItems = async (req, res) => {
  try {
    const { error } = validateItems(req.body)
    if (error) { return res.status(400).send(error.details[0].message) }

    const list = await List.findById(req.body.listId)
    if (list === undefined || list === null || list.length === 0) {
      return res.status(400).json({ message: 'Invalid listId' })
    }

    const item = await Items.findById(req.body.itemId)
    if (item === undefined || item === null || item.length === 0) {
      return res.status(400).json({ message: 'Invalid itemId' })
    }

    item.name = req.body.name
    item.author = req.body.author
    item.description = req.body.description
    item.maxParticipants = req.body.maxParticipants
    item.price = req.body.price
    item.address = req.body.address
    await item.save()

    const lists = await List.find()
    for (const element of lists) {
      const items = element.items
      while (items.includes(item._id)) {
        const index = items.indexOf(item._id)
        items.splice(index, 1)
        await element.save()
      }
    }
    list.items.push(item._id)
    await list.save()
    return res.status(200).json({ message: 'Item modified' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

/**
 * Delete items function
 * @name DELETE /items
 * @function
 * @memberof module:router~mainRouter~itemsRouter~items
 * @inner
 * @async
 * @param {Object} req
 * @param {Object} res
 * @returns 200 if OK and return all competencies in db
 * @returns 500 if Internal Server Error
 */
exports.deleteItems = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.body.id)) {
      return res.status(400).json({ message: 'Invalid id' })
    }

    const item = await Items.findById(req.body.id)
    if (item === undefined || item === null || item.length === 0) {
      return res.status(404).json({ message: 'Item not found' })
    } else {
      await Items.findByIdAndRemove(req.body.id)
      const lists = await List.find()
      for (const element of lists) {
        const items = element.items
        while (items.includes(req.body.id)) {
          const index = items.indexOf(req.body.id)
          items.splice(index, 1)
          await element.save()
        }
      }
    }

    return res.status(200).json({ message: 'Item deleted' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
