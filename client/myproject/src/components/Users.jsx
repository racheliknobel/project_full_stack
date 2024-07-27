import React from 'react'
import { useSelector } from 'react-redux'
import User from './User'

export default function Users() {

    const users = useSelector(store => store.users)
    return (
        <div>

            {
                users?.map((user) => <User key={user._id} userData={user} />).reverse()
            }

        </div>
    )
}
