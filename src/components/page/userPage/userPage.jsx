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
import { useUser } from '../../../hooks/useUsers'
import { useProfession } from '../../../hooks/useProfession'
import { CommentsProvider } from '../../../hooks/useComments'

const UserPage = ({ userId }) => {
    const { users, getUserById } = useUser()
    // const { getUserById } = useUser()
    const userData = getUserById(userId)
    // console.log('userData', userData)
    const userList = users.map((userdata) => {
        // console.log('userdata._id', userdata._id)
        // console.log('userdata.name', userdata.name)
        return ({
            value: userdata._id,
            label: userdata.name
        })
    })
    // console.log('userList', userList)
    const { isLoading: professionsLoading, getProfession } = useProfession()
    const [profession, setProfession] = useState('')
    useEffect(() => {
        if (!professionsLoading) {
            setProfession(getProfession(userData.profession).name)
            // console.log('render')
        }
    }, [userData])

    // console.log('getProfession', getProfession)

    // console.log('professionName', professionName)
    // const [userData, setUsersData] = useState(undefined)
    //
    // useEffect(() => {
    //     api.users.getById(userId).then((data) => setUsersData(data))
    // }, [])

    const [userComments, setComments] = useState(undefined)
    // console.log(userComments)
    //
    useEffect(() => {
        api.comments.fetchCommentsForUser(userId).then((data) => {
            // const sortDataByCommentDate = [...data].sort((a, b) => { return (a - b) })
            // setComments(sortDataByCommentDate)
            setComments(data)
        })
    }, [userId])

    // const [users, setUsers] = useState([])

    // useEffect(() => {
    //     // setIsLoading(true)
    //     api.users.fetchAll().then((data) => {
    //         // console.log('data', data)
    //         const userList = data.map((userdata) => {
    //             // console.log('userdata._id', userdata._id)
    //             // console.log('userdata.name', userdata.name)
    //             return ({
    //                 value: userdata._id,
    //                 label: userdata.name
    //             })
    //         })
    //         setUsers(userList)
    //         // console.log('users', users)
    //         // setData((prevState) => ({
    //         //     ...prevState,
    //         //     ...data
    //         // })
    //         // )
    //         // console.log('data', data)
    //     })
    // }, [])

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
                            {(!professionsLoading && profession)
                                ? (<Card>
                                    <UserCard
                                        handleClick={handleClick}
                                        userName={userData.name}
                                        userProfession={profession}
                                        userRate={userData.rate}
                                        userImage={userData.image}
                                        userId={userData._id}
                                    />
                                </Card>)
                                : 'Loading...'}
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
                            <CommentsProvider>
                                <Card>
                                    <CommentAddForm
                                        userId={userId}
                                        users={userList}
                                        updateForm={handleUpdateForm}
                                    />
                                </Card>
                                {/* // Display comments*/}
                                { userComments && (userComments.length > 0)
                                    ? (<Card>
                                        <CommentsCard
                                            handleDelClick={handleDelClick}
                                            users={userList}
                                            userComments={userComments}
                                        />
                                    </Card>)
                                    : ''}
                            </CommentsProvider>
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
