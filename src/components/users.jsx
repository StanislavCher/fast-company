import React, { useEffect, useState } from 'react'
import Pagination from './pagination'
import { paginate } from '../utils/paginate'
import PropTypes from 'prop-types'
import GroupList from './groupList'
import api from '../api/index'
import SearchStatus from './searchStatus'
import UsersTable from './usersTable'
import _ from 'lodash'

const Users = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [professions, setProfessions] = useState(undefined)
    const [selectedProf, setSelectedProf] = useState(undefined)
    const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })

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
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark }
                }
                return user
            })
        )
    }

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

    if (users) {
        const selectedUsers = selectedProf
            ? users.filter((user) => {
                return (
                    JSON.stringify(user.profession) ===
                    JSON.stringify(selectedProf)
                )
            })
            : users

        const itemsCount = users ? selectedUsers.length : 0

        const pageSize = 8

        const sortedUsers = _.orderBy(selectedUsers, [sortBy.path], [sortBy.order])

        const usersCrop = paginate(sortedUsers, currentPage, pageSize)

        const handleClearFilter = () => {
            setSelectedProf(undefined)
        }

        const handleSort = (item) => {
            setSortBy(item)
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
                    <SearchStatus length={itemsCount}/>
                    {itemsCount > 0 && (
                        <UsersTable
                            users={usersCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookmark={handleToggleBookmark}
                        />
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
    } else return 'loading...'
}
Users.propTypes = {
    users: PropTypes.array
}

export default Users
