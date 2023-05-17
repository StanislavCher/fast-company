import React, { useEffect, useState } from 'react'
import { validator } from '../../utils/validator'
import TextField from '../common/form/textField'
import api from '../../api'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioField'
import MultiSelectField from '../common/form/multiSelectField'
import CheckBoxField from '../common/form/checkBoxField'

const RegisterForm = () => {
    const [professions, setProfessions] = useState([])
    const [qualities, setQualities] = useState([])
    const [data, setData] = useState({
        email: '',
        password: '',
        profession: '',
        sex: 'male',
        qualities: [],
        licence: false
    })

    const [errors, setErrors] = useState({})

    useEffect(() => {
        setErrors(validator(data, validatorConfig))
    }, [data])

    // useEffect(() => {
    //     // console.log('send request')
    //     api.professions.fetchAll().then((data) => setProfessions(data))
    //     api.qualities.fetchAll().then((data) => setQualities(data))
    // }, [])
    useEffect(() => {
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

    // useEffect(() => {
    //     console.log(professions)
    // }, [professions])

    const validatorConfig = {
        email: {
            isRequired: {
                message: `email не должен быть пустым!`
            },
            isEmail: {
                message: `email введен некорректно!`
            }
        },
        password: {
            isRequired: {
                message: `пароль не должен быть пустым!`
            },
            isCapitalSymbol: {
                message: `пароль должен содержать хотя бы 1 заглавную букву!`
            },
            isContainDigit: {
                message: `пароль должен содержать хотя бы 1 цифру!`
            },
            isMinLen: {
                message: `минимальная длина пароля 8 символов!`,
                len: 8
            }
        },
        profession: {
            isRequired: {
                message: `обязательно выберите свою профессию!`
            }
        },
        licence: {
            isChecked: {
                message: `согласие с правилами обязательно!`
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

        console.log({
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        })

        console.log(data)
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

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label='Enter email'
                name='email'
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label='Enter password'
                type='password'
                name='password'
                value={data.password}
                onChange={handleChange}
                error={errors.password}
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
            <CheckBoxField
                name='licence'
                // label='Подтвердите согласие с правилами'
                value={data.licence}
                onChange={handleChange}
                error={errors.licence}
            >
                Подтвердите согласие с <a>правилами</a>
            </CheckBoxField>
            {/* <div className='mb-4'>*/}
            {/*    <label htmlFor="validationCustom04" className="form-label">State</label>*/}
            {/*    <select*/}
            {/*        className="form-select"*/}
            {/*        id="validationCustom04"*/}
            {/*        name='profession'*/}
            {/*        value={data.profession}*/}
            {/*        onChange={handleChange}*/}
            {/*    >*/}
            {/*        <option disabled value="">Choose...</option>*/}
            {/*        {professions && professions.map(profession => <option*/}
            {/*            key={profession._id}*/}
            {/*            id={profession._id}*/}
            {/*        >*/}
            {/*            {profession.name}*/}
            {/*        </option>)*/}
            {/*        }*/}
            {/*    </select>*/}
            {/*    <div className="invalid-feedback">*/}
            {/*        Please select a valid state.*/}
            {/*    </div>*/}
            {/* </div>*/}
            <button
                type='submit'
                disabled={!isValid}
                // disabled={true}
                className='btn btn-primary w-100 mx-auto'
            >
                Submit
            </button>
        </form>
    )
}

export default RegisterForm
