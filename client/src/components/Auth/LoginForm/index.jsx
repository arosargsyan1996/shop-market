import * as yup from 'yup';
import { userLogin } from 'store/actions/userActions';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useEffect, memo, useState } from 'react';
import { useInput } from 'hooks/useInput';
import { getUserError } from 'selectors/userSelector';
import { apiErrorsSideEffect, clearErrorsSideEffect } from '../common';
import { useFormlo } from 'hooks/useFormlo';
import { useRedirect } from 'hooks/useRedirect';

import Input from 'components/Form/Input/Input';
import InputError from 'components/Form/Input/InputError';
const MemoInput = memo( Input )
const schema = yup.object().shape( {
    email: yup
        .string()
        .matches( /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, { message: 'Not valid email', excludeEmptyString: true } )
        .required(),
    password: yup
        .string()
        //.matches( /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, { message: 'Not valid email', excludeEmptyString: true } )
        .required(),
} );

export const LoginForm = ( ) => {
    const dispatch = useDispatch()
    const redirect = useRedirect( true )
    const apiErrors = useSelector( getUserError, shallowEqual );

    const { handleSubmit, setError, clearErrors, errors, register } = useFormlo( schema );
    const [ formError, setFormError ] = useState( '' ); 
    const [ email, emailError ] = useInput( errors, register, 'email' );
    const [ password, passwordError ] = useInput( errors, register, 'password' );

    const submitHandler = ( e ) => {
        e.preventDefault();
        console.log( 'submitHandler' );
        if ( !Object.keys( apiErrors ).length ) {
            return handleSubmit( async ( d, e ) => {
                await dispatch( userLogin( d ) ); 
                await redirect( '/' );
            } )();
        }
    }

    useEffect( () => {
        apiErrorsSideEffect( apiErrors, setError, setFormError, dispatch );
    }, [ apiErrors, setError, setFormError, dispatch ] )

    useEffect( () => {
        clearErrorsSideEffect( emailError, passwordError, clearErrors, setFormError )
    }, [ emailError, passwordError, clearErrors, setFormError ] )

   
    useEffect( () => {
        console.log( ...color.green( 'RENDER: LoginForm' ) )
    } )

    return (
        <form onSubmit={ submitHandler }>
            <MemoInput
                { ...email }
                hasError={ !!emailError || emailError === null }
            />
            { emailError && <InputError error={ emailError } /> }
            <MemoInput
                { ...password }
                hasError={ !!passwordError || passwordError === null }
            />
            { passwordError && <InputError error={ passwordError } /> }
            { formError && <InputError error={ formError } /> }
            <div>
                <input type="submit" />
            </div>
        </form>
    );
};