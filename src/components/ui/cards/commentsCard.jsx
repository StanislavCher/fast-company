import React from 'react'
import PropTypes from 'prop-types'
import createDate from '../../../utils/date'

const CommentsCard = ({ userComments, handleDelClick, users }) => {
    const sortedComments = () => {
        // console.log([...userComments])
        return [...userComments].sort((a, b) => { return Number(a.created_at) - Number(b.created_at) })
    }

    return (
        <>
            <h2>Comments</h2>
            <hr/>
            {/* //comments*/}
            {sortedComments().map((comment) => {
                return (
                    <div key={comment._id} className="bg-light card-body  mb-3">
                        <div className="row">
                            <div className="col">
                                <div className="d-flex flex-start ">
                                    <img
                                        src={`https://avatars.dicebear.com/api/avataaars/${(
                                            Math.random() + 1
                                        )
                                            .toString(36)
                                            .substring(7)}.svg`}
                                        className="rounded-circle shadow-1-strong me-3"
                                        alt="avatar"
                                        width="65"
                                        height="65"
                                    />
                                    <div className="flex-grow-1 flex-shrink-1">
                                        <div className="mb-4">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <p className="mb-1 ">
                                                    {/* //User Name*/}
                                                    {users.find(user => user.value === comment.userId).label}
                                                    <span className="small">
                                                        {/* //Published Time*/}
                                                        {createDate(comment.created_at)}
                                                    </span>
                                                </p>
                                                <button
                                                    className="btn btn-sm text-primary d-flex align-items-center"
                                                    name={comment._id}
                                                    id={comment._id}
                                                    onClick={handleDelClick}>
                                                    <i className="bi bi-x-lg"></i>
                                                </button>
                                            </div>
                                            <p className="small mb-0">
                                                {/* //Comment content*/}
                                                {comment.content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
            }
        </>
    )
}

CommentsCard.propTypes = {
    userComments: PropTypes.array,
    handleDelClick: PropTypes.func,
    users: PropTypes.array
}

export default CommentsCard
