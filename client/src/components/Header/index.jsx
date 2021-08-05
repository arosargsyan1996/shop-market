import { useSelector, useDispatch } from 'react-redux';
import { logout } from 'store/actions/userActions';
import { Link } from 'react-router-dom';
import { Logout } from 'components/icons';
import { useStyle } from 'hooks/useStyle';

export default function Header() {
    const dispatch = useDispatch();
    const isAuth = useSelector( ( state ) => state.user.isAuth )
    const logoutColor = useStyle( 'iconAccentC' );

    return (
        <header className="header">
            <div className="header__left-side col-6">
                <Link to="/"> Home </Link>
            </div>
            <div className="header__right-side col-6">
                { isAuth 
                ? (
                    <Logout
                        width="50px"
                        height="50px"
                        fill={ logoutColor }
                        stroke={ logoutColor }
                        onClick={ () => dispatch( logout() ) }
                    />
) 
                : ( 
                    <>
                        <Link to="/login"> Log in </Link>
                        <Link to="/registration"> Sign up </Link>
                    </>
                ) }
            </div>
        </header>
    )
}