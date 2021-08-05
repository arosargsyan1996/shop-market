import { useSelector, connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { stateSetUp } from 'config/stateConfig';
import Pages from 'pages';
import Header from './Header';
import { PropTypes } from 'prop-types';
import { useRedirect } from 'hooks/useRedirect';

function App( { stateSetUp } ) {
    const redirect = useRedirect();
    const isLoading = useSelector( ( state ) => state.app.isLoading )
    const { pathname /* search */ } = useLocation();

    useEffect( () => {
        stateSetUp( pathname ).then( ( res ) => {
            res.shouldRedirect && redirect( res.to )
        } );
    }, [ pathname, stateSetUp, redirect ] );

    return !isLoading && isLoading !== null ? (
        <>
            <Header />
            <Pages />
        </>
    ) : <h1>Loading...</h1>;
}

App.propTypes = {
    stateSetUp: PropTypes.func.isRequired,
}

const mapDispatchToProps = ( dispatch ) => ( {
    stateSetUp: ( path ) => dispatch( stateSetUp( path ) )
} )

export default  connect( null, mapDispatchToProps )( App );
