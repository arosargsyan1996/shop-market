import { useMemo } from 'react';

export const useInput = ( errors, register, name ) => {
    const error = errors[ name ]?.message;
    let hasApiError = errors[ name ]?.type === 'apiError';

    const input = useMemo( () => {
        const inputProps = register( name );

        return {
            ...inputProps,
            async onBlur( e ) {
                if ( !hasApiError ) {
                    await inputProps.onBlur( e );
                }
            },
            async onChange( e ) {
                if ( hasApiError ) {
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                    hasApiError = false;
                }
                await inputProps.onChange( e );
            },
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ hasApiError ] );

    const inputError = useMemo( () => {
        return error === null ? null : error || '';
    }, [ error ] );

    return [ input, inputError ];
};