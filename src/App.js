import React, { useState } from 'react'
import api from './api/'
import SearchStatus from './components/searchStatus'
import Users from './components/users'

const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll())

    const handleDelete = (userId) => {
        //console.log(userId)
        setUsers(users.filter((user) => user._id !== userId))
    }

    const handleToggleBookmark = (id) => {
        //console.log(id)
        //const userIndex = users.findIndex(user => user._id === id)
        //console.log(userIndex)
        //const updatedUsers = [...users]
        //updatedUsers[userIndex].bookmark = !updatedUsers[userIndex].bookmark
        //setUsers(updatedUsers)
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    //console.log(user)
                    //console.log({user})
                    //console.log({...user})
                    ////console.log(user={user})
                    //console.log(user={...user})
                    //console.log({...user, bookmark: 'ha'})
                    return { ...user, bookmark: !user.bookmark }
                }
                return user
            })
        )
    }

    return (
        <>
            <SearchStatus length={users.length} />
            <Users
                users={users}
                onDelete={handleDelete}
                onToggleBookmark={handleToggleBookmark}
            />
        </>
    )
}

export default App
