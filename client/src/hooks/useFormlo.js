import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';


export function useFormlo( schema ) {
    const {
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
        register,
    } = useForm( {
        mode: 'onBlur',
        reValidateMode: 'onBlur',
        resolver: yupResolver( schema ),
    } );

    return { handleSubmit, setError, clearErrors, errors, register };
}