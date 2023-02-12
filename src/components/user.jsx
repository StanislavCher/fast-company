import React from 'react'
import Quality from './qualities'
import Bookmark from "./bookmark";

const User = ({
                  _id,
                  name,
                  qualities,
                  profession,
                  completedMeetings,
                  rate,
                  bookmark,
                  onToggleBookmark,
                  onDelete,
              }) => {
    //console.log(row)
    //console.log(onToggleBookmark)
    //console.log(row.onDelete)

    // const handleDelete = () => {
    //     onDelete(_id)
    // }

    return (
        <>
            <tr>
                <td>
                    {name}
                </td>
                <td>
                    {qualities.map((q) => {
                        return (<Quality key={q._id} {...q} />)
                    })}
                </td>
                <td>
                    {profession.name}
                </td>
                <td>
                    {completedMeetings}
                </td>
                <td>
                    {rate}/5
                </td>
                <td>
                    {/*onClick={() => {row.onToggle(row.id)}}>*/}
                    {/*onClick={handleToggle}>*/}
                    <Bookmark
                        status={bookmark}
                        onClick={() => {onToggleBookmark(_id)}}
                        // id={_id}
                        // onToggle={onToggle}
                    />
                </td>
                <td>
                    <button className='btn btn-danger'
                            onClick={() => onDelete(_id)}
                            //onClick={() => row.onDelete(row.id)}
                            //onClick={row.onDelete}
                                // () => {
                                //     //console.log(typeof row[0])
                                //     console.log(row[0])
                                //     row[0].toString()
                                //     //row[0](row.id)
                                //}
                            //}
                            //onClick={row[0](row.id)}
                    >
                        delete
                    </button>
                </td>
            </tr>
        </>
    )
}

export default User