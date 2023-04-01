const request = require('supertest')
const mongoose = require('mongoose')

const server = require('./serverUtils/testServer')
const { dbConnection } = require('../config/db')

describe('Config tests', () => {
  describe('Check if lauched', () => {
    let app

    beforeAll(async () => {
      app = await server.testServer()
    })

    afterAll(async () => {
      await mongoose.connection.close()
    })
    it('GET /', async () => {
      return await request(app)
        .get('/')
        .expect(404)
    })
  })

  describe('Check database connection', () => {
    it('Bad database connection', async () => {
      process.env.DB_HOST = "Nope"
      let val = await dbConnection('test')
      expect(val).toBeFalsy()
    }, 31000)
  })
})
