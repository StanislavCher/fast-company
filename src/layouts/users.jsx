import React from 'react'
import UsersListPage from '../components/page/usersListPage'
// import { useParams, useLocation } from 'react-router-dom'
import { useParams, Redirect } from 'react-router-dom'
import UserPage from '../components/page/userPage'
import UserEditPage from '../components/page/userEditPage'
import UserProvider from '../hooks/useUsers'
import { useAuth } from '../hooks/useAuth'
// import PropTypes from 'prop-types'

const Users = () => {
    const { userId, edit } = useParams()
    // const { pathname } = useLocation()
    // console.log(userId)
    // console.log(pathname)
    // console.log(edit)
    const { currentUser } = useAuth()
    return (
        <>
            {/* <h1>Users</h1>*/}

            {/* {userId*/}
            {/*    ? <UserPage userId={userId} />*/}
            {/*    : <UsersListPage />*/}
            {/* }*/}
            <UserProvider>
                {userId
                    // ? !pathname.includes('/edit')
                    ? edit
                        ? (userId === currentUser._id)
                            ? <UserEditPage userId={userId} />
                            : <Redirect to={`/users/${currentUser._id}/edit`} />
                        : <UserPage userId={userId} />
                    : <UsersListPage />
                }
            </UserProvider>
        </>
    )
}

// Users.propTypes = {
//     location: PropTypes.string
// }

export default Users
