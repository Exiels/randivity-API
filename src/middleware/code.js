/**
 * @module middlewares
 */
const { Code } = require('../models/code')

/**
 * Main code middleware function
 * @name Code Middleware
 * @function
 * @memberof module:middlewares
 * @inner
 * @async
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns 403 if there is no token sent
 * @returns 400 if the token is invalid
 */
module.exports = async (req, res, next) => {
  try {
    const code = req.header('server-code')

    if (!code) {
        return res.status(403).json({ message: 'Access Denied' })
    }
    const codeCheck = await Code.findOne({ code: code})
    if (codeCheck === undefined || codeCheck === null || codeCheck.length === 0) {
        return res.status(400).json({ message: 'Invalid server code' })
    }
    next()
  } catch (error) {
    console.error(error)
    res.status(400).json({ message: 'Invalid server code' })
  }
}
