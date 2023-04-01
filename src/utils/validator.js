export const validator = (data, config) => {
    const errors = {}

    const validate = (validateMethod, data, config) => {
        const emailRegExp = /^\S+@\S+\.\S+$/g
        const capitalChar = /[A-Z]+/g
        const digit = /\d+/g
        // const minLen = /^\S{8,}$/g
        let statusValidate = true
        switch (validateMethod) {
        case 'isRequired': {
            // console.log('validatorConfig[textField][validatorField].message', validatorConfig[textField][validatorField].message)
            statusValidate = data.trim() === ''
            break
        }
        case 'isEmail': {
            statusValidate = !emailRegExp.test(data)
            break
        }
        case 'isCapitalSymbol': {
            statusValidate = !capitalChar.test(data)
            break
        }
        case 'isContainDigit': {
            statusValidate = !digit.test(data)
            break
        }
        case 'isMinLen': {
            statusValidate = data.length < config.len
            break
        }
        default: {
            break
        }
        }
        if (statusValidate) return config.message
    }

    for (const fieldName in data) {
        for (const validatorMethod in config[fieldName]) {
            const error = validate(
                validatorMethod,
                data[fieldName],
                config[fieldName][validatorMethod]
            )
            if (error && !errors[fieldName]) {
                errors[fieldName] = error
            }
        }
    }
    // console.log('errors', errors)
    return errors
    // return Object.keys(errors).length === 0
}
