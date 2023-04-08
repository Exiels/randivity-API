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
        .get('/list/items')
        .set({
          'server-code': code
        })
        .send({
            'listId': id
        })
        .expect('Content-Type', /json/)
        .expect(200)
    })

    it('GET /items => Get list of items from a list missing listId', async () => {
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
      return await request(app)
        .get('/list/items')
        .set({
          'server-code': code
        })
        .expect('Content-Type', /json/)
        .expect(400)
    })

    it('GET /items => Get list of items from a list invalid objectId', async () => {
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
      return await request(app)
        .get('/list/items')
        .set({
          'server-code': code
        })
        .send({
          'listId': 'test'
        })
        .expect('Content-Type', /json/)
        .expect(400)
    })

    it('GET /items => Get list of items from a list invalid listId', async () => {
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
      return await request(app)
        .get('/list/items')
        .set({
          'server-code': code
        })
        .send({
          'listId': '642e290d175f702decad1910'
        })
        .expect('Content-Type', /json/)
        .expect(400)
    })

    it('GET /items => Get list of all items', async () => {
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
      return await request(app)
        .get('/list/items/all')
        .set({
          'server-code': code
        })
        .expect('Content-Type', /json/)
        .expect(200)
    })

    it('POST /items => Post an item into a list', async () => {
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
        .post('/list/items')
        .set({
          'server-code': code
        })
        .send({
            'listId': id,
            "name": "testItem",
            "author": "Exiel",
            "description": "Test item as example",
            "maxParticipants": 2,
            "price": 2,
            "address": "test address"
        })
        .expect('Content-Type', /json/)
        .expect(201)
    })

    it('POST /items => Post an item into a list invalid listId', async () => {
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
      return await request(app)
        .post('/list/items')
        .set({
          'server-code': code
        })
        .send({
            'listId': '642e290d175f702decad1910',
            "name": "testItem",
            "author": "Exiel",
            "description": "Test item as example",
            "maxParticipants": 2,
            "price": 2,
            "address": "test address"
        })
        .expect('Content-Type', /json/)
        .expect(400)
    })

    it('POST /items => Post an item into a list already exist', async () => {
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
            'listId': id,
            "name": "testItem",
            "author": "Exiel",
            "description": "Test item as example",
            "maxParticipants": 2,
            "price": 2,
            "address": "test address"
        })
        .expect('Content-Type', /json/)
        .expect(201)

      await request(app)
        .post('/list/items')
        .set({
          'server-code': code
        })
        .send({
            'listId': id,
            "name": "testItem",
            "author": "Exiel",
            "description": "Test item as example",
            "maxParticipants": 2,
            "price": 2,
            "address": "test address"
        })
        .expect('Content-Type', /json/)
        .expect(409)
    })

    it('PATCH /items => Patch an item into a list', async () => {
      let code
      let key
      let id
      let itemId

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
            'listId': id,
            "name": "testItem",
            "author": "Exiel",
            "description": "Test item as example",
            "maxParticipants": 2,
            "price": 2,
            "address": "test address"
        })
        .expect('Content-Type', /json/)
        .expect(201)

      await request(app)
        .get('/list/items')
        .set({
          'server-code': code
        })
        .send({
          'listId': id
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          itemId = response.body[0]._id
        })

      await request(app)
        .patch('/list/items')
        .set({
          'server-code': code
        })
        .send({
            'itemId': itemId,
            'listId': id,
            "name": "testItem",
            "author": "Exiel",
            "description": "Test item modified",
            "maxParticipants": 2,
            "price": 2,
            "address": "test address"
        })
        .expect('Content-Type', /json/)
        .expect(200)
    })

    it('PATCH /items => Patch an item into a list invalid listId', async () => {
      let code
      let key
      let id
      let itemId

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
            'listId': id,
            "name": "testItem",
            "author": "Exiel",
            "description": "Test item as example",
            "maxParticipants": 2,
            "price": 2,
            "address": "test address"
        })
        .expect('Content-Type', /json/)
        .expect(201)

      await request(app)
        .get('/list/items')
        .set({
          'server-code': code
        })
        .send({
          'listId': id
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          itemId = response.body[0]._id
        })

      await request(app)
        .patch('/list/items')
        .set({
          'server-code': code
        })
        .send({
            'itemId': itemId,
            'listId': '642e290d175f702decad1910',
            "name": "testItem",
            "author": "Exiel",
            "description": "Test item modified",
            "maxParticipants": 2,
            "price": 2,
            "address": "test address"
        })
        .expect('Content-Type', /json/)
        .expect(400)
    })

    it('PATCH /items => Patch an item into a list invalid itemId', async () => {
      let code
      let key
      let id
      let itemId

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
            'listId': id,
            "name": "testItem",
            "author": "Exiel",
            "description": "Test item as example",
            "maxParticipants": 2,
            "price": 2,
            "address": "test address"
        })
        .expect('Content-Type', /json/)
        .expect(201)

      await request(app)
        .get('/list/items')
        .set({
          'server-code': code
        })
        .send({
          'listId': id
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          itemId = response.body[0]._id
        })

      await request(app)
        .patch('/list/items')
        .set({
          'server-code': code
        })
        .send({
            'itemId': '642e290d175f702decad1910',
            'listId': id,
            "name": "testItem",
            "author": "Exiel",
            "description": "Test item modified",
            "maxParticipants": 2,
            "price": 2,
            "address": "test address"
        })
        .expect('Content-Type', /json/)
        .expect(400)
    })

    it('DELETE /items => Delete an item into a list', async () => {
      let code
      let key
      let id
      let itemId

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
            'listId': id,
            "name": "testItem",
            "author": "Exiel",
            "description": "Test item as example",
            "maxParticipants": 2,
            "price": 2,
            "address": "test address"
        })
        .expect('Content-Type', /json/)
        .expect(201)

      await request(app)
        .get('/list/items')
        .set({
          'server-code': code
        })
        .send({
          'listId': id
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          itemId = response.body[0]._id
        })

      await request(app)
        .delete('/list/items')
        .set({
          'server-code': code
        })
        .send({
            'id': itemId
        })
        .expect('Content-Type', /json/)
        .expect(200)
    })

    it('DELETE /items => Delete an item into a list invalid objectId', async () => {
      let code
      let key
      let id
      let itemId

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
            'listId': id,
            "name": "testItem",
            "author": "Exiel",
            "description": "Test item as example",
            "maxParticipants": 2,
            "price": 2,
            "address": "test address"
        })
        .expect('Content-Type', /json/)
        .expect(201)

      await request(app)
        .get('/list/items')
        .set({
          'server-code': code
        })
        .send({
          'listId': id
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          itemId = response.body[0]._id
        })

      await request(app)
        .delete('/list/items')
        .set({
          'server-code': code
        })
        .send({
            'id': 'test'
        })
        .expect('Content-Type', /json/)
        .expect(400)
    })

    it('DELETE /items => Delete an item into a list invalid itemId', async () => {
      let code
      let key
      let id
      let itemId

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
            'listId': id,
            "name": "testItem",
            "author": "Exiel",
            "description": "Test item as example",
            "maxParticipants": 2,
            "price": 2,
            "address": "test address"
        })
        .expect('Content-Type', /json/)
        .expect(201)

      await request(app)
        .get('/list/items')
        .set({
          'server-code': code
        })
        .send({
          'listId': id
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          itemId = response.body[0]._id
        })

      await request(app)
        .delete('/list/items')
        .set({
          'server-code': code
        })
        .send({
            'id': '642e290d175f702decad1910'
        })
        .expect('Content-Type', /json/)
        .expect(404)
    })
  })
})
