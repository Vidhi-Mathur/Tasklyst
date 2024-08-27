const mongoose = require('mongoose')
const schema = mongoose.Schema

const todo = new schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Todo', todo)