import { useLocation, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';

const PrivateRoute = ( { redirectTo = '/login', ...props } ) => {
    const location = useLocation();
    const isAuth = useSelector( ( state ) => state.user.isAuth );
    const isProtected = redirectTo === '/login' ? isAuth : !isAuth;
  
    return isProtected ? (
        <Route { ...props } />
    ) : (
        <Redirect to={{
            pathname: redirectTo,
            state: { from: location }
        }}
        />
    );
};

PrivateRoute.propTypes = {
    redirectTo: PropTypes.string
}

export default PrivateRoute;