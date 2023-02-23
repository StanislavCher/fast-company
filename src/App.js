import React, { useEffect, useState } from 'react'
import api from './api/'
import Users from './components/users'

const App = () => {
    const [users, setUsers] = useState(undefined)

    useEffect(() => {
        // console.log('send request')
        api.users.fetchAll().then((data) => setUsers(data))
    }, [])

    const handleDelete = (userId) => {
        // console.log(userId)
        setUsers(users.filter((user) => user._id !== userId))
    }

    const handleToggleBookmark = (id) => {
        // console.log(id)
        // const userIndex = users.findIndex(user => user._id === id)
        // console.log(userIndex)
        // const updatedUsers = [...users]
        // updatedUsers[userIndex].bookmark = !updatedUsers[userIndex].bookmark
        // setUsers(updatedUsers)
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    // console.log(user)
                    // console.log({user})
                    // console.log({...user})
                    // // console.log(user={user})
                    // console.log(user={...user})
                    // console.log({...user, bookmark: 'ha'})
                    return { ...user, bookmark: !user.bookmark }
                }
                return user
            })
        )
    }

    return (
        <>
            {users && (
                <Users
                    users={users}
                    onDelete={handleDelete}
                    onToggleBookmark={handleToggleBookmark}
                />
            )}
        </>
    )
}

export default App
