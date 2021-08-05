import { PropTypes } from 'prop-types';
import Input from '../Input/Input';
import InputError from '../Input/InputError';
import { Fragment } from 'react';

function Form( { inputs, submitHandler } ) {

    return (
        <form onSubmit={ submitHandler }>
            { inputs.map( ( input, i ) => (
                <Fragment key={ i }>
                    <Input
                        { ...input.props }
                        hasError={ input.hasError }
                    />
                    { input.error && <InputError error={ input.error } /> }
                </Fragment>
            ) ) }
            <div>
                <input type="submit" />
            </div>
        </form>
    )
}

Form.propTypes = {
    inputs: PropTypes.arrayOf( PropTypes.object ).isRequired,
    submitHandler: PropTypes.func.isRequired,
}

export default Form;