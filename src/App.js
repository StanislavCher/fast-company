import React from 'react'
import NavBar from './components/ui/navBar'
import { Route, Switch, Redirect } from 'react-router-dom'
import Main from './layouts/main'
import Login from './layouts/login'
import Users from './layouts/users'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ProfessionProvider } from './hooks/useProfession'
import { QualityProvider } from './hooks/useQuality'
import AuthProvider from './hooks/useAuth'
import ProtectedRoute from './components/common/protectedRoute'
import LogOut from './layouts/logOut'

const App = () => {
    return (
        <div>
            <AuthProvider>
                <NavBar/>
                <ProfessionProvider>
                    <QualityProvider>
                        <Switch>
                            {/* <Route path={'/users/:userId?'} component={ Users } />*/}
                            <ProtectedRoute path={'/users/:userId?/:edit?'} component={ Users } />
                            <Route path={'/login/:type?'} component={ Login } />
                            <Route path={'/logout'} component={ LogOut } />
                            <Route path={'/'} exact component={ Main } />
                            <Redirect to={'/'} />
                        </Switch>
                    </QualityProvider>
                </ProfessionProvider>
            </AuthProvider>

            <ToastContainer />
        </div>
    )
}

export default App
