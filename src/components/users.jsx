import React, { useState } from 'react'
import User from './user'
import Pagination from './pagination'
import { paginate } from '../utils/paginate'
import PropTypes from 'prop-types'

const Users = ({ users, ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1)

    //console.log(users)
    //console.log(rest)

    //const valuesAll = Object.values(usersApi)

    //const valuesUsers = valuesAll.filter(value => (typeof value !== 'function'))
    //const valuesFunctions = valuesAll.filter(value => (typeof value === 'function'))
    //console.log(valuesFunctions)

    //const handleDelete = () => {
    //
    //}

    const itemsCount = users.length
    const pageSize = 4

    const handlePageChange = (pageIndex) => {
        //console.log('page: ', pageIndex)
        setCurrentPage(pageIndex)
    }

    const userPages = paginate(users, currentPage, pageSize)

    return (
        <>
            {/*{console.log(length)}*/}
            {itemsCount > 0 && (
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
                        {userPages.map((user) => {
                            //console.log(row._id)
                            return (
                                <User
                                    key={user._id}
                                    {...user}
                                    {...rest}
                                    //onDelete={valuesFunctions[0]}
                                    //onToggle={valuesFunctions[1]}
                                />
                            )
                        })}
                    </tbody>
                </table>
            )}
            <Pagination
                itemsCount={itemsCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </>
    )
}
Users.propTypes = {
    users: PropTypes.array.isRequired,
    rest: PropTypes.array.isRequired
}

export default Users
