import { Switch, Route } from 'react-router-dom';
import HomePage from './Home';
import LoginPage from './Login';
import RegistrationPage from './SingUp';
import KindsPage from './Kinds';

const Pages = () => {    
    return (
        <Switch>
            <Route
                component={ HomePage }
                path={ '/' }
                exact
            />
            <Route
                exact 
                component={ LoginPage }
                path={ '/login' }
            />
            <Route
                exact 
                component={ RegistrationPage }
                path={ '/registration' }
            />
            <Route
                exact 
                component={ KindsPage }
                path={ '/type' }
            />
        </Switch>
    )
}

export default Pages;