const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const usersFile = require('../DAL/usersFileDAL')
const permissionsFile = require('../DAL/permissionsFileDAL')
const { User } = require('../DAL/modelUsersDB')


const loginUser = async (userName, password) => {

    //Checking if the user exists
    try {
        const user = await User.findOne({ "userName": userName })
        if (user && (await bcrypt.compare(password, user.password))) {

            //Finding the information about the user
            const usersData = await usersFile.getUsers()
            console.log(usersData)
            const userData = usersData.find(userData => userData.id == user._id)
            const firstName = userData.firstName
            const lastName = userData.lastName
            const createdDate = userData.createdDate
            const sessionTimeOut = userData.sessionTimeOut

            const permissions = await permissionsFile.getData()
            const permissionsById = permissions.find(userPerm => userPerm.id == user._id)
            const permissionsData = permissionsById.permissions

            //Returning information about the user
            return {
                isAuthenticated: true,
                data: {
                    id: user._id,
                    userName: userName,
                    firstName: firstName,
                    lastName: lastName,
                    createdDate: createdDate,
                    sessionsTimeOut: sessionTimeOut,
                    permissions: permissionsData,
                    token: generateToken(user._id)
                }
            }
        }
        else {
            return {
                isAuthenticated: false,
                data: "no user found"
            }
        }

    } catch (error) {
        console.log(error)
        return error
    }
}

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}


const createUser = async (user) => {
    try {
        //Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(user.password, salt)
        const newUserDB = { "userName": user.userName, "password": hashedPassword }
        await User.create(newUserDB)

        const newId = await User.findOne({ "userName": user.userName, "password": hashedPassword, token: generateToken(user._id) })


        const newUserUsersFile = { "id": newId._id, "firstName": user.firstName, "lastName": user.lastName, "createdDate": new Date(2020, 2, 1), "sessionsTimeOut": user.sessionsTimeOut }
        await usersFile.addUsers(newUserUsersFile)

        const newUserPermissionsFile = { "id": newId._id, "permissions": user.permissions }
        await permissionsFile.addData(newUserPermissionsFile)

        return "created successfully"
    }
    catch (error) {
        console.log(error)
        return error
    }
}

const updateUser = async (id, user) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(user.password, salt)
        const newUserDB = { "userName": user.userName, "password": hashedPassword }

        await User.findByIdAndUpdate(id, newUserDB)

        const newUserUsersFile = { "id": id, "firstName": user.firstName, "lastName": user.lastName, "createdDate": new Date(), "sessionsTimeOut": user.sessionsTimeOut }
        await usersFile.updateUser(id, newUserUsersFile)

        const newUserPermissionsFile = { "id": id, "permissions": user.permissions }
        await permissionsFile.updateData(id, newUserPermissionsFile)

        return "updated successfully"
    }

    catch (error) {
        console.log(error)
        return error
    }
}

const deleteUser = async (id) => {
    try {
        await usersFile.deleteUser(id)
        await permissionsFile.deleteData(id)
        await User.findOneAndDelete({ _id: id })

        return "deleted successfully"
    }
    catch (error) {
        console.log(error)
        return error
    }
}



module.exports = { loginUser, createUser, updateUser, deleteUser }