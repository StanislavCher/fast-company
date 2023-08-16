import React from 'react'
import Quality from './quality'
import PropTypes from 'prop-types'
import { useQuality } from '../../../hooks/useQuality'

const QualitiesList = ({ qualities }) => {
    const { isLoading, getQuality } = useQuality()
    const qualitiesObject = getQuality(qualities)

    if (!isLoading) {
        return (
            <>
                {qualitiesObject.map((q) => {
                    return <Quality key={q._id} {...q} />
                })
                }
            </>)
    } else {
        return 'Loading ...'
    }

    // return (
    //     <>
    //         {qualities.map((q) => {
    //             return <Quality key={q._id} {...q} />
    //         })
    //         }
    //     </>
    // )
}

QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
}

export default QualitiesList
