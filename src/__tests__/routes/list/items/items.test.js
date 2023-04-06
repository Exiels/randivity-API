const request = require('supertest')
const mongoose = require('mongoose')

const server = require('../../../serverUtils/testServer')
const dbDefault = require('../../../../config/db.default')

describe('items routes tests', () => {
  let app

  beforeAll(async () => {
    app = await server.testServer()
  })

  afterEach(async () => {
    const collections = mongoose.connection.collections
    for (const key in collections) {
      const collection = collections[key]
      collection.deleteMany()
    }
    await dbDefault()
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  describe('Items route', () => {
    it('GET /items => Get list of items from a list', async () => {
      let code
      let key
      let id

      await request(app)
        .post('/user/login')
        .send({
          username: 'admin',
          password: 'admin123'
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          key = response.body.token
        })
      await request(app)
        .post('/admin/code')
        .set({
          'x-auth-token': key
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          code = response.body.code
        })
      await request(app)
        .post('/list')
        .set({
          'server-code': code
        })
        .send({
          name: 'test'
        })
        .expect('Content-Type', /json/)
        .expect(201)
      await request(app)
        .get('/list')
        .set({
          'server-code': code
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          id = response.body[0]._id
        })
      return await request(app)
        .get('/items')
        .set({
          'server-code': code
        })
        .send({
            'listId': id
        })
        .expect('Content-Type', /json/)
        .expect(200)
    })
  })
})
