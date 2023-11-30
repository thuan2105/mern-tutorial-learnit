import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import classNames from 'classnames/bind';
import Spinner from 'react-bootstrap/Spinner';

import styles from './ProtectedRoute.module.scss';
import { AuthContext } from '~/contexts/authContext';
import NavBarMenu from '../layouts/navBarMenu';

const cx = classNames.bind(styles);

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const {
        authState: { authLoading, isAuthenticated },
    } = useContext(AuthContext);
    if (authLoading) {
        return (
            <div className={cx('spinner-container')}>
                <Spinner animation="border" variant="info" />
            </div>
        );
    }

    return (
        <>
            {isAuthenticated ? (
                <>
                    <NavBarMenu />
                    <Component {...rest} />
                </>
            ) : (
                <Navigate to="/login" />
            )}
        </>
    );
};

export default ProtectedRoute;
