import React from 'react'
import Quality from './qualities'
import PropTypes from 'prop-types'

const QualitiesList = ({ qualities }) => {
    return (
        <>
            {qualities.map((q) => {
                return <Quality key={q._id} {...q} />
            })
            }
        </>
    )
}

QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
}

export default QualitiesList
