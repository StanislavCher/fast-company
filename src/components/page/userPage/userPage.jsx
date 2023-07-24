import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../../../api'
import PropTypes from 'prop-types'
import CommentAddForm from '../../ui/commentAddForm'
import Card from '../../ui/cards/card'
import UserCard from '../../ui/cards/userCard'
import QualitiesCard from '../../ui/cards/qualitiesCard'
import MeetingsCard from '../../ui/cards/meetingsCard'
import CommentsCard from '../../ui/cards/commentsCard'

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

    if (userData) {
        return (
            <>
                <div className="container">
                    <div className="row gutters-sm">
                        {/* // Users - left side*/}
                        <div className="col-md-4 mb-3">
                            {/* User Card*/}
                            <Card>
                                <UserCard
                                    handleClick={handleClick}
                                    userName={userData.name}
                                    userProfession={userData.profession.name}
                                    userRate={userData.rate}
                                />
                            </Card>
                            {/* Qualities Card*/}
                            <Card>
                                <QualitiesCard
                                    userQualities={userData.qualities}
                                />
                            </Card>
                            {/* MeetingsCard*/}
                            <Card>
                                <MeetingsCard
                                    userMeetings={userData.completedMeetings}
                                />
                            </Card>
                        </div>
                        {/* // Comments - right side*/}
                        <div className="col-md-8">
                            {/* // Add comment form*/}
                            <Card>
                                <CommentAddForm
                                    userId={userId}
                                    users={users}
                                    updateForm={handleUpdateForm}
                                />
                            </Card>
                            {/* // Display comments*/}
                            { (userComments.length > 0)
                                ? (<Card>
                                    <CommentsCard
                                        handleDelClick={handleDelClick}
                                        users={users}
                                        userComments={userComments}
                                    />
                                </Card>)
                                : ''}
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
