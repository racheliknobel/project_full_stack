const axios = require('axios');

const url = "http://127.0.0.1:5000"

const getMembersData = async () => {
    const {data} = await axios.get(`${url}/members`)
    
    return data

}

module.exports = {getMembersData}

