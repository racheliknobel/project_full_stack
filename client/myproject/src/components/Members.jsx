import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Member from './Member'

export default function Members() {
    const [finalMembers, setFinalMembers] = useState([])

    const members = useSelector((store) => store.members)

    const searchMembers = (e) => {
        const filteredMembers = members?.filter((member) => member.name.toLowerCase().includes(e.toLowerCase()))
        setFinalMembers(filteredMembers)
        console.log(finalMembers)
    }
    return (

        <div>
            <br></br>
            search <input type='text' onChange={(e) => { searchMembers(e.target.value) }}

            /><br></br><br></br>

            <Link to={'/mainPage/addMember'}>
                <button >Add Member</button>
                <br></br>
            </Link>

            <div>

                {(finalMembers.length > 0 ? finalMembers : members)?.map((member) => <Member key={member._id} memberData={member} />).reverse()}

            </div>

        </div>

    )
}
