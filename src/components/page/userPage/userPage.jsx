import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../../../api'
import Qualities from '../../ui/qualities'
import PropTypes from 'prop-types'

const UserPage = ({ userId }) => {
    const [userData, setUsers] = useState(undefined)

    useEffect(() => {
        api.users.getById(userId).then((data) => setUsers(data))
    }, [])

    const history = useHistory()

    // const { userId } = useParams()

    const handleClick = () => {
        // history.push(`/users/${userId}/edit`)
        history.push(history.location.pathname + `/edit`)
    }

    const handleClickAllUsers = () => {
        // history.push(`/users/${userId}`)
        history.push(`/users`)
    }

    if (userData) {
        return (
            <>
                <h1>{userData.name}</h1>
                <h2>Профессия: {userData.profession.name}</h2>
                <Qualities qualities={userData.qualities} />
                <p>completedMeetings: {userData.completedMeetings}</p>
                <h2>Rate: {userData.rate}</h2>
                {/* <button>*/}
                {/*    <Link className='nav-link' to={ '/users' } >Все пользователи</Link>*/}
                {/* </button>*/}
                <button onClick={ handleClick }>
                    Редактировать
                </button>
                <span>   </span>
                <button onClick={ handleClickAllUsers }>
                    Все пользователи
                </button>
            </>
        )
    } else {
        return (
            <>
                {'loading...'}
            </>
        )
    }
}

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
}

export default UserPage
