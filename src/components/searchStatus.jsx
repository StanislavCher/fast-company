import React from 'react'

const SearchStatus = ({length}) => {
    const renderPhrase = (number) => {
        const lastOne = Number(number.toString().slice(-1))
        if (number > 4 && number < 15) return 'человек тусанет'
        if (lastOne === 1) return 'человек тусанет'
        if ([2,3,4].indexOf(lastOne) >= 0) return 'человека тусанут'
    }

    return (
        <h2><span className={'p-2 m-2 badge bg-' + (length > 0 ? 'primary' : 'danger')}>
                {length > 0 ? `${length} ${renderPhrase(length)} с тобой сегодня` : 'Никто с тобой не тусанет'}
            </span>
        </h2>
    )
}

export default SearchStatus