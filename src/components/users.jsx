import React, {useState} from "react";
import api from '../api'

console.log(api.users.fetchAll())

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId))
    }

    const renderPhrase = (number) => {
        //console.log([2,3,4].indexOf(Number(number.toString().slice(-1))))
        if (number < 15 && number > 4) return 'человек тусанет'
        if ([2,3,4].indexOf(Number(number.toString().slice(-1))) !== -1) return 'человека тусанут'
        if (Number(number.toString().slice(-1)) === 1) return 'человек тусанет'
    }

    return (
        <>
            <h3><span className={
                'p-2 m-2 badge bg-' + (users.length > 0 ? 'primary' : 'danger')}
            >
                    {users.length > 0 ? `${users.length} ${renderPhrase(users.length)} с тобой сегодня` : 'Никто с тобой не тусанет'}

                    </span>
            </h3>

            {(users.length > 0) &&
                (
                    <table className='table'>
                        <thead>
                        <tr>
                            <th>Имя</th>
                            <th>Качества</th>
                            <th>Профессия</th>
                            <th>Встретился, раз</th>
                            <th>Оценка</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((row) => {
                            return (
                                <tr key={row._id}>
                                    <td>
                                        {row.name}
                                    </td>
                                    <td>
                                        {row.qualities.map((quality) => {
                                            return (
                                                <span className={'m-1 badge bg-' + quality.color} key={quality._id}>
                                            {quality.name}
                                        </span>
                                            )
                                        })}
                                    </td>
                                    <td>
                                        {row.profession.name}
                                    </td>
                                    <td>
                                        {row.completedMeetings}
                                    </td>
                                    <td>
                                        {row.rate}/5
                                    </td>
                                    <td>
                                        <button className='btn btn-danger'
                                                onClick={() => handleDelete(row._id)}>delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                        }
                        </tbody>
                    </table>
                )
            }
        </>
    )
}

export default Users