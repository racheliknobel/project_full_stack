const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 8000

const connect = require("./configs/connectDB")
const usersRouter = require("./router/usersRouter")
const subscriptionsRouter = require("./router/subscriptionsWsRouter")
connect.connectDB()

const app = express()

app.use(express.json())

app.use(cors())

app.use('/users',usersRouter );
app.use('/subscriptions',subscriptionsRouter );



app.listen(PORT, ()=> console.log("connected"))