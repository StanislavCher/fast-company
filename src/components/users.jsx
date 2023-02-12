import React from "react";
import User from './user'

const Users = ({users, ...rest}) => {

    //console.log(users)
    //console.log(rest)

    //const valuesAll = Object.values(usersApi)

    //const valuesUsers = valuesAll.filter(value => (typeof value !== 'function'))
    //const valuesFunctions = valuesAll.filter(value => (typeof value === 'function'))
    //console.log(valuesFunctions)

    // const handleDelete = () => {
    //
    // }

    return (
        <>
            {/*{console.log(length)}*/}
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
                            <th>Избранное</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user) => {
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