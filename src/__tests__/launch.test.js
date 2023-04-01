const request = require('supertest')
const mongoose = require('mongoose')

const server = require('./serverUtils/testServer')

describe('Launch Routes', () => {
  let app

  beforeAll(async () => {
    app = await server.testServer()
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  describe('Check if lauched', () => {
    it('GET /', async () => {
      return await request(app)
        .get('/')
        .expect(404)
    })
  })
})
