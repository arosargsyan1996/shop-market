export const useStyle = ( variable ) => {
    if ( Array.isArray( variable ) ) {
        const variables = {};
        variable.forEach( ( v ) => {
            const variable = getComputedStyle( document.documentElement ).getPropertyValue( `--${ v }` ).trim();
            variables[ v ] = isNaN( +variable ) ? variable : +variable;
        } );
        return variables;
    }

    const v = getComputedStyle( document.documentElement ).getPropertyValue( `--${ variable }` ).trim();

    return isNaN( +v ) ? v : +v;

}