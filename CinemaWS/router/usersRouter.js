const usersBLL = require("../BLL/usersBLL")
const express = require('express')
const router = express.Router()





router.route("/").post(async (req, res) => {
    const obj = req.body
    const msg = await usersBLL.createUser(obj)
    res.json(msg)   
})

router.route("/:id").put(async (req, res) => {
    const {id} = req.params
    const obj = req.body
    const msg = await usersBLL.updateUser(id, obj)
    res.json(msg)   
})


router.route("/:id").delete(async (req, res) => {
    const {id} = req.params
    const msg = await usersBLL.deleteUser(id)
    res.json(msg)
})

router.route('/login').post(async (req, res) => {
    const {userName , password} = req.body
    const user = await usersBLL.loginUser(userName , password)
    res.json(user)
})


module.exports = router 