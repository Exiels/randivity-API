const express = require('express')

const app = express()
const port = process.env.EXPRESS_PORT
const router = require('./routes/router.js')
const { dbConnection } = require('./config/db')

/**
 * Start the Node.Js server
 */
async function startServer () {
  // Await connection to database
  const dbCo = await dbConnection('randivity')

  if (dbCo) {
    try {
      app.use(express.json())
      // Init router
      app.use('/', router)

      // Start server
      app.listen(port, () => {
        console.log(`INFO: API listening at http://localhost:${port}`)
      })
    } catch (error) {
      console.error('ERROR: index.js error : ', error)
    }
  }
}

startServer()
