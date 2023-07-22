import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../../../api'
import Qualities from '../../ui/qualities'
import PropTypes from 'prop-types'
import CommentAddForm from '../../ui/commentAddForm'

const UserPage = ({ userId }) => {
    const [userData, setUsers] = useState(undefined)

    useEffect(() => {
        api.users.getById(userId).then((data) => setUsers(data))
    }, [])

    const [userComments, setComments] = useState(undefined)

    useEffect(() => {
        api.comments.fetchCommentsForUser(userId).then((data) => setComments(data))
    }, [])

    const history = useHistory()

    // const { userId } = useParams()

    const handleClick = () => {
        // history.push(`/users/${userId}/edit`)
        history.push(history.location.pathname + `/edit`)
    }

    const handleDelClick = (e) => {
        // api.comments.remove(id).then(r => console.log(r))
        // history.push(history.location.pathname)
        // console.log(e)
        // console.log(e.target.parentElement.id)
        // console.log(e.target.name)
        api.comments.remove(e.target.parentElement.id).then()
        api.comments.fetchCommentsForUser(userId).then((data) => setComments(data))
    }

    const handleUpdateForm = () => {
        api.comments.fetchCommentsForUser(userId).then((data) => setComments(data))
    }

    // const handleClickAllUsers = () => {
    //     // history.push(`/users/${userId}`)
    //     history.push(`/users`)
    // }

    if (userData) {
        return (
            <>
                <div className="container">
                    <div className="row gutters-sm">
                        {/* // Users - left side*/}
                        <div className="col-md-4 mb-3">
                            {/* User Card*/}
                            <div className="card mb-3">
                                <div className="card-body">
                                    <button className="position-absolute top-0 end-0 btn btn-light btn-sm"
                                        onClick={ handleClick }
                                    >
                                        <i className="bi bi-gear"></i>
                                    </button>
                                    <div
                                        className="d-flex flex-column align-items-center text-center position-relative">
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
                                        <div className="mt-3">
                                            <h4>{userData.name}</h4>
                                            <p className="text-secondary mb-1">{userData.profession.name}</p>
                                            <div className="text-muted">
                                                <i className="bi bi-caret-down-fill text-primary" role="button"></i>
                                                <i className="bi bi-caret-up text-secondary" role="button"></i>
                                                <span className="ms-2">{userData.rate}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Qualities Card*/}
                            <div className="card mb-3">
                                <div className="card-body d-flex flex-column justify-content-center text-center">
                                    <h5 className="card-title">
                                        <span>Qualities</span>
                                    </h5>
                                    <p className="card-text">
                                        <Qualities qualities={userData.qualities} />
                                    </p>
                                </div>
                            </div>
                            {/* MeetingsCard*/}
                            <div className="card mb-3">
                                <div className="card-body d-flex flex-column justify-content-center text-center">
                                    <h5 className="card-title">
                                        <span>Completed meetings</span>
                                    </h5>

                                    <h1 className="display-1">{userData.completedMeetings}</h1>
                                </div>
                            </div>
                            {/* <h1>{userData.name}</h1>*/}
                            {/* <h2>Профессия: {userData.profession.name}</h2>*/}
                            {/* <Qualities qualities={userData.qualities} />*/}
                            {/* <p>completedMeetings: {userData.completedMeetings}</p>*/}
                            {/* <h2>Rate: {userData.rate}</h2>*/}
                            {/* <button>*/}
                            {/*    <Link className='nav-link' to={ '/users' } >Все пользователи</Link>*/}
                            {/* </button>*/}
                            {/* <button onClick={ handleClick }>*/}
                            {/*    Редактировать*/}
                            {/* </button>*/}
                            {/* <span>   </span>*/}
                            {/* <button onClick={ handleClickAllUsers }>*/}
                            {/*    Все пользователи*/}
                            {/* </button>*/}
                            {/* //pageContent...*/}
                        </div>
                        {/* // Comments - right side*/}
                        <div className="col-md-8">
                            {/* // Add comment form*/}
                            <div className="card mb-2">
                                {' '}
                                <div className="card-body ">
                                    <h2>New comment</h2>
                                    <CommentAddForm
                                        userId={userId}
                                        updateForm={handleUpdateForm}
                                    />
                                    {/* //add comment*/}
                                </div>
                            </div>
                            {/* // Display comments*/}
                            <div className="card mb-3">
                                <div className="card-body ">
                                    <h2>Comments</h2>
                                    <hr/>
                                    {/* //comments*/}
                                    { userComments
                                        ? (userComments.length > 0)
                                            ? userComments.map((comment) => {
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
                                                                            <div
                                                                                className="d-flex justify-content-between align-items-center">
                                                                                <p className="mb-1 ">
                                                                                    {/* //User Name*/}
                                                                                    {comment.userId}
                                                                                    <span className="small">
                                                                                        {/* //Published Time*/}
                                                                                        {comment.created_at}
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
                                            : ''
                                        : 'loading...'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                {'loading...'}
            </>
        )
    }
}

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
}

export default UserPage
