const usersBLL = require("../BLL/usersBLL")
const express = require('express')
const router = express.Router()



router.route('/').get(async (req, res) => {
    const users = await usersBLL.getAllUsers()
    res.json(users)
})

router.route('/:id').get(async (req, res) => {
    const {id} = req.params
    const user = await usersBLL.getUserById(id)
    res.json(user)
})

router.route("/").post(async (req, res) => {
    const obj = req.body
    const msg = await usersBLL.createUser(obj)
    res.json(msg)   
})

router.route("/:id").delete(async (req, res) => {
    const {id} = req.params
    const msg = await usersBLL.deleteUser(id)
    res.json(msg)
})


module.exports = router 