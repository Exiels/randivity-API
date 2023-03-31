const express = require('express')

const router = require('../../routes/router')

function testServer () {
  const app = express()
  app.use(express.json())

  app.use('/', router)

  return app
}

exports.testServer = testServer
