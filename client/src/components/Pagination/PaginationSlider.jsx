import { PropTypes } from 'prop-types';
import { memo } from 'react';
import { useScroll } from './PaginationContext';

const PaginationSlider = ( { children } ) => {
    const { scrollRef, onScroll } = useScroll();

    console.log( 77777777, 'RENDER:PaginationSlider' );
    return (
        <div
            //style={{ width: '200px' }}
            ref={ scrollRef }
            onScroll={ onScroll }
            className="pagination__wrap hide-scrollbar"
        >
            <div className="pagination">
                { children }
            </div>
        </div>
    )
}

PaginationSlider.propTypes = {
    children: PropTypes.node
}

export default memo( PaginationSlider );