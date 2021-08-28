import { PropTypes } from 'prop-types';
import { useState, useRef, useContext, createContext, useEffect, useCallback, useMemo } from 'react';

const DragContext = createContext();
const useDrag = () => useContext( DragContext );
const ScrollContext = createContext();
const useScroll = () => useContext( ScrollContext );


const PaginationProvider = ( { children, ...init } ) => {
    const { slidesCount, paginationItemWidth, paginationWidth, paginationMiddleWidth } = init;
    const [ boxPos, setBoxPos ] = useState( null );
    const scrollRef = useRef( null );
    const state = useRef( {
        boxPosCashed: null,
        scrollPos: null,
        scrollDir: '',
        dragPos: null,
        dragDir: '',
        currentSlide: 1,
        isScrolled: false,
        isDragged: false,
    } )
    const _getNextScrollPos = useCallback( ( dir, slide ) => {
        if ( dir === 'RIGHT' ) {
            return slide * paginationItemWidth
        } else if ( dir === 'LEFT' ) {
            return slide * paginationItemWidth - paginationItemWidth
        }
        return;
    }, [ paginationItemWidth ] )
    
    useEffect( () => {
        console.log( 'useeffect: ', boxPos, state.current.currentSlide )
        state.current.boxPosCashed = boxPos !== null ? { ...boxPos } : { x: 0 };
    }, [ boxPos ] )

    const onScroll = useCallback( ( e ) => {
        const { isDragged, scrollPos, boxPosCashed, scrollDir, currentSlide, isScrolled, dragDir } = state.current;
        console.log( 'onScroll', { isDragged } );
        // if ( isScrolled.current ) {
        //     isScrolled.current = false
        // }

        if ( !isDragged ) {
            const scrollPosX = e.target.scrollLeft;
            const prevScrollPosX= scrollPos?.x || 0;
            const boxPosX = boxPosCashed?.x || 0;
            const slide = ( Math.ceil( scrollPosX / paginationItemWidth ) + ( scrollPosX % paginationItemWidth === 0 ? 1 : 0 ) || 1 );
            let breakPoint = null;
            let nextBoxPos = 0;
            let nextScrollPos = null;

            
            if ( scrollPosX > prevScrollPosX && scrollDir !== 'RIGHT' ) { //if scroll right
                if ( scrollDir === '' ) {
                    state.current.scrollDir = 'RIGHT';
                } else if ( scrollDir === 'LEFT' ) {
                    state.current.scrollDir = 'RIGHT';
                }
            } else if ( scrollPosX < prevScrollPosX && scrollDir !== 'LEFT' ) { //if scroll left
                if ( scrollDir === 'RIGHT' ) {
                    state.current.scrollDir = 'LEFT';
                }
            }

            if ( state.current.scrollDir === 'RIGHT' ) {
                if ( slidesCount < slide ) { //if last slide
                    breakPoint = ( slidesCount - 1 ) * paginationItemWidth;
                    nextBoxPos = breakPoint + paginationItemWidth;
                } else {
                    breakPoint = ( slide - 1 ) * paginationItemWidth;
                    nextBoxPos = breakPoint + paginationItemWidth;
                }
            } else if ( state.current.scrollDir === 'LEFT' ) {
                // if ( slide === 1 ) { //if first slide
                //     breakPoint = slide * paginationItemWidth;
                //     nextBoxPos = breakPoint - paginationItemWidth + paginationMiddleWidth;
                // } else {
                    breakPoint = ( slide ) * paginationItemWidth;
                    nextBoxPos = breakPoint - paginationItemWidth + paginationMiddleWidth;
                //}
            }

            if ( scrollPosX !== boxPosX && !isScrolled ) {
                console.log( {
                    slidesCount,
                    currentSlide,
                    breakPoint,
                    nextBoxPos,
                    scrollPosX,
                    boxPosX,
                    slide,
                    scrollDir: state.current.scrollDir
                } );

                if ( breakPoint !== null ) {
                    if ( state.current.scrollDir === 'RIGHT' && breakPoint <= scrollPosX ) { //if scroll right
                        console.log( 'RIGHT' );
                        state.current.currentSlide += 1;
                        nextScrollPos = _getNextScrollPos( 'RIGHT', slide );
                        breakPoint >= ( boxPosX - paginationItemWidth ) && setBoxPos( { x: nextBoxPos, y: 0 } )
                    } else if ( state.current.scrollDir === 'LEFT' && breakPoint >= scrollPosX ) { //if scroll left
                        console.log( 'LEFT' );
                        state.current.currentSlide -= 1;
                        nextScrollPos = _getNextScrollPos( 'LEFT', slide );
                        breakPoint <= ( boxPosX + paginationItemWidth - paginationMiddleWidth ) && setBoxPos( { x: nextBoxPos, y: 0 } )
                    }
                    
                    console.log( '4444444444444444444444444', slide, currentSlide, state.current.currentSlide, scrollDir );
                    
                    ( nextScrollPos !== null ) && ( state.current.isScrolled = true ) && scrollRef.current.scrollTo( {
                        left: nextScrollPos,
                        //behavior: 'smooth',
                    } );
                }     
            }

            if ( isScrolled ) {
                console.log( 'FIXING AFTER SCROLL', slide, currentSlide );
                if ( slide !== currentSlide ) { //if scroll but not change box position
                    if ( state.current.scrollDir === 'RIGHT' ) {
                        state.current.currentSlide = slide;
                        //nextScrollPos = _getNextScrollPos( 'RIGHT', slide );
                        breakPoint > ( boxPosX - paginationItemWidth ) && setBoxPos( { x: nextBoxPos, y: 0 } )
                    } else if ( state.current.scrollDir === 'LEFT' ) {
                        state.current.currentSlide = slide;
                        //nextScrollPos = _getNextScrollPos( 'LEFT', slide );
                        breakPoint < ( boxPosX + paginationItemWidth - paginationMiddleWidth ) && setBoxPos( { x: nextBoxPos, y: 0 } )
                    }

                    // ( nextScrollPos !== null ) && scrollRef.current.scrollTo( {
                    //     left: nextScrollPos,
                    //     //behavior: 'smooth',
                    // } );
                }
                state.current.isScrolled = false;
            }
            
            console.log( 'CURRENT SLIDE', state.current.currentSlide );
            state.current.scrollPos = { x: scrollPosX };
        } else {
            //if ( isScrolled ) {
                const scrollPos = e.target.scrollLeft;
                const prevSlide = state.current.currentSlide;
                const scrollPosX = state.current.scrollPos?.x;
                //const realSlide = Math.ceil( ( scrollPos - ( paginationWidth - paginationItemWidth ) ) / paginationItemWidth ) + 1;
                //const slide = realSlide > 0 ? realSlide : 1;
                console.log( 'SCROLL AFTER DRUG', { prevSlide, scrollPos, scrollPosX: state.current.scrollPos?.x } );

                if ( isScrolled ) {
                    if ( dragDir === 'RIGHT' && prevSlide * paginationItemWidth === scrollPos ) {
                        console.log( 'SLIDE:TOGGLE->RIGHT' )
                        state.current.currentSlide += 1;
                       
                        //state.current.isDragged = false;
                    } else if ( dragDir === 'LEFT' && ( prevSlide - 2 ) * paginationItemWidth === scrollPos ) {
                        console.log( 'SLIDE:TOGGLE->LEFT' )
                        state.current.currentSlide -= 1;
                        
                        //state.current.isDragged = false;
                    }
                } else if ( scrollPosX === scrollPos ) {
                    console.log( '0000000000', state.current.currentSlide )
                    state.current.isDragged = false;
                    //state.current.scrollPos = null;
                }
                
            //}
        }
    }, [ state, paginationItemWidth, paginationMiddleWidth, slidesCount, _getNextScrollPos ] )

    const onDrag = ( e, ui ) => {
        const { dragPos, dragDir, currentSlide } = state.current;
        const prevDragPosX =  dragPos?.x || 0;
        let breakPoint = 0;
        let scrollPosX = 0;

        if( prevDragPosX < ui.x ) { //if scroll right
            if( dragDir === '' ) {
                state.current.dragDir = 'RIGHT';
            } else if ( dragDir === 'LEFT' ) {
                state.current.dragDir = 'RIGHT';
            }
            
            scrollPosX = currentSlide * paginationItemWidth;
            breakPoint = ( paginationWidth - paginationItemWidth ) + ( currentSlide - 1 ) * paginationItemWidth;
        } else if ( prevDragPosX > ui.x ) { //if scroll left
            if ( dragDir === 'RIGHT' ) {
                state.current.dragDir = 'LEFT';          
            }
            scrollPosX = ( currentSlide - 2 ) * paginationItemWidth;
            breakPoint = scrollPosX + paginationItemWidth;
        } else {
            if ( dragDir === 'RIGHT' ) {
                scrollPosX = currentSlide * paginationItemWidth;
                breakPoint = ( paginationWidth - paginationItemWidth ) + ( currentSlide - 1 ) * paginationItemWidth;
            } else if( dragDir === 'LEFT' ) {
                scrollPosX = ( currentSlide - 2 ) * paginationItemWidth;
                breakPoint = scrollPosX + paginationItemWidth;
            }
        }
        
        console.log( {
            scrollPosX,
            breakPoint,
            currentSlide,
            dragPosX: ui.x
        } );

        if ( breakPoint < ui.x && state.current.dragDir === 'RIGHT' ) {
            state.current.isScrolled = true;
            state.current.scrollPos = { x: scrollPosX, y: 0 };
            scrollRef.current.scrollTo( {
                left: scrollPosX,
                //behavior: 'smooth',
            } );
        } else if ( breakPoint > ui.x && state.current.dragDir === 'LEFT' ) {
            state.current.isScrolled = true;
            state.current.scrollPos = { x: scrollPosX, y: 0 };
            scrollRef.current.scrollTo( {
                left: scrollPosX,
                //behavior: 'smooth',
            } );
        }
        state.current.dragPos = { x: ui.x, y: ui.y };
    };

    const onDragStart = () => {
        console.log( `onDragStart -> isDragged: ${state.current.isDragged}` );
        state.current.isDragged = true;
        console.log( `onDragStart -> isDragged: ${state.current.isDragged}` );
    };

    const onDragStop = () => {
        state.current.isScrolled = false;
        console.log( `onDragStop -> isDragged: ${state.current.isDragged}` );
        const { dragPos, scrollPos, dragDir, currentSlide } = state.current;
        const dragPosX = dragPos?.x || 0;
        const scrollPosX = scrollPos?.x || 0;
        let realSlide = Math.ceil( scrollPosX / paginationItemWidth ) + 1;
        let slide = realSlide > 0 ? realSlide : 1;
        let nextDragPosX = Math.round( dragPosX + paginationItemWidth / 2 ) - Math.round( dragPosX + paginationItemWidth / 2 ) % paginationItemWidth;
        let nextScrollPosX = null;

        console.log( 55555555555555, scrollPosX, dragPosX );

            if ( dragDir === 'RIGHT' && ( scrollPosX + paginationMiddleWidth ) < dragPosX ) { //must force scroll to right
                slide = state.current.currentSlide;

                console.log( 'must force scroll to RIGHT' );
                nextScrollPosX = slide * paginationItemWidth;
                nextDragPosX = nextScrollPosX + paginationMiddleWidth;
                state.current.currentSlide = slide + 1;
                
                console.log( 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAA' )
            } else if ( dragDir === 'LEFT' && scrollPosX > dragPosX  ) { //must force scroll to left
                slide = state.current.currentSlide;

                console.log( 'must force scroll to LEFT' );
                nextScrollPosX = ( slide - 2 ) * paginationItemWidth;
                nextDragPosX = nextScrollPosX;
                state.current.currentSlide = slide - 1;

                console.log( 'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB' )
            }


        if ( dragDir === 'RIGHT' && currentSlide < slide ) { //must force scroll to right
            console.log( 'must force scroll to RIGHT' );
            nextScrollPosX = ( slide + 1 ) * paginationItemWidth;
            nextDragPosX = nextScrollPosX + ( paginationWidth - paginationItemWidth );
            state.current.currentSlide = slide + 1;
        } else if ( dragDir === 'LEFT' && currentSlide > slide ) { //must force scroll to left
            console.log( 'must force scroll to LEFT' );
            nextScrollPosX = ( slide - 1 ) * paginationItemWidth + ( paginationWidth - paginationItemWidth );
            nextDragPosX = nextScrollPosX;
            state.current.currentSlide = slide - 1;   
        }

        if ( nextScrollPosX !== null ) {
            console.log( '0000000000000000000000000000' );
            state.current.scrollPos = { x: nextScrollPosX, y: 0 };
            scrollRef.current.scrollTo( {
                left: nextScrollPosX,
                behavior: 'smooth',
            } );
        } else {
            state.current.isDragged = false;
        }
        setBoxPos( { x: nextDragPosX, y: 0 } )

        console.log( `onDragStop -> isDragged: ${state.current.isDragged}`, {
            currentSlide: state.current.currentSlide,
            prevCurrentSlide: currentSlide,
            slide,
            scrollPos: state.current.scrollPos?.x,
            scrollPosX,
            nextDragPosX
        } );
    };

    const valueD = {
        boxPos,
        dragHandlers: { onDrag, onStart: onDragStart, onStop: onDragStop },
    }
    const valueS = useMemo( () => ( {
        scrollRef, onScroll
    } ), [ scrollRef, onScroll ] )

    console.log( 77777777, 'RENDER:PaginationProvider' );

    return (
        <ScrollContext.Provider value={ valueS }>
            <DragContext.Provider value={ valueD }>
                { children }
            </DragContext.Provider>
        </ScrollContext.Provider>
    )
}

PaginationProvider.propTypes = {
    children: PropTypes.node
}

export { PaginationProvider, useDrag, useScroll };