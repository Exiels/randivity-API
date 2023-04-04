/**
 * @memberof module:router~mainRouter~listRouter
 * @inner
 * @namespace list
 */

const { List, validateList } = require("../../models/list")
const mongoose = require('mongoose')

/**
 * Get list function
 * @name GET /list
 * @function
 * @memberof module:router~mainRouter~listRouter~list
 * @inner
 * @async
 * @param {Object} req
 * @param {Object} res
 * @returns 200 if OK and return all competencies in db
 * @returns 500 if Internal Server Error
 */
exports.getLists = async (req, res) => {
    try {
        const lists = await List.find()
      return res.status(200).json(lists)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
}

/**
 * Post list function
 * @name POST /list
 * @function
 * @memberof module:router~mainRouter~listRouter~list
 * @inner
 * @async
 * @param {Object} req
 * @param {Object} res
 * @returns 200 if OK and return all competencies in db
 * @returns 500 if Internal Server Error
 */
exports.postList = async (req, res) => {
    try {
        const { error } = validateList(req.body)
        if (error) { return res.status(400).send(error.details[0].message)}
        
        const check = await List.findOne({ name: req.body.name })
        if (check !== undefined && check !== null &&  check.length !== 0) {
            return res.status(400).json({ message: 'List already Exist' })
        }
        const list = new List(req.body)
        await list.save();
        return res.status(201).json({ message: 'OK'})
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
}

/**
 * Delete list function
 * @name DELETE /list
 * @function
 * @memberof module:router~mainRouter~listRouter~list
 * @inner
 * @async
 * @param {Object} req
 * @param {Object} res
 * @returns 200 if OK and return all competencies in db
 * @returns 500 if Internal Server Error
 */
exports.deleteList = async (req, res) => {
    try {
        if(!mongoose.isValidObjectId(req.body.id)) {
            return res.status(400).json({ message: 'Invalid id' })
        }
        const list = await List.findById(req.body.id)
        if (list === undefined || list === null || list.length === 0)
            return res.status(404).json({ message: 'List not found' })
        else {
            await List.findByIdAndRemove(req.body.id)
        }
    
      return res.status(200).json({ message: 'OK' })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
}