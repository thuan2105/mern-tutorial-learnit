import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import classNames from 'classnames/bind';

import { AuthContext } from '~/contexts/authContext';
import styles from './NavBarMenu.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);
const NavBarMenu = () => {
    const {
        authState: {
            user: { username },
        },
        logoutUser,
    } = useContext(AuthContext);

    const logOut = () => logoutUser();
    return (
        <Navbar expand="lg" bg="primary" variant="dark" className={cx('wrapper shadow')}>
            <Navbar.Brand className={cx('nav-left')}>
                <Nav.Link to="/dashboard" as={Link}>
                    <img className={cx('logo')} src={images.learnItLogo} alt="learnItLogo" />
                    LearnIt
                </Nav.Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className={cx('navbar')}>
                <Nav>
                    <Nav.Link to="/dashboard" as={Link} className={cx('text-weight-bolder text-white')}>
                        Dashboard
                    </Nav.Link>
                    <Nav.Link to="/about" as={Link} className={cx('text-weight-bolder text-white')}>
                        About
                    </Nav.Link>
                </Nav>

                <Nav className={cx('nav-right')}>
                    <Nav.Link className={cx('text-weight-bolder text-white')} disabled>
                        Welcome {username}
                    </Nav.Link>
                    <Button variant="secondary" className={cx('logout text-weight-bolder text-white')} onClick={logOut}>
                        <img className={cx('logoutIcon')} src={images.logoutIcon} alt="logoutIcon" />
                        <span>Logout</span>
                    </Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBarMenu;
