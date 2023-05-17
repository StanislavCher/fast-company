import React, { useEffect, useState } from 'react'
import { validator } from '../../utils/validator'
import TextField from '../common/form/textField'
import api from '../../api'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioField'
import MultiSelectField from '../common/form/multiSelectField'
// import CheckBoxField from '../common/form/checkBoxField'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

const UserEditForm = ({ userId }) => {
    const [professions, setProfessions] = useState([])
    const [qualities, setQualities] = useState([])
    const [data, setData] = useState({
        name: '',
        email: '',
        profession: '',
        sex: 'male',
        qualities: []
    })
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const history = useHistory()

    useEffect(() => {
        setErrors(validator(data, validatorConfig))
    }, [data])

    // useEffect(() => {
    //     // console.log('send request')
    //     api.professions.fetchAll().then((data) => setProfessions(data))
    //     api.qualities.fetchAll().then((data) => setQualities(data))
    // }, [])
    useEffect(() => {
        setIsLoading(true)
        api.users.getById(userId).then(({ profession, qualities, ...data }) => {
            // console.log('data', data)
            // console.log('profession', profession)
            // console.log('qualities', qualities)
            setData((prevState) => ({
                ...prevState,
                ...data,
                qualities: transformData(qualities),
                profession: profession._id
            })
            )
        })
        // console.log('send request')
        api.professions.fetchAll().then((data) => {
            const professionList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }))
            setProfessions(professionList)
        })
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((qualitiesName) => ({
                label: data[qualitiesName].name,
                value: data[qualitiesName]._id,
                color: data[qualitiesName].color
            }))
            setQualities(qualitiesList)
        })
    }, [])

    useEffect(() => {
        if (data._id) setIsLoading(false)
    }, [data])

    const transformData = (qualities) => {
        // console.log(qualities)
        return Object.keys(qualities).map((qualitiesName) => ({
            label: qualities[qualitiesName].name,
            value: qualities[qualitiesName]._id,
            color: qualities[qualitiesName].color
        }))
    }

    // useEffect(() => {
    //     console.log(professions)
    // }, [professions])

    const validatorConfig = {
        name: {
            isRequired: {
                message: `имя не должно быть пустым!`
            }
        },
        email: {
            isRequired: {
                message: `email не должен быть пустым!`
            },
            isEmail: {
                message: `email введен некорректно!`
            }
        },
        profession: {
            isRequired: {
                message: `обязательно выберите свою профессию!`
            }
        }
    }

    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleChange = (target) => {
        setData(prevState => {
            return {
                ...prevState,
                [target.name]: target.value
            }
        })
    }

    const isValid = Object.keys(errors).length === 0

    const handleSubmit = (e) => {
        // console.log(data)
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return
        const { profession, qualities } = data

        // console.log({
        //     ...data,
        //     profession: getProfessionById(profession),
        //     qualities: getQualities(qualities)
        // })

        // console.log(data)

        api.users.update(userId, {
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        })
            .then((data) => {
                history.push(`/users/${data._id}`)
            })
    }

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label }
            }
        }
    }

    const getQualities = (elements) => {
        const qualitiesArray = []
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    })
                }
            }
        }
        return qualitiesArray
    }

    // if (data) {
    if (!isLoading) {
        return (
            <form onSubmit={handleSubmit}>
                <TextField
                    label='Name'
                    name='name'
                    value={data.name}
                    onChange={handleChange}
                    error={errors.name}
                />
                <TextField
                    label='Email'
                    // type='password'
                    name='email'
                    value={data.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                <SelectField
                    onChange={handleChange}
                    defaultOption='Choose...'
                    name='profession'
                    options={professions}
                    label='Выберите Вашу профессию'
                    error={errors.profession}
                    value={data.profession}
                />
                <RadioField
                    options={[
                        { name: 'Male', value: 'male' },
                        { name: 'FeMale', value: 'female' }
                    ]}
                    value={data.sex}
                    name='sex'
                    onChange={handleChange}
                    label='Выберите Ваш пол'
                />
                <MultiSelectField
                    options={qualities}
                    onChange={handleChange}
                    defaultValue={data.qualities}
                    name='qualities'
                    label='Выберите Ваши качества'
                />
                <button
                    type='submit'
                    disabled={!isValid}
                    // disabled={true}
                    className='btn btn-primary w-100 mx-auto'
                >
                    Update
                </button>
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

UserEditForm.propTypes = {
    userId: PropTypes.string.isRequired
}
export default UserEditForm
