import React from 'react'
import User from './user'
import PropTypes from 'prop-types'

const UsersTable = ({ users, ...rest }) => {
    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th>Имя</th>
                        <th>Качества</th>
                        <th>Профессия</th>
                        <th>Встретился, раз</th>
                        <th>Оценка</th>
                        <th>Избранное</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        return <User key={user._id} {...user} {...rest} />
                    })}
                </tbody>
            </table>
        </>
    )
}
UsersTable.propTypes = {
    users: PropTypes.array.isRequired
}

export default UsersTable
