import React, { useEffect, useState } from 'react'
import TextField from '../common/form/textField'
import { validator } from '../../utils/validator'

const LoginForm = () => {
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState({})

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
