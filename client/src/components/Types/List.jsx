import Pagination from 'components/Pagination';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getTypes } from 'selectors/typesSelector';
import ListItem from './ListItem';
import { TypeForm } from './TypeForm/TypeForm';

export const TypesList = () => {
    const types = useSelector( getTypes )
    
    useEffect( ()=> {
        types.length 
        ? console.log( ...color.green( 'RENDER: List' ) )
        : console.log( ...color.green( 'RENDER: List/null' ) )
    } )
    
    return (
        <div>
            <TypeForm />
            { types.map( ( type, i ) => (
                <ListItem
                    key={ i }
                    { ...type }
                />
            ) ) }
            <Pagination />
        </div>
    )
}