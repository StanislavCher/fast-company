import React from 'react'
import NavBar from './components/ui/navBar'
import { Route, Switch, Redirect } from 'react-router-dom'
import Main from './layouts/main'
import Login from './layouts/login'
import Users from './layouts/users'
import { ToastContainer } from 'react-toastify'
import { ProfessionProvider } from './hooks/useProfession'
import { QualityProvider } from './hooks/useQuality'

const App = () => {
    return (
        <div>
            <NavBar/>
            <ProfessionProvider>
                <QualityProvider>
                    <Switch>
                        {/* <Route path={'/users/:userId?'} component={ Users } />*/}
                        <Route path={'/users/:userId?/:edit?'} component={ Users } />
                        <Route path={'/login/:type?'} component={ Login } />
                        <Route path={'/'} exact component={ Main } />
                        <Redirect to={'/'} />
                    </Switch>
                </QualityProvider>
            </ProfessionProvider>
            <ToastContainer />
        </div>
    )
}

export default App
