const request = require('supertest')
const mongoose = require('mongoose')

const server = require('../../serverUtils/testServer')
const dbDefault = require('../../../config/db.default')

describe('list routes tests', () => {
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

  describe('Lists route', () => {
    it('GET /list => Get list of lists', async () => {
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
          .get('/list')
          .set({
            'server-code': code
          })
          .expect('Content-Type', /json/)
          .expect(200)
    })

    it('POST /list => Create a new valid list', async () => {
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
          .post('/list')
          .set({
            'server-code': code
          })
          .send({
            'name': 'test'
          })
          .expect('Content-Type', /json/)
          .expect(201)
    })

    it('POST /list => Create a new invalid list', async () => {
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
          .post('/list')
          .set({
            'server-code': code
          })
          .send({
            'name': 'test'
          })
          .expect('Content-Type', /json/)
          .expect(201)
          await request(app)
          .post('/list')
          .set({
            'server-code': code
          })
          .send({
            'name': 'test'
          })
          .expect('Content-Type', /json/)
          .expect(409)
    })

    it('DELETE /list => Delete a list', async () => {
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
            'name': 'test'
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
          .delete('/list')
          .set({
            'server-code': code
          })
          .send({
            'id': id
          })
          .expect('Content-Type', /json/)
          .expect(200)
    })

    it('DELETE /list => Delete invalid list invalid ObjectID', async () => {
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
          .delete('/list')
          .set({
            'server-code': code
          })
          .send({
            'id': 'test'
          })
          .expect('Content-Type', /json/)
          .expect(400)
    })

    it('DELETE /list => Delete invalid list', async () => {
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
          .delete('/list')
          .set({
            'server-code': code
          })
          .send({
            'id': '642cae58db194f6ca6f38ab3'
          })
          .expect('Content-Type', /json/)
          .expect(404)
    })
  })
})
