const express = require('express')
const cors = require('cors')
const PORT = 8000

const connect = require("./configs/connectDB")
const usersRouter = require("./router/usersRouter")
connect.connectDB()

const app = express()

app.use(express.json())

app.use(cors())

app.use('/users',usersRouter );


app.listen(PORT, ()=> console.log("connected"))