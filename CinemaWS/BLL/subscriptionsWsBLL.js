const axios = require('axios');

const url = "http://127.0.0.1:5000"

//members

const getMembersData = async () => {
    const {data} = await axios.get(`${url}/members`)
    
    return data

}

const getMemberDataById = async (id) => {
    const {data} = await axios.get(`${url}/members/${id}`)
    
    return data

}

const addMember = async (obj) => {
    await axios.post(`${url}/members`, obj)

    return "added member"
}

const updateMember = async (id, obj) => {
    await axios.put(`${url}/members/${id}`, obj)
    return "updated member"
}

const deleteMember = async (id) => {
    await axios.delete(`${url}/members/${id}`)
    return "deleted member"
}

//movies

const getMoviesData = async () => {
    const {data} = await axios.get(`${url}/movies`)
    
    return data

}

const getMovieDataById = async (id) => {
    const {data} = await axios.get(`${url}/movies/${id}`)
    
    return data

}

const addMovie = async (obj) => {
    await axios.post(`${url}/movies`, obj)

    return "added movie"
}

const updateMovie = async (id, obj) => {
    await axios.put(`${url}/movies/${id}`, obj)
    return "updated movie"
}

const deleteMovie = async (id) => {
    await axios.delete(`${url}/movies/${id}`)
    return "deleted movie"
}

// subscriptions

const getSubscriptions = async () => {
    const {data} = await axios.get(`${url}/subscriptions`)
    
    return data

}

const getSubscriptionById = async (id) => {
    const {data} = await axios.get(`${url}/subscriptions/${id}`)
    
    return data

}

const addSubscription = async (obj) => {
    await axios.post(`${url}/subscriptions`, obj)

    return "added subscription"
}

const updateSubscription = async (id, obj) => {
    await axios.put(`${url}/subscriptions/${id}`, obj)
    return "updated subscription"
}

const deleteSubscription = async (id) => {
    await axios.delete(`${url}/subscriptions/${id}`)
    return "deleted subscription"
}





module.exports = {getMembersData, getMemberDataById, addMember, updateMember, deleteMember,
                  getMoviesData, getMovieDataById, addMovie, updateMovie, deleteMovie,
                getSubscriptions, getSubscriptionById, addSubscription, updateSubscription, deleteSubscription }

