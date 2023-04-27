import React from 'react'
import PropTypes from 'prop-types'

const RadioField = ({ label, value, onChange, options, error }) => {
    const getInputClasses = () => {
        return 'form-check-input' + (error ? ' is-invalid' : '')
    }
    // console.log('options1', options)
    const optionsArray =
        !Array.isArray(options) && typeof (options) === 'object'
            ? Object.keys(options).map(optionName => {
                return { name: options[optionName].name, value: options[optionName]._id }
            })
            : options.map(option => {
                return { name: option.name, value: option._id }
            })
    // console.log('options2', options)
    // console.log('optionsArray', optionsArray)
    // console.log('value', value)
    return (
        <div className='mb-4'>
            <label htmlFor="validationCustom04" className="form-label">{label}</label>
            {optionsArray.map(option => {
                return (
                    <div key={option.name + '_' + option.value} className="form-check">
                        <input
                            type="radio"
                            className={getInputClasses()}
                            id={option.name + '_' + option.value}
                            name={name}
                            value={option.value}
                            required
                            checked={option.value === value}
                            onChange={onChange}
                        />
                        <label
                            className="form-check-label"
                            htmlFor={option.name + '_' + option.value}
                        >
                            {option.name}
                        </label>
                    </div>
                )
            })
            }
        </div>
    )
}

RadioField.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    error: PropTypes.string
}

export default RadioField
