/**
 * @memberof module:router~mainRouter~userRouter
 * @inner
 * @namespace login
 */
const { Users } = require('../../models/user')
const bcrypt = require('bcryptjs')

/**
 * Main changePassword function
 * @name PATCH /user/password
 * @function
 * @memberof module:router~mainRouter~userRouter~changePassword
 * @inner
 * @async
 * @param {Object} req
 * @param {Object} res
 * @returns 401 if invalid username or password
 * @returns 200 if OK and return access token and role name
 * @returns 500 if Internal Server Error
 */
module.exports = async (req, res) => {
  try {
    // Verif received data
    const user = await Users.findById(req.user)
    if (!user) {
      return res.status(500).json({ message: 'Internal Server Error' })
    }

    // Change password
    await bcrypt.hash(req.body.password, 10).then(async (hash) => {
      user.password = hash

      // Save the user
      await user.save()
    })
    return res.status(200).json({ message: 'OK' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
