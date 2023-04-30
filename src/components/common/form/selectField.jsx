import React from 'react'
import PropTypes from 'prop-types'

const SelectField = ({ label, value, onChange, defaultOption, options, error }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value })
    }
    const getInputClasses = () => {
        return 'form-select' + (error ? ' is-invalid' : '')
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
            <select
                className={ getInputClasses() }
                id="validationCustom04"
                name='profession'
                value={value}
                // onChange={onChange}
                onChange={handleChange}
            >
                <option disabled value="">{defaultOption}</option>
                {optionsArray && optionsArray.map(option => <option
                    key={option.value}
                    id={option.value}
                >
                    {option.name}
                </option>)
                }
            </select>
            { error && <div className="invalid-feedback">
                { error }
            </div> }
        </div>
    )
}

SelectField.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    defaultOption: PropTypes.string.isRequired,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    error: PropTypes.string
}

export default SelectField
