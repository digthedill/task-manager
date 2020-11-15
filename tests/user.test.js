const request = require("supertest");
const app = require("../src/app");
const User = require('../src/models/user')

const {
  user1,
  user1Id,
  configureDatabase
} = require('./fixtures/db')

// CRUD TESTING~



beforeEach(configureDatabase)


test("should sign up new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "Dillon",
      email: "dillon@gmail.com",
      password: "hoonaughty",
    })
    .expect(201);

  const user = await User.findById(response.body.user._id)
  expect(user).not.toBeNull()

  expect(response.body).toMatchObject({
    user: {
      name: "Dillon",
    }
  })

  expect(user.password).not.toBe('hoonaughty')
});

test('Should login existing user', async () => {
  const response = await request(app).post('/users/login')
    .send({
      email: user1.email,
      password: user1.password
    }).expect(200)

  const user = await User.findById(response.body.user._id)
  expect(user.tokens[0].token).toBe(user1.tokens[0].token)
})

test('Should not login nonexistent user', async () => {
  await request(app).post('/users/login')
    .send({
      email: 'raunchyman@gmail.com',
      password: 'politico66'
    })
    .expect(400)
})

test('Should get profile for user', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${user1.tokens[0].token}`)
    .send()
    .expect(200)

})

test('Should not get profile for unauthenticated user', async () => {
  await request(app)
    .get('/users/me')
    .send()
    .expect(401)
})

test('should delete account for user', async () => {
  await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${user1.tokens[0].token}`)
    .send()
    .expect(200)

  const user = await User.findById(user1Id)
  expect(user).toBeNull()

})

test('should not delete account for unauthorized user', async () => {
  await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})

test('Should upload avatar image', async () => {
  await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${user1.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/fumo.jpg')
    .expect(200)
  const user = await User.findById(user1Id)
  expect(user.avatar).toEqual(expect.any(Buffer))
  //expect({}).toEqual({}) oppossed to toBe ...toEqual uses an algo not strict equality
})

test('Should update valid user fields', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${user1.tokens[0].token}`)
    .send({
      name: 'Robert Zimm'
    })
    .expect(200)
  const user = await User.findById(user1Id)
  expect(user.name).toEqual('Robert Zimm')

})

test('Should not update invalid user fields', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${user1.tokens[0].token}`)
    .send({
      zipcode: 'Robert Zimm'
    })
    .expect(400)
})