import React, { useEffect, useState } from 'react'
import User from './user'
import Pagination from './pagination'
import { paginate } from '../utils/paginate'
import PropTypes from 'prop-types'
import GroupList from './groupList'
import api from '../api/index'
import SearchStatus from './searchStatus'

const Users = ({ users: allUsers, ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [professions, setProfessions] = useState(undefined)
    const [selectedProf, setSelectedProf] = useState(undefined)

    useEffect(() => {
        // console.log('send request')
        api.professions.fetchAll().then((data) => setProfessions(data))
    }, [])

    useEffect(() => {
        setCurrentPage(1)
    }, [selectedProf])

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }

    const handleProfessionSelect = (item) => {
        if (item === selectedProf) setSelectedProf(undefined)
        else setSelectedProf(item)
    }

    // console.log('allUsers', allUsers)
    const selectedUsers = selectedProf
        ? allUsers.filter((user) => {
            // console.log('user', user)
            // console.log('user.profession', user.profession)
            // console.log('selectedProf', selectedProf)
            // console.log('===', user.profession._id === selectedProf._id)
            // return user.profession._id === selectedProf._id
            return JSON.stringify(user.profession) === JSON.stringify(selectedProf)
        })
        : allUsers
    // console.log('selectedProf', selectedProf)
    // console.log('selectedUsers', selectedUsers)

    const itemsCount = allUsers ? selectedUsers.length : 0

    const pageSize = 2

    const usersCrop = paginate(selectedUsers, currentPage, pageSize)

    const handleClearFilter = () => {
        setSelectedProf(undefined)
    }

    return (
        <div className="d-flex m-2">
            {professions && (
                <div className="d-flex flex-column m-2">
                    <GroupList
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                        selectedItem={selectedProf}
                    />
                    <button
                        className={'btn btn-secondary m-2'}
                        onClick={handleClearFilter}
                    >
                        Очистить
                    </button>
                </div>
            )}
            <div className="d-flex flex-column m-2">
                <SearchStatus length={itemsCount} />
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
                            {usersCrop.map((user) => {
                                return (
                                    <User key={user._id} {...user} {...rest} />
                                )
                            })}
                        </tbody>
                    </table>
                )}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={itemsCount}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    )
}
Users.propTypes = {
    users: PropTypes.array
}

export default Users
