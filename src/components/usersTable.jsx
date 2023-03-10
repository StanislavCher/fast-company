import React from 'react'
// import User from './user'
import PropTypes from 'prop-types'
// import TableHeader from './tableHeader'
// import TableBody from './tableBody'
import Bookmark from './bookmark'
import QualitiesList from './qualitiesList'
import Table from './table'

const UsersTable = ({
    users,
    onSort,
    selectedSort,
    onToggleBookmark,
    onDelete,
    ...rest
}) => {
    const columns = {
        name: { path: 'name', name: 'Имя' },
        qualities: {
            path: 'qualities',
            name: 'Качества',
            component: (user) => (
                <QualitiesList qualities={user.qualities}/>
            )
        },
        professions: { path: 'profession.name', name: 'Профессия' },
        completedMeetings: {
            path: 'completedMeetings',
            name: 'Встретился, раз'
        },
        rate: { path: 'rate', name: 'Оценка' },
        bookmark: {
            path: 'bookmark',
            name: 'Избранное',
            component: (user) => (
                <Bookmark
                    status={user.bookmark}
                    onClick={() => {
                        onToggleBookmark(user._id)
                    }}
                />
            )
        },
        delete: {
            component: (user) => (
                <button
                    className="btn btn-danger"
                    onClick={() => onDelete(user._id)}
                >
                delete
                </button>
            )
        }
    }

    return (
        <>
            <Table
                /* {...{ onSort, selectedSort, columns, data: users }}*/
                onSort={onSort}
                selectedSort={selectedSort}
                columns={columns}
                data={users}
            />

            {/* <Table>*/}
            {/*    <TableHeader*/}
            {/*        {...{ onSort, selectedSort, columns }}*/}
            {/*        // onSort={onSort}*/}
            {/*        // selectedSort={selectedSort}*/}
            {/*        // columns={columns}*/}
            {/*    />*/}
            {/*    <TableBody*/}
            {/*        { ...{ columns, data: users }}*/}
            {/*        // data={users}*/}
            {/*        // columns={columns}*/}
            {/*    />*/}
            {/* </Table>*/}

        </>
    )
}
UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookmark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default UsersTable
