const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/user')
const Task = require('../../src/models/tasks')


const user1Id = new mongoose.Types.ObjectId()
const user1 = {
    _id: user1Id,
    name: 'Jane Doe',
    email: "examle@email.com",
    password: "testing666",
    tokens: [{
        token: jwt.sign({
            _id: user1Id
        }, process.env.JWT_SECRET)
    }]
}

const user2Id = new mongoose.Types.ObjectId()
const user2 = {
    _id: user2Id,
    name: 'Rodney',
    email: "suckit@axebodyspray.com",
    password: "jest666",
    tokens: [{
        token: jwt.sign({
            _id: user2Id
        }, process.env.JWT_SECRET)
    }]
}

const task1 = {
    _id: new mongoose.Types.ObjectId(),
    description: 'First Task',
    completed: false,
    owner: user1._id
}
const task2 = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Second Task',
    completed: true,
    owner: user1._id
}
const task3 = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Third Task',
    completed: true,
    owner: user2._id
}
const configureDatabase = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(user1).save()
    await new User(user2).save()
    await new Task(task1).save()
    await new Task(task2).save()
    await new Task(task3).save()
}


module.exports = {
    user1,
    user2,
    user1Id,
    configureDatabase,
    task1,

}