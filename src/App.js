import React from 'react'
import NavBar from './components/navBar'
import { Route, Switch, Redirect } from 'react-router-dom'
import Main from './layouts/main'
import Login from './layouts/login'
import Users from './layouts/users'

const App = () => {
    return (
        <div>
            <NavBar/>
            <Switch>
                <Route path={'/users/:userId?'} component={ Users } />
                <Route path={'/login'} component={ Login } />
                <Route path={'/'} exact component={ Main } />
                <Redirect to={'/'} />
            </Switch>
        </div>
    )
}

export default App
