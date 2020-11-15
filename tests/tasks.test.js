const request = require('supertest')
const Task = require('../src/models/tasks')
const app = require('../src/app')
const {
    user1,
    user2,
    user1Id,
    configureDatabase,
    task1
} = require('./fixtures/db')

beforeEach(configureDatabase)

test('Should create Task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send({
            description: "Wash your life up"
        })
        .expect(201)
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})

test('Should get all tasks', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .expect(200)
    expect(response.body.length).toBe(2)
})

test('User should not be able to delete other user\'s tasks', async () => {
    await request(app)
        .delete(`/tasks/${task1._id}`)
        .set('Authorization', `Bearer ${user2.tokens[0].token}`)
        .send()
        .expect(404)
    const task = await Task.findById(task1._id)
    expect(task).not.toBeNull()
})