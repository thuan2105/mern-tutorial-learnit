import classNames from 'classnames/bind';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';

import { AuthContext } from '~/contexts/authContext';
import { loginUser } from '~/Services/loginUserService';

import styles from './LoginForm.module.scss';
import AlertMessage from '~/components/layouts/alertMessage';

const cx = classNames.bind(styles);

const LoginForm = () => {
    // Context
    const { loadUser } = useContext(AuthContext);

    // Local state
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: '',
    });
    const [validated, setValidated] = useState(false);
    const [alert, setAlert] = useState(null);
    const { username, password } = loginForm;

    const onChangeLoginForm = (e) => setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

    const login = async (e) => {
        e.preventDefault();
        setValidated(true);

        try {
            const loginData = await loginUser(loginForm);
            if (loginData.success) {
                loadUser();
            } else {
                setAlert({ type: 'danger', message: loginData.message });
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <Form
                className={cx('my-4')}
                noValidate
                validated={validated}
                onSubmit={login}
                onClick={() => setAlert(null)}
            >
                <AlertMessage info={alert} />
                <Form.Group className={cx('mb-3')}>
                    <Form.Control
                        className={cx('fs-4')}
                        size="lg"
                        type="text"
                        placeholder="Username"
                        name="username"
                        required
                        value={username}
                        onChange={onChangeLoginForm}
                    />

                    <Form.Control.Feedback type="invalid">Username is a required field.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className={cx('mb-3')}>
                    <Form.Control
                        className={cx('fs-4')}
                        size="lg"
                        type="password"
                        placeholder="Password"
                        name="password"
                        required
                        value={password}
                        onChange={onChangeLoginForm}
                    />
                    <Form.Control.Feedback type="invalid">Password is a required field.</Form.Control.Feedback>
                </Form.Group>

                <Button className={cx('fs-3')} size="lg" variant="success" type="submit">
                    Login
                </Button>
            </Form>
            <p>
                Don't have an account?
                <Link to="/register">
                    <Button variant="info" size="lg" className={cx('ms-2')}>
                        Register
                    </Button>
                </Link>
            </p>
        </>
    );
};
export default LoginForm;
