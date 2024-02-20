const usersFile = require('../DAL/usersFileDAL')
const permissionsFile = require('../DAL/permissionsFileDAL')
const { User } = require('../DAL/modelUsersDB')


const getAllUsers = async () => {
    const users = await usersFile.getUsers()
    const permissions = await permissionsFile.getData()
    const usersDB = await User.find({})
    console.log(usersDB)
    const finalUsers = []

    users.forEach(async (user) => {
        const id = user.id
        // const userDB = usersDB.find(u => u._id == id)
      
        // const userName = userDB.userName
        // const password = userDB.password

        
        const firstName = user.firstName
        const lastName = user.lastName
        const createdDate = user.createdDate
        const sessionTimeOut = user.sessionTimeOut

        

        const permissionsById = permissions.find(u => u.id == id)
        const permissionsData = permissionsById.permissions


        finalUsers.push({
            "id": id,
            // "userName": userName,
            // "password": password,
            "firstName": firstName,
            "lastName": lastName,
            "createdDate": createdDate,
            "sessionsTimeOut": sessionTimeOut,
            "permissions": permissionsData
        })
    });

    return finalUsers

}

const getUserById = async (id) => {
    const users = await usersFile.getUsers()
    const user = users.find(user => user.id == id)


    const firstName = user.firstName
    const lastName = user.lastName
    const createdDate = user.createdDate
    const sessionTimeOut = user.sessionTimeOut



    const permissions = await permissionsFile.getData()
    const permissionsById = permissions.find(user => user.id == id)
    const permissionsData = permissionsById.permissions


    const userDB = await User.findOne({"_id": id})
    console.log(userDB)
    const userName = userDB.userName
    const password = userDB.password
    console.log(password)
    

    return {
        "id": id,
        "userName": userName,
        "password": password,
        "firstName": firstName,
        "lastName": lastName,
        "createdDate": createdDate,
        "sessionsTimeOut": sessionTimeOut,
        "permissions": permissionsData
    }

}

const createUser = async (user) => {
    const newUserDB = { "userName": user.userName, "password": user.password }
    await User.create(newUserDB)


    const newId = User.findOne({"userName": newUserDB.userName, "password": newUserDB.password})



    

    const newUserUsersFile = { "id": newId._id, "firstName": user.firstName, "lastName": user.lastName, "createdDate": new Date(), "sessionsTimeOut": user.sessionsTimeOut }
    await usersFile.addUsers(newUserUsersFile)

    const newUserPermissionsFile = {"id": newId._id, "permissions": user.permissions }
    await permissionsFile.addData(newUserPermissionsFile)

    return "created successfully"


}

const deleteUser = async (id) => {
    try{await usersFile.deleteUser(id)
    await permissionsFile.deleteData(id)
    await User.findOneAndDelete({ _id: id })

    return "deleted successfully"}
    catch(error){
        console.log(error)
    }
}



module.exports = { getAllUsers, getUserById, createUser, deleteUser }