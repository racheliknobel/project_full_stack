const jsonfile = require('jsonfile');

const jsonfilePath = "./data/users.json";

const getUsers = async () => {
   try {const {users} = await jsonfile.readFile(jsonfilePath)

    return users}
    catch (error) {
        console.error('Error:', error);
        return "error occurred";
    }

}



const addUsers = async (newUser) => {
    try {

        const { users } = await jsonfile.readFile(jsonfilePath);
        
        users?.push(newUser);

        
        await jsonfile.writeFile(jsonfilePath, {"users":users});

        return "added successfully";
    } catch (error) {
        console.error('Error:', error);
        return "error occurred";
    }
};

deleteUser = async(id)=>{
    try {const { users } = await jsonfile.readFile(jsonfilePath)

    const newUsers = users.filter(user => user.id !== id)

    await jsonfile.writeFile(jsonfilePath, {"users":newUsers});}
    catch(error) {
        console.error('Error:', error);
        return "error occurred";
    }


}

module.exports = { getUsers, addUsers, deleteUser }
