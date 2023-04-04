const request = require('supertest')
const mongoose = require('mongoose')

const server = require('../../../serverUtils/testServer')
const dbDefault = require('../../../../config/db.default')
const { Code } = require('../../../../models/code')

describe('admin code route tests', () => {
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

  describe('Codes route', () => {
    it('POST /admin/code => Try create code without note', async () => {
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

        let count = await Code.countDocuments({})
        expect(count).toEqual(1)
    })

    it('POST /admin/code => Try create code with note', async () => {
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
        .send({
            note: "tmp"
        })
        .expect('Content-Type', /json/)
        .expect(200)

        let noteF = await Code.findOne({ note: "tmp" })
        expect(noteF.note).toBe('tmp')
    })

    it('GET /admin/code => Get codes list', async () => {
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
      .get('/admin/code')
      .set({
          'x-auth-token': key
      })
      .expect('Content-Type', /json/)
      .expect(200)
    })

    it('GET /admin/code/check => Try check code without code', async () => {

     await request(app)
      .get('/admin/code/check')
      .expect(403)
    })

    it('GET /admin/code/check => Try check code with invalid code', async () => {

      await request(app)
       .get('/admin/code/check')
       .set({
          'server-code': 'test'
        })
       .expect(400)
     })

     it('GET /admin/code/check => Try check code with valid code', async () => {
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
       .get('/admin/code/check')
       .set({
          'server-code': code
        })
       .expect(200)
     })
  })
})
