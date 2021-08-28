import { useFormlo } from 'hooks/useFormlo';
import * as yup from 'yup';
import { createKind } from 'store/actions/kindsActions';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getKindsError } from 'selectors/kindsSelector';
import { useEffect, memo } from 'react';
import { useInput } from 'hooks/useInput';
import Input from 'components/Form/Input/Input';
import InputError from 'components/Form/Input/InputError';
import { clearKindError } from '../../../store/actions/kindsActions';
const MemoInput = memo( Input/* , areEqual */ )
// function areEqual( prevProps, nextProps ) {
//     console.log( 'areEqual', prevProps.error === nextProps.error );
//     return prevProps.error === nextProps.error
//     /*
//     return true if passing nextProps to render would return
//     the same result as passing prevProps to render,
//     otherwise return false
//     */
//   }

const schema = yup.object().shape( {
    name: yup
        .string()
        .matches( /[a-zA-Z]$/, { message: 'Name must contain only letters', excludeEmptyString: true } )
        .required(),
} );

export const TypeForm = ( ) => {
    const { handleSubmit, setError, errors, register } = useFormlo( schema );
    const dispatch = useDispatch()
    const apiErrors = useSelector( getKindsError, shallowEqual );
    const apiErrorKeys = Object.keys( apiErrors );

    const [ name, nameError ] = useInput( errors, register, 'name' );

    const submitHandler = ( e ) => {
        e.preventDefault();
        console.log( 'submitHandler' );
        if ( !apiErrorKeys.length ) {
            return handleSubmit( ( d, e ) => dispatch( createKind( d ) ) )();
        }
    }
    
    useEffect( () => {
        if( apiErrorKeys.length ) {
            apiErrorKeys.forEach( ( key ) => {
                if ( apiErrors[key] ) {
                    setError( key, { type: 'apiError', message: apiErrors[key] }, { shouldFocus: true } );
                }
            } )
            dispatch( clearKindError() );
        }
    }, [ apiErrors, apiErrorKeys, setError, dispatch ] )

    useEffect( () => {
        console.log( ...color.green( 'RENDER: TypeForm' ) )
    } )

    useEffect( () => {
        console.log( nameError ) 
    }, [ nameError ] )

    return (
        <form onSubmit={ submitHandler }>
            <MemoInput
                { ...name }
                hasError={ !!nameError }
            />
            { nameError && <InputError error={ nameError } /> }
            <div>
                <input type="submit" />
            </div>
        </form>
    );
};