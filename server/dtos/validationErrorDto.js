module.exports = class validationErrorDto {
    constructor( errors ) {
        errors.forEach( ( error ) => this[ error.param ] = error.msg );
    }
}