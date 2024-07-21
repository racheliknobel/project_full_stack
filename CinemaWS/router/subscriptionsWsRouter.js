const subscriptionsBLL = require("../BLL/subscriptionsWsBLL")
const {protect} = require("../BLL/protect")

const express = require('express')
const router = express.Router()

//members

router.route('/members').get(protect, async (req, res) => {
    const members = await subscriptionsBLL.getMembersData()
    res.json(members)
})

router.route('/members/:id').get(protect, async (req, res) => {
    const {id} = req.params
    const member = await subscriptionsBLL.getMemberDataById(id)
    res.json(member)
})


router.route('/members').post(protect, async (req, res) => {
    const newMember = req.body
    const msg = await subscriptionsBLL.addMember(newMember)
    res.json(msg)
})


router.route('/members/:id').put(protect, async (req, res) => {
    const {id} = req.params
    const newMember = req.body
    const msg = await subscriptionsBLL.updateMember(id, newMember)
    res.json(msg)
})

router.route('/members/:id').delete(protect, async (req, res) => {
    const {id} = req.params
    const msg = await subscriptionsBLL.deleteMember(id)
    res.json(msg)
})

// movies
router.route('/movies').get(protect, async (req, res) => {
    const movies = await subscriptionsBLL.getMoviesData()
    res.json(movies)
})

router.route('/movies/:id').get(protect, async (req, res) => {
    const {id} = req.params
    const movie = await subscriptionsBLL.getMovieDataById(id)
    res.json(movie)
})


router.route('/movies').post(protect, async (req, res) => {
    const newMovie = req.body
    const msg = await subscriptionsBLL.addMovie(newMovie)
    res.json(msg)
})


router.route('/movies/:id').put(protect, async (req, res) => {
    const {id} = req.params
    const newMovie = req.body
    const msg = await subscriptionsBLL.updateMovie(id, newMovie)
    res.json(msg)
})

router.route('/movies/:id').delete(protect, async (req, res) => {
    const {id} = req.params
    const msg = await subscriptionsBLL.deleteMovie(id)
    res.json(msg)
})

//subscriptions

router.route('/subscriptions').get(protect, async (req, res) => {
    const subscriptions = await subscriptionsBLL.getSubscriptions()
    res.json(subscriptions)
})

router.route('/subscriptions/:id').get(protect, async (req, res) => {
    const {id} = req.params
    const subscription = await subscriptionsBLL.getSubscriptionById(id)
    res.json(subscription)
})


router.route('/subscriptions').post(protect, async (req, res) => {
    const newSubscriptions = req.body
    const msg = await subscriptionsBLL.addSubscription(newSubscriptions)
    res.json(msg)
})


router.route('/subscriptions/:id').put(protect, async (req, res) => {
    const {id} = req.params
    const newSubscriptions = req.body
    const msg = await subscriptionsBLL.updateSubscription(id, newSubscriptions)
    res.json(msg)
})

router.route('/subscriptions/:id').delete(protect, async (req, res) => {
    const {id} = req.params
    const msg = await subscriptionsBLL.deleteSubscription(id)
    res.json(msg)
})





module.exports = router 