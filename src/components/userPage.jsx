import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../api/index'
import QualitiesList from './qualitiesList'
import PropTypes from 'prop-types'

const UserPage = ({ userId }) => {
    const [userData, setUsers] = useState(undefined)

    useEffect(() => {
        api.getById(userId).then((data) => setUsers(data))
    }, [])

    const history = useHistory()

    // const { userId } = useParams()

    const handleClick = () => {
        history.push('/users')
    }

    if (userData) {
        return (
            <>
                <h1>{userData.name}</h1>
                <h2>Профессия: {userData.profession.name}</h2>
                <QualitiesList qualities={userData.qualities} />
                <p>completedMeetings: {userData.completedMeetings}</p>
                <h2>Rate: {userData.rate}</h2>
                {/* <button>*/}
                {/*    <Link className='nav-link' to={ '/users' } >Все пользователи</Link>*/}
                {/* </button>*/}
                <button onClick={ handleClick }>
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
