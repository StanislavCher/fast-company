import React from 'react'
import UsersList from '../components/usersList'
import { useParams } from 'react-router-dom'
import UserPage from '../components/userPage'

const Users = () => {
    const { userId } = useParams()
    // console.log(userId)
    return (
        <>
            {/* <h1>Users</h1>*/}
            {userId
                ? <UserPage userId={userId} />
                : <UsersList />
            }
        </>
    )
}

export default Users
