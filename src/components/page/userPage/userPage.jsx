import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../../../api'
import Qualities from '../../ui/qualities'
import PropTypes from 'prop-types'
import CommentAddForm from '../../ui/commentAddForm'

const UserPage = ({ userId }) => {
    const [userData, setUsersData] = useState(undefined)

    useEffect(() => {
        api.users.getById(userId).then((data) => setUsersData(data))
    }, [])

    const [userComments, setComments] = useState(undefined)

    useEffect(() => {
        api.comments.fetchCommentsForUser(userId).then((data) => {
            // const sortDataByCommentDate = [...data].sort((a, b) => { return (a - b) })
            // setComments(sortDataByCommentDate)
            setComments(data)
        })
    }, [])

    const [users, setUsers] = useState([])

    useEffect(() => {
        // setIsLoading(true)
        api.users.fetchAll().then((data) => {
            // console.log('data', data)
            const userList = data.map((userdata) => {
                // console.log('userdata._id', userdata._id)
                // console.log('userdata.name', userdata.name)
                return ({
                    value: userdata._id,
                    label: userdata.name
                })
            })
            setUsers(userList)
            // console.log('users', users)
            // setData((prevState) => ({
            //     ...prevState,
            //     ...data
            // })
            // )
            // console.log('data', data)
        })
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

    const sortedComments = () => {
        // console.log([...userComments])
        return [...userComments].sort((a, b) => { return Number(a.created_at) - Number(b.created_at) })
    }

    const getTrueMonth = (month) => {
        switch (month) {
        case '0':
            return 'january'
        case '1':
            return 'february'
        case '2':
            return 'march'
        case '3':
            return 'april'
        case '4':
            return 'may'
        case '5':
            return 'june'
        case '6':
            return 'july'
        case '7':
            return 'august'
        case '8':
            return 'september'
        case '9':
            return 'october'
        case '10':
            return 'november'
        case '11':
            return 'december'
        default:
            return 'unknown month'
        }
    }

    const createDate = (ms) => {
        // console.log(ms)
        // console.log(typeof ms)
        let msNumber
        (typeof ms === 'string') ? msNumber = new Date(Number(ms)) : msNumber = ms
        // console.log(msNumber)

        const deltaCommentTime = new Date() - msNumber
        // console.log(deltaCommentTime)

        if (deltaCommentTime < 60 * 1000) return ' 1 минуту назад'
        else if (deltaCommentTime < 5 * 60 * 1000) return ' 5 минут назад'
        else if (deltaCommentTime < 10 * 60 * 1000) return ' 10 минут назад'
        else if (deltaCommentTime < 30 * 60 * 1000) return ' 30 минут назад'
        else if (deltaCommentTime < 24 * 60 * 60 * 1000) {
            // console.log(msNumber)
            // console.log((new Date(msNumber)))
            // console.log((new Date(msNumber).getHours().toString()))
            return (
                ' ' + msNumber.getHours().toString() +
                ' h ' +
               msNumber.getMinutes().toString() +
                ' mm '
            )
        } else if (deltaCommentTime < 31 * 24 * 60 * 60 * 1000) {
            return (
                ' ' + msNumber.getDay().toString() +
                ' ' +
                getTrueMonth(msNumber.getMonth().toString())
            )
        } else if (deltaCommentTime < 366 * 31 * 24 * 60 * 60 * 1000) {
            return (
                ' ' + msNumber.getDay().toString() +
                ' ' +
                getTrueMonth(msNumber.getMonth().toString()) +
                ' ' +
                msNumber.getFullYear().toString() +
                    ''
            )
        }
    }

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
                                        users={users}
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
                                            ? sortedComments().map((comment) => {
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
