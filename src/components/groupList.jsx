import React from 'react'
import PropTypes from 'prop-types'

const GroupList = ({
    items,
    valueProperty,
    contentProperty,
    onItemSelect,
    selectedItem
}) => {
    const handleItemSelect = (id) => {
        // console.log('id', id)
        onItemSelect(id)
    }
    // console.log(Object.values(items))
    // console.log(Array.isArray(items), items)
    if (Array.isArray(items) === false) {
        return (
            <ul className="list-group">
                {Object.keys(items).map((item) => {
                    // console.log('selectedItem', selectedItem)
                    // console.log('items', items[item])
                    return (
                        <li
                            key={items[item][valueProperty]}
                            className={
                                'list-group-item' +
                                (selectedItem === items[item] ? ' active' : '')
                            }
                            role={'button'}
                            onClick={() => handleItemSelect(items[item])}
                        >
                            {items[item][contentProperty]}
                        </li>
                    )
                })}
            </ul>
        )
    } else {
        return (
            <ul className="list-group">
                {items.map((item) => {
                    // console.log('selectedItem', selectedItem)
                    // console.log('items', items[item])
                    return (
                        <li
                            key={item[valueProperty]}
                            className={
                                'list-group-item' +
                                (selectedItem === item ? ' active' : '')
                            }
                            role={'button'}
                            onClick={() => handleItemSelect(item)}
                        >
                            {item[contentProperty]}
                        </li>
                    )
                })}
            </ul>
        )
    }
}

GroupList.defaultProps = {
    valueProperty: '_id',
    contentProperty: 'name'
}

GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func.isRequired,
    selectedItem: PropTypes.object
}

export default GroupList
