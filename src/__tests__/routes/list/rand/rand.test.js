const request = require('supertest')
const mongoose = require('mongoose')

const server = require('../../../serverUtils/testServer')
const dbDefault = require('../../../../config/db.default')

describe('rand routes tests', () => {
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

  describe('Rand route', () => {
    it('GET /rand => Get random item from a list', async () => {
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
      await request(app)
        .post('/list/items')
        .set({
          'server-code': code
        })
        .send({
          listId: id,
          name: 'testItem',
          author: 'Exiel',
          description: 'Test item as example',
          maxParticipants: 2,
          price: 2,
          address: 'test address'
        })
        .expect('Content-Type', /json/)
        .expect(201)

      await request(app)
        .get('/list/rand')
        .set({
          'server-code': code
        })
        .send({
          id
        })
        .expect('Content-Type', /json/)
        .expect(200)
    })

    it('GET /rand => Get random item from a list invalid objectId', async () => {
      let code
      let key

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
        .get('/list/rand')
        .set({
          'server-code': code
        })
        .send({
          id: 'test'
        })
        .expect('Content-Type', /json/)
        .expect(400)
    })

    it('GET /rand => Get random item from a list invalid listId', async () => {
      let code
      let key

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
        .get('/list/rand')
        .set({
          'server-code': code
        })
        .send({
          id: '642e290d175f702decad1910'
        })
        .expect('Content-Type', /json/)
        .expect(400)
    })
  })
})
