import React from 'react'
import UsersListPage from '../components/page/usersListPage'
import { useParams } from 'react-router-dom'
import UserPage from '../components/page/userPage'

const Users = () => {
    const { userId } = useParams()
    // console.log(userId)
    return (
        <>
            {/* <h1>Users</h1>*/}
            {userId
                ? <UserPage userId={userId} />
                : <UsersListPage />
            }
        </>
    )
}

export default Users
