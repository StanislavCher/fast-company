import React, {useState} from "react";
import api from '../api'

console.log(api.users.fetchAll())

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())

    const handleDelete = (userId) => {
        setUsers(prevState => prevState.filter((row) => {
            return (row._id !== userId)
        }))
        //renderPhrase(users.length)
    }

    // const renderPhrase = (number) => {
    //
    // }

    if (users.length === 0) return (
        <h3>
            <span className='badge bg-danger'>Никто с тобой не тусанет</span>
        </h3>
    )
    else if (users.length > 0)
        return (
            <>
                <h3><span className='p-2 m-2 badge bg-primary'>{users.length} человек тусанет с тобой сегодня</span>
                </h3>
                <table className='table'>
                    <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((row) => {
                        return (
                            <tr key={row._id}>
                                <td key='row-name'>
                                    {row.name}
                                </td>
                                <td key='row-qualities'>
                                    {row.qualities.map((quality) => {
                                        return (
                                            <span className={'m-1 badge bg-' + quality.color} key={quality._id}>
                                            {quality.name}
                                        </span>
                                        )
                                    })}
                                </td>
                                <td key={row.profession.id}>
                                    {row.profession.name}
                                </td>
                                <td key='row-completedMeetings'>
                                    {row.completedMeetings}
                                </td>
                                <td key='row-rate'>
                                    {row.rate}/5
                                </td>
                                <td key='row-delete'>
                                    <h5><span className='p-2 badge bg-danger'
                                              onClick={() => handleDelete(row._id)}>delete</span></h5>
                                </td>
                            </tr>
                        )
                    })
                    }
                    </tbody>
                </table>
            </>
        )
}

export default Users