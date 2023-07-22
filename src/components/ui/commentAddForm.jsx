import React, { useEffect, useState } from 'react'
import { validator } from '../../utils/validator'
import api from '../../api'
import SelectField from '../common/form/selectField'
import PropTypes from 'prop-types'
import TextAreaField from '../common/form/textAreaField'
import { useHistory } from 'react-router-dom'

const CommentAddForm = ({ userId }) => {
    const [users, setUsers] = useState([])
    const [data, setData] = useState({
        user: '',
        text: ''
    })
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const history = useHistory()

    useEffect(() => {
        setErrors(validator(data, validatorConfig))
    }, [data])

    // useEffect(() => {
    //     // console.log('send request')

    useEffect(() => {
        setIsLoading(true)
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

    useEffect(() => {
        if (users.length > 0) setIsLoading(false)
    }, [users])

    // const transformData = (qualities) => {
    //     // console.log(qualities)
    //     return Object.keys(qualities).map((qualitiesName) => ({
    //         label: qualities[qualitiesName].name,
    //         value: qualities[qualitiesName]._id,
    //         color: qualities[qualitiesName].color
    //     }))
    // }

    const validatorConfig = {
        user: {
            isRequired: {
                message: `обязательно выберите пользователя!`
            }
        },
        text: {
            isRequired: {
                message: `обязательно введите текст комментария!`
            }
        }
    }

    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleChange = (target) => {
        // console.log('target', target)
        // console.log('target.name', target.name)
        // console.log('target.value', target.value)
        // console.log('data1', data)
        setData(prevState => {
            // console.log('prevState', prevState)
            return {
                ...prevState,
                [target.name]: target.value
            }
        })
        // console.log('data2', data)
    }

    const isValid = Object.keys(errors).length === 0

    const handleSubmit = (e) => {
        console.log(data)
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return
        // console.log(e.target[1].name)
        // console.log(e.target[1].value)
        const { user, text } = data
        const page = userId

        // console.log({
        //     ...data,
        //     profession: getProfessionById(profession),
        //     qualities: getQualities(qualities)
        // })

        // console.log('user', user)
        // console.log('comment', text)

        api.comments.add({
            // _id: '12345',
            userId: page,
            pageId: user,
            content: text
        }).then()

        // window.setTimeout(() => { history.push(`/users/${userId}`) }, 1000)

        // api.users.update(userId, {
        //     ...data
        // })
        //     .then((data) => {
        // history.push(`/users/${data._id}`)
        //     })
        // console.log('/users/data._id', `/users/${userId}`)
        // history.push(`/users/${userId}`)
        history.push(`/users`)
    }

    // if (data) {
    if (!isLoading) {
        return (
            <form onSubmit={handleSubmit}>
                <SelectField
                    onChange={handleChange}
                    defaultOption='Выберите пользователя'
                    name='user'
                    options={users}
                    label='Выберите пользователя'
                    error={errors.user}
                    value={data.user}
                />
                <TextAreaField
                    onChange={handleChange}
                    name='text'
                    label='Сообщение'
                    rows='3'
                    error={errors.text}
                    value={data.text}
                />
                {/* <div className="form-group">*/}
                {/*    <label htmlFor="comment">Сообщение</label>*/}
                {/*    <textarea className="form-control mb-3 mt-2" id="comment" rows="3" name='comment'></textarea>*/}
                {/* </div>*/}
                <div className="d-flex justify-content-end">
                    <button
                        type='submit'
                        disabled={!isValid}
                        // disabled={true}
                        className='btn btn-primary pull-left'
                    >
                        Опубликовать
                    </button>
                </div>
            </form>
        )
    } else {
        return (
            <>
                {'loading...'}
            </>
        )
    }
}

CommentAddForm.propTypes = {
    userId: PropTypes.string.isRequired
}
export default CommentAddForm
