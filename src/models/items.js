/**
 * @module models
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

// We create the Schema for items and we setup the required variables

/**
 * Items schema, containing name, items
 * @constructor items
 */
const itemsSchema = new Schema({
  name: {
    type: String,
    required: true 
  },
  author: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  maxParticipants: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  }
})

// We create list collection from codeSchema
const Items = mongoose.model('items', itemsSchema)

// We check if all required variables are here
const validateItems = (items) => {
  const schema = Joi.object({
    listId: Joi.objectId().required(),
    name: Joi.string().required(),
    author: Joi.string().required(),
    description: Joi.string().required(),
    maxParticipants: Joi.number().required(),
    price: Joi.number().required(),
    address: Joi.string().required(),
    itemId: Joi.objectId()
  })
  return schema.validate(items)
}

module.exports = { Items, validateItems }
