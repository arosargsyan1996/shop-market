import { connect } from 'react-redux';
import { getTypesError } from 'selectors/kindsSelector';
import { TypeForm } from './TypeForm';

const mapStateToProps = ( state ) => ( {
    apiErrors: getTypesError( state )
} );

const TypeFormContainer = connect( mapStateToProps, null )( TypeForm );

export { TypeFormContainer as TypeForm };