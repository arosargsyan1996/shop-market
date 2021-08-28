import Pagination from 'components/Pagination/Pagination';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getKindsInfo } from 'selectors/kindsSelector';
import { fetchKinds } from 'store/actions/kindsActions';
import ListItem from './ListItem';

export const KindsList = () => {
    const { currentPage, pagesCount, kinds } = useSelector( getKindsInfo );
    
    useEffect( ()=> {
        kinds.length 
        ? console.log( ...color.green( 'RENDER: List' ) )
        : console.log( ...color.green( 'RENDER: List/null' ) )
    } )
    
    return (
        <div>
            { kinds.map( ( kind, i ) => (
                <ListItem
                    key={ i }
                    { ...kind }
                />
            ) ) }
            <Pagination
                currentPage={ currentPage }
                pagesCount={ pagesCount }
                onTogglePage={ fetchKinds }
            />
            aaa
        </div>
    )
}