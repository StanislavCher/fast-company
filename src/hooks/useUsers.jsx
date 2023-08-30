import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import userService from '../services/user.service'
import { toast } from 'react-toastify'

const UserContext = React.createContext()

export const useUser = () => {
    return useContext(UserContext)
}

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getUsers()
    }, [])

    useEffect(() => {
        if (error !== null) {
            toast(error)
            setError(null)
        }
    }, [error])
    async function getUsers() {
        try {
            const { content } = await userService.get()
            // console.log('content', content)
            setUsers(content)
            // console.log('users', users)
            setLoading(false)
            // console.log('users', users)
            // getQuality(id).then((data) => setQualities(data))
        } catch (error) {
            errorCatcher(error)
        }
    }
    function getUserById(id) {
        return users.find((user) => {
            return user._id === id
        })
    }
    function errorCatcher(error) {
        // console.log(error)
        const { message } = error.response.data
        setError(message)
        // setLoading(false)
    }

    return (
        <UserContext.Provider value={ { users, getUserById } }>
            {!isLoading ? children : 'Loading...'}
        </UserContext.Provider>
    )
}

UserProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default UserProvider
