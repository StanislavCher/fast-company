import React from 'react'
// import { useAuth } from '../../hooks/useAuth'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { getIsLoggedIn } from '../../store/users'

const ProtectedRoute = ({ component: Component, children, ...rest }) => {
    // const { currentUser } = useAuth()
    const isLoggedIn = useSelector(getIsLoggedIn())
    return (
        <Route
            {...rest}
            render={(props) => {
                // if (!currentUser) {
                if (!isLoggedIn) {
                    return <Redirect to={
                        {
                            pathname: '/login',
                            state: {
                                from: props.location
                            }
                        }
                    } />
                }
                return Component ? <Component { ...props } /> : children
            }}
        />
    )
}

ProtectedRoute.propTypes = {
    component: PropTypes.func,
    location: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}
export default ProtectedRoute
