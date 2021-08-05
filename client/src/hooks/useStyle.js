export const useStyle = ( variable ) => {
    return getComputedStyle( document.documentElement ).getPropertyValue( `--${ variable }` );
}