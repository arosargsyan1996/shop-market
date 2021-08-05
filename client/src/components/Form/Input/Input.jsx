import { PropTypes } from 'prop-types';
import { useEffect, forwardRef } from 'react';

const Input = forwardRef( ( { hasError, ...props }, ref ) => {
    useEffect( () => {
        console.log( ...color.green( `RENDER: Input -> ${props.name}`  ) )
        return () => console.log( ...color.red( `Destroy: Input -> ${props.name}`  ) )
    } )
    return (
        <label>
            <span>{ props.name }</span> 
            <input
                style={{ borderColor: hasError ? 'red' : 'black' }}
                ref={ ref }
                { ...props }
            />
        </label>
    )
} )

Input.propTypes = {
    name: PropTypes.string,
    hasError: PropTypes.bool
}

export default Input;