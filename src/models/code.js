/**
 * @module models
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// We create the Schema for code and we setup the required variables

/**
 * Code schema, containing code and creationDate
 * @constructor Code
 */
const codeSchema = new Schema({
  code: {
    type: String,
    required: true
  },
  creationDate: {
    type: Date,
    required: true
  },
  note: {
    type: String
  }
})

// We create code collection from codeSchema
const Code = mongoose.model('code', codeSchema)

module.exports = { Code }
