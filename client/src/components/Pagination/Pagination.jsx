import { PropTypes } from 'prop-types';
import { useStyle } from 'hooks/useStyle';
import { useDispatch } from 'react-redux';
import PaginationBox from './PaginationBox';
import PaginationScreen from './PaginationScreen';
import PaginationSlider from './PaginationSlider';
import { PaginationProvider } from './PaginationContext';


function Pagination( { currentPage, pagesCount, onTogglePage } ) {
    const dispatch = useDispatch();
    const { paginationItemWidth, paginationWidth }  =  useStyle( [ 'paginationItemWidth', 'paginationWidth' ] );
    const paginationMiddleWidth = paginationWidth - paginationItemWidth;
    const slidesCount = pagesCount - paginationWidth / paginationItemWidth;
    const initState = {
        slidesCount, paginationItemWidth, paginationWidth, paginationMiddleWidth
    }
    
    if ( pagesCount === 1 ) {
        return null;
    }

    const togglePage = ( page ) => {
        dispatch( onTogglePage( page ) );
    }
     
    console.log( 77777777, 'RENDER:Pagination' );

    return (
        <PaginationProvider { ...initState }>         
            <PaginationSlider>
                <PaginationScreen
                    currentPage={ currentPage }
                    pagesCount={ pagesCount }
                    togglePage={ togglePage }
                />
                <PaginationBox />
            </PaginationSlider>
        </PaginationProvider>
    )
}

Pagination.propTypes = {
    pagesCount: PropTypes.number,
    currentPage: PropTypes.number,
    onTogglePage: PropTypes.func,
}

export default Pagination;