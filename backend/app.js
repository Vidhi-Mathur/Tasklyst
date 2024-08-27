require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const todoRoutes = require("./routes/todo-route")

const app = express()

app.use(cors({
    origin: '*'
}))

//Parsing JSON bodies
app.use(express.json())

//Parsing URL-encoded bodies
app.use(express.urlencoded({extended: true}))

//Parsing
app.use('/', todoRoutes)

//Error Handling
app.use((err, req, res, next) => {
    const code = err.statusCode || 500; 
    const message = err.message || 'Internal Server Error'; 
    return res.status(code).json({ message: message });
});

//Listening to server
mongoose.connect(process.env.MONGODB_URI).then(() => app.listen(3000)).catch((err) => console.log(err))