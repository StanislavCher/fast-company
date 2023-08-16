import React from 'react'
import { useProfession } from '../../hooks/useProfession'
import PropTypes from 'prop-types'

const Profession = ({ id }) => {
    // console.log(id)
    const { isLoading, getProfession } = useProfession()
    const prof = getProfession(id)
    // const profName = prof.name
    // console.log(profName)
    if (!isLoading) {
        return <p>{prof.name}</p>
    } else {
        return 'Loading ...'
    }
}

Profession.propTypes = {
    id: PropTypes.string
}

export default Profession
