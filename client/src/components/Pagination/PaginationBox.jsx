import { useRef } from 'react';
import Draggable from 'react-draggable';
import { useDrag } from './PaginationContext';

function PaginationBox() {
    const nodeRef = useRef( null );
    //console.log( 'boxPos', boxPos );
    //const [ boxPos, setBoxPos ] = useState( null )
   

    // useEffect( () => {
    //     if( scrollPos !== 0 ) {
    //         setBoxPos( { x: scrollPos, y: 0 } )
    //     }
    // }, [ scrollPos ] )
    
    
    const { boxPos, dragHandlers } = useDrag();

    console.log( 77777777, 'RENDER:BOX' );

    return (
        <Draggable
            nodeRef={ nodeRef }
            axis="x"
            defaultClassName="pagination__box"
            bounds="parent"
    //handle=".handle"
            defaultPosition={{ x: 0, y: 0 }}
            position={ boxPos }
    // grid={ [ 25, 25 ] }
    //scale={ 1 }
            { ...dragHandlers }
        >
            <div ref={ nodeRef } />
        </Draggable>
    )
}

export default PaginationBox;