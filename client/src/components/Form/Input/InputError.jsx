import { PropTypes } from 'prop-types';
import { useEffect, memo } from 'react';

const InputError = ( { error } ) => {
    useEffect( () => {
        console.log( ...color.green( `RENDER: InputError -> ${error}`  ) )
    } )
    return (
        error ? ( <span>{ error }</span> ) : null
    )
}

InputError.propTypes = {
    error: PropTypes.string
}

export default memo( InputError );