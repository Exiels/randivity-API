/**
 * @memberof module:router~mainRouter~adminRouter
 * @inner
 * @namespace code
 */

const { Code } = require('../../../models/code')
const randomstring = require('randomstring')

/**
 * Main code function
 * @name post /admin/code
 * @function
 * @memberof module:router~mainRouter~adminRouter~code
 * @inner
 * @async
 * @param {Object} req
 * @param {Object} res
 * @returns 200 if OK and return list of codes
 * @returns 500 if Internal Server Error
 */
module.exports = async (req, res) => {
  try {
    const code = new Code({
      code: randomstring.generate(7),
      creationDate: Date.now(),
      note: req.body.note || ''
    })
    await code.save()

    return res.status(200).json(code)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
