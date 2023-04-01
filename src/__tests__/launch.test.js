const request = require('supertest')
const server = require('./serverUtils/testServer')

describe('Launch Routes', () => {
  let app

  beforeAll(async () => {
    app = await server.testServer()
  })

  describe('Check if lauched', () => {
    it('GET /', async () => {
      return await request(app)
        .get('/')
        .expect(404)
    })
  })
})
