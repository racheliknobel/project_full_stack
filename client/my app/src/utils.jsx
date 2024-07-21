import axios from 'axios'

const url = "http://127.0.0.1:8000"
const loginUser = async(user) => {
    const response = await axios.post(`${url}/users/login`, user)
    return response.data
}

const getUserById = async(id)=> {
    const response = await axios.get(`${url}/users/${id}`)
    return response.data
}
const addUser = async(newUser) => {
    const response = await axios.post(`${url}/users`,newUser)
    return response.data
}

const updateUser = async(id, newUser) => {
    const response = await axios.put(`${url}/users/${id}`,newUser)
    return response.data
}

const deleteUser = async(id) => {
    const response = await axios.delete(`${url}/users/${id}`)
    return response.data
}



export {loginUser, addUser, getUserById, updateUser, deleteUser} 