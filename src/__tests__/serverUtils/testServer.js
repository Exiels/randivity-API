const express = require('express')

const router = require('../../routes/router')
const { dbConnection } = require('./config/db')

async function testServer () {
  const dbCo = await dbConnection('test')

  if (dbCo) {
    const app = express()
    app.use(express.json())

    app.use('/', router)

    return app
  }
}

exports.testServer = testServer
