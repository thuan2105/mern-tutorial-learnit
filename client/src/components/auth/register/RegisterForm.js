import classNames from 'classnames/bind';
import { Button, Form } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '~/contexts/authContext';

import { registerUser } from '~/Services/registerUserService';
import AlertMessage from '~/components/layouts/alertMessage';
import styles from './RegisterForm.module.scss';

const cx = classNames.bind(styles);

const RegisterForm = () => {
    const { loadUser } = useContext(AuthContext);

    const [validated, setValidated] = useState(false);
    const [alert, setAlert] = useState(null);
    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });

    const { username, password, confirmPassword } = registerForm;

    const onChangeRegisterForm = (e) => setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
    const register = async (e) => {
        e.preventDefault();
        setValidated(true);

        if (password !== confirmPassword) {
            setAlert({ type: 'danger', message: 'Password do not match' });
            return;
        }

        try {
            const registerData = await registerUser(registerForm);

            if (registerData.success) {
                console.log(registerData);
                loadUser();
            } else {
                setAlert({ type: 'danger', message: registerData.message });
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <Form className={cx('my-4')} noValidate validated={validated} onSubmit={register}>
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
                        onChange={onChangeRegisterForm}
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
                        onChange={onChangeRegisterForm}
                    />
                    <Form.Control.Feedback type="invalid">Password is a required field.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className={cx('mb-3')}>
                    <Form.Control
                        className={cx('fs-4')}
                        size="lg"
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        required
                        value={confirmPassword}
                        onChange={onChangeRegisterForm}
                    />
                    <Form.Control.Feedback type="invalid">Password is a required field.</Form.Control.Feedback>
                </Form.Group>
                <Button className={cx('fs-3')} size="lg" variant="success" type="submit">
                    Register
                </Button>
            </Form>
            <p>
                Already have an account?
                <Link to="/login">
                    <Button variant="info" size="lg" className={cx('ms-2')}>
                        Login
                    </Button>
                </Link>
            </p>
        </>
    );
};
export default RegisterForm;
