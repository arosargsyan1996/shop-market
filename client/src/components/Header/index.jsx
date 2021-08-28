import { useSelector, useDispatch } from 'react-redux';
import { logout } from 'store/actions/userActions';
import { NavLink } from 'react-router-dom';
import { Logo, Logout } from 'components/icons';

export default function Header() {
    const dispatch = useDispatch();
    const isAuth = useSelector( ( state ) => state.user.isAuth );

    return (
        <header className="header">
            <div className="header__left-side col-3">
                <NavLink
                    to="/"
                    className="header__logo"
                > 
                    <Logo
                        width="100%"
                        height="100%"
                    />
                    <span className="header__logo-text">electro</span>
                </NavLink>
            </div>
            <nav className="header__nav col-6">
                <NavLink
                    to="/brand"
                    activeClassName="header__nav-link_active"
                    className="header__nav-link"
                >Brands
                </NavLink>
                <NavLink
                    to="/type"
                    activeClassName="header__nav-link_active"
                    className="header__nav-link"
                >Kinds
                </NavLink>
            </nav>
            <div className="header__right-side col-3">
                { isAuth 
                ? (
                    <div className="header__logout">
                        <Logout
                            width="100%"
                            height="100%"
                            onClick={ () => dispatch( logout() ) }
                        />
                    </div>
                ) 
                : ( 
                    <div className="header__nav header__auth">
                        <NavLink
                            to="/login"
                            className="header__nav-link"
                            activeClassName="header__nav-link_active"
                        > Log in
                        </NavLink>
                        <NavLink
                            to="/registration"
                            className="header__nav-link"
                            activeClassName="header__nav-link_active"
                        > Sign up 
                        </NavLink>
                    </div>
                ) }
            </div>
        </header>
    )
}