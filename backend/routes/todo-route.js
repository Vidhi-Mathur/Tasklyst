const express = require('express')
const { createTodo, getTodos, getTodoById, updateTodoById, deleteTodo } = require('../controllers/todo-controller')
const router = express.Router()

//POST / -  Create a new Todo item.
router.post('/', createTodo)

//GET / - Fetch a paginated list of Todo items.
router.get('/', getTodos)

//GET /:todoId - Fetch a single Todo item by ID.
router.get('/:todoId', getTodoById)

//PATCH /:id - Update a Todo item by ID.
router.patch('/:todoId', updateTodoById)

//DELETE /:id - Delete a Todo item by ID.
router.delete('/:todoId', deleteTodo)

module.exports = router