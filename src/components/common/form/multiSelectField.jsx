import React from 'react'
import PropTypes from 'prop-types'
// import Select from 'react-select/base'
import Select from 'react-select'

const MultiSelectField = ({ options, onChange, name, label, defaultValue }) => {
    const optionsArray =
        !Array.isArray(options) && typeof (options) === 'object'
            ? Object.keys(options).map(optionName => {
                return {
                    label: options[optionName].name,
                    value: options[optionName]._id
                }
            })
            : options.map(option => {
                return {
                    label: option.name,
                    value: option._id
                }
            })
    const handleChange = (value) => {
        onChange({ name, value })
    }
    return (
        <div className='mb-4'>
            <label className="form-label">{label}</label>
            {/* <Select*/}
            {/*    onMenuClose={}*/}
            {/*    onChange={}*/}
            {/*    onMenuOpen={}*/}
            {/*    inputValue={}*/}
            {/*    value={}*/}
            {/*    onInputChange={}*/}
            {/* />*/}
            <Select
                isMulti
                closeMenuOnSelect={false}
                defaultValue={defaultValue}
                options={optionsArray}
                className='basic-multi-select'
                classNamePrefix='select'
                // onChange={onChange}
                onChange={handleChange}
                name={name}
            />
        </div>
    )
}

MultiSelectField.propTypes = {
    name: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    onChange: PropTypes.func,
    defaultValue: PropTypes.array,
    label: PropTypes.string
}
export default MultiSelectField
