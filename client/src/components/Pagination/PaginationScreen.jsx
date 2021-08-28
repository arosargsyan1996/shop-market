import { PropTypes } from 'prop-types';
import _c from 'classnames';
import { memo } from 'react';

function PaginationScreen( { currentPage, pagesCount, togglePage } ) {
    console.log( 77777777, 'RENDER:PaginationScreen', pagesCount, togglePage );
    
    return (
        <>
            { Array.from( Array( pagesCount ), ( v, i ) => i + 1 )
                .map( ( i )=>(
                    <div
                        key={ i }
                        className={ _c( { 
                            'pagination__item': true, 
                            'pagination__item_active': i === currentPage 
                        } ) }
                    >
                        <span
                            onClick={ togglePage.bind( null, i ) }
                            className="pagination__item-value"
                        >
                            { i }
                        </span>
                    </div>
                ) ) }
        </>
    )
}

PaginationScreen.propTypes = {
    pagesCount: PropTypes.number,
    currentPage: PropTypes.number,
    togglePage: PropTypes.func,
}

export default memo( PaginationScreen );