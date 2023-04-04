/**
 * @module models
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Joi = require('joi')

// We create the Schema for list and we setup the required variables

/**
 * List schema, containing name, items
 * @constructor List
 */
const listSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  items: [{
    type: mongoose.Types.ObjectId,
    ref: 'items'
  }]
})

// We create list collection from codeSchema
const List = mongoose.model('list', listSchema)

// We check if all required variables are here

const validateList = (list) => {
    const schema = Joi.object({
      name: Joi.string().required()
    })
    return schema.validate(list)
  }

module.exports = { List, validateList }
