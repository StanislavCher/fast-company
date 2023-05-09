import React, { useState, useEffect } from 'react'
import TextField from '../common/form/textField'
import { validator } from '../../utils/validator'
import CheckBoxField from '../common/form/checkBoxField'
// import * as yup from 'yup'
// import { object, string, ValidationError } from 'yup'

const LoginForm = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
        stayOn: false
    })

    const [errors, setErrors] = useState({})

    // const validateScheme = object({
    //     password: string()
    //         .required('пароль не должен быть пустым!')
    //         .matches(/(?=.*[A-Z])/, 'пароль должен содержать хотя бы 1 заглавную букву!')
    //         .matches(/(?=.*[0-9])/, 'пароль должен содержать хотя бы 1 цифру!')
    //         .matches(/(?=.*[!@#$%^&*])/, 'пароль должен содержать хотя бы 1 из специальных символов!')
    //         .matches(/(?=.{8,})/, 'минимальная длина пароля 8 символов!'),
    //     email: string()
    //         .required('email не должен быть пустым!')
    //         .email('email введен некорректно')
    // })

    // useEffect(() => {
    //     setErrors(validate1())
    // }, [data])

    useEffect(() => {
        setErrors(validator(data, validatorConfig))
    }, [data])

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
        }
    }

    const validate = async () => {
        const errors = validator(data, validatorConfig)

        // validateScheme
        //     .validate(data)
        //     .then(() => setErrors({}))
        //     .catch((err) => setErrors({ [err.path]: err.message }))
        // try {
        //     // const errorIs = await validateScheme.validate(data,
        //     //     { stripUnknown: true })
        //     await validateScheme.validate(data)
        //     // if (errorIs === 'false') setErrors({})
        //     setErrors({})
        //     // console.log('errorIs|', errorIs)
        //     return 'true'
        // } catch (e) {
        //     if (e instanceof ValidationError) {
        //         // console.log('e', JSON.parse(e))
        //         // console.log('e', e)
        //         // console.log('e.path', e.path)
        //         // console.log('e.message', e.message)
        //         // console.log('e.name', e.name)
        //         // console.log('e.loading', e.loading)
        //         // console.log('e.errors', e.errors)
        //         // console.log('e.baseDataPath', e.baseDataPath)
        //         setErrors({ [e.path]: e.message })
        //         return 'false'
        //     }
        // }
        //
        setErrors(errors)
        // console.log(errors)
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
        console.log(data)
    }

    return (
        // <div className='container mt-5'>
        //     <div className="row">
        //         <div className="col-md-6 offset-md-3 shadow p-4">
        //             <h3 className='mb-4'>Login</h3>
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
            <CheckBoxField
                name='stayOn'
                // label='Подтвердите согласие с правилами'
                value={data.stayOn}
                onChange={handleChange}
            >
                Оставаться в системе
            </CheckBoxField>
            <button
                type='submit'
                disabled={!isValid}
                // disabled={true}
                className='btn btn-primary w-100 mx-auto'
            >
                Submit
            </button>
        </form>
        //         </div>
        //     </div>
        // </div>
    )
}

export default LoginForm
