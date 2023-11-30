import classNames from 'classnames/bind';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

import LoginForm from '~/components/auth/login';
import { AuthContext } from '~/contexts/authContext';
import RegisterForm from '~/components/auth/register';
import styles from './Auth.module.scss';

const cx = classNames.bind(styles);

const Auth = ({ authRoute }) => {
    const navigate = useNavigate();
    const {
        authState: { authLoading, isAuthenticated },
    } = useContext(AuthContext);
    let body;
    if (authLoading) {
        body = (
            <div className={cx('d-flex justify-content-center mt-2')}>
                <Spinner animation="border" variant="info" />
            </div>
        );
    } else {
        body = (
            <>
                {authRoute === 'login' && <LoginForm />}
                {authRoute === 'register' && <RegisterForm />}
            </>
        );
    }
    useEffect(() => {
        if (isAuthenticated) {
            return navigate('/dashboard');
        }
    }, [navigate, isAuthenticated]);

    return (
        <div className={cx('landing')}>
            <div className={cx('dark-overlay')}>
                <div className={cx('landing-inner')}>
                    <h1>Learnit</h1>
                    <p>Keep track of what you are learning</p>
                    {body}
                </div>
            </div>
        </div>
    );
};

export default Auth;
