import React from 'react'
import Quality from './quality'
import PropTypes from 'prop-types'
import { useQuality } from '../../../hooks/useQuality'

const QualitiesList = (qualitiesList) => {
    // console.log('qualitiesId', qualitiesList)
    const qualitiesId = qualitiesList.qualities
    const { isLoading, getQuality } = useQuality()
    const qualities = getQuality(qualitiesId)
    // console.log('qualities', qualities)

    if (!isLoading) {
        return (
            <>
                {qualities.map((q) => {
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
