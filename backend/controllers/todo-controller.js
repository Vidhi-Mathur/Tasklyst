const Todo = require("../models/todo-model")

exports.createTodo = async(req, res, next) => {
    try {
        const { title, description } = req.body
        if(title.trim() === '' || description.trim() === '') return res.status(400).json({message: "Can't save empty fields"})
        const todo = await Todo.create({
            title,
            description
        })
        res.status(200).json({ todo })
    }
    catch(err) {
        next(err)
    }
}

exports.getTodos = async(req, res, next) => {
    try {
        const todo = await Todo.find({})
        return res.status(200).json({ todo })
    }
    catch(err) {
        next(err)
    }
}

exports.getTodoById = async(req, res, next) => {
    try {
        const { todoId } = req.params
        const todo = await Todo.findById(todoId)
        if(!todo) return res.status(404).json({message: "No associated todo found"})
        res.status(200).json({ todo })
    }
    catch(err) {
        next(err)
    }
}

exports.updateTodoById = async(req, res, next) => {
    try {
        const { todoId } = req.params
        const { title, description } = req.body
        if(title.trim() === '' || description.trim() === '') return res.status(400).json({message: "Can't save empty fields"})    
        const updatedTodo = await Todo.findByIdAndUpdate( todoId, { 
            title, 
            description, 
            date: Date.now() 
        }, { new: true, runValidators: true })
        if(!updatedTodo) return res.status(404).json({ message: "No associated todo found" })
        res.status(200).json({ todo: updatedTodo })
    }
    catch(err) {
        next(err)
    }
}

exports.deleteTodo = async(req, res, next) => {
    try {
        const { todoId } = req.params
        const deletedTodo = await Todo.findByIdAndDelete(todoId)
        if(!deletedTodo) return res.status(404).json({ message: "No associated todo found" })
        res.status(200).json({ message: "Todo deleted successfully" })
    }
    catch(err) {
        next(err)
    }
}