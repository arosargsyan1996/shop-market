import { useStyle } from 'hooks/useStyle';
import { useState } from 'react';

function SvgLogout( props ) {
    const { iconAccentC, iconAccentCHover } = useStyle( [ 'iconAccentC', 'iconAccentCHover' ] );
    const [ color, setColor ] = useState( iconAccentC );

    return (
        <svg
            onMouseEnter={ setColor.bind( null, iconAccentCHover ) }
            onMouseLeave={ setColor.bind( null,  iconAccentC ) }
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512.001 512.001"
            width="1em"
            height="1em"
            fill={ color }
            stroke={ color }
            { ...props }
        >
            <path d="M505.651 243.741l-54.782-38.622c-9.916-6.99-23.644.116-23.644 12.26v77.242c0 12.194 13.757 19.227 23.643 12.26l54.782-38.621c8.479-5.978 8.456-18.556.001-24.519z" />
            <path d="M430.46 352.315c-7.169-4.146-16.346-1.698-20.495 5.474-35.236 60.915-101.1 101.807-176.367 101.807C121.334 459.597 30 368.263 30 256.001S121.334 52.404 233.597 52.404c75.317 0 141.153 40.932 176.366 101.806 4.148 7.172 13.327 9.619 20.495 5.474 7.171-4.148 9.621-13.324 5.474-20.495C395.408 69.133 319.721 22.404 233.597 22.404 104.487 22.404 0 126.88 0 256.001c0 129.11 104.476 233.596 233.597 233.596 86.161 0 161.829-46.762 202.337-116.787 4.147-7.171 1.697-16.346-5.474-20.495z" />
            <path d="M164.192 241.001c-8.284 0-15 6.715-15 15 0 8.284 6.716 15 15 15h233.031v-30H164.192z" />
        </svg>
    );
}

export default SvgLogout;
