const jsonfile = require('jsonfile');

const jsonfilePath = "./data/permissions.json";

const getData = async()=>{
    try {const {permissions} = await jsonfile.readFile(jsonfilePath)
   return permissions}
   catch (error) {
    console.error('Error:', error);
    return "error occurred";
  }
}

const addData = async(newUser)=>{
   try { const {permissions} = await jsonfile.readFile(jsonfilePath)
    
    permissions?.push(newUser)
    
    await jsonfile.writeFile(jsonfilePath, {"permissions": permissions})
    return "added successfully"}
    catch (error) {
        console.error('Error:', error);
        return "error occurred";
      }
}

deleteData = async(id)=>{
    try {const {permissions} = await jsonfile.readFile(jsonfilePath)

    const newPermissions = permissions.filter(user => user.id !== id)

    await jsonfile.writeFile(jsonfilePath, {"permissions":newPermissions});}
    catch(error) {
        console.error('Error:', error);
        return "error occurred";
    }


}



module.exports = {getData, addData, deleteData}