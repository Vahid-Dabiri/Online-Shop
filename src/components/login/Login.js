import React, { useState, useContext, useRef, useEffect } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import EmailIcon from '@mui/icons-material/Email';
import { login_token_context } from '../../contexts/loginContext'
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './Login.css';

export default function Login() {
    const [form_condition, set_form_condition] = useState(true);
    const contextData = useContext(login_token_context);
    const [login_errors, set_login_errors] = useState(['init', 'init']);
    const [change_token, set_change_token] = useState(false);
    const [login_err_message, set_login_err_message] = useState(false);
    const navigate = useNavigate();

    const login_user_name_ref = useRef();
    const login_password_ref = useRef();

    // // Check if User Login
    // const token = localStorage.getItem('token');
    // const [is_user_auth, set_is_user_auth] = useState(false);

    // if (token) {
    //     const user_auth_handler = async () => {
    //         await axios.get('https://dummyjson.com/auth/me',
    //             {
    //                 headers: { 'Authorization': token, }
    //             })
    //             .then(() => {
    //                 set_is_user_auth(true)
    //                 navigate('/account')
    //             })
    //             .catch(() => {
    //                 set_is_user_auth(false)
    //             })
    //     }

    //     user_auth_handler();
    // }

    useEffect(() => {
        contextData.set_user_token(localStorage.getItem('token'));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [change_token])

    // Show Form
    const change_form_handler = () => {
        set_form_condition(prevState => !prevState)
    }

    // REGISTER
    const formik = useFormik(
        {
            initialValues: {
                full_name: '',
                email: '',
                password: '',
                confirm_password: ''
            },

            onSubmit: async (values) => {

                await fetch('https://dummyjson.com/users/add', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        firstName: values.full_name,
                        email: values.email,
                        password: values.password,
                        age: 30
                    })
                })
                    .then(res => res.json())
                    .then(() => navigate('/account'));
            },
            validationSchema: Yup.object({
                full_name: Yup.string().max(15, 'User Name Can Not be More Than 10 Characters').min(3, 'User Name Can Not be Less Than 3 Characters').required('This Input is Required'),
                email: Yup.string().email('Invalid Email').required('This Input is Required'),
                password: Yup.string()
                    .required('No password provided.')
                    .min(8, 'Password is too short - should be 8 chars minimum.'),
                confirm_password: Yup.string()
                    .oneOf([Yup.ref('password'), null], 'Passwords must match')
            })
        }
    )

    // LOGIN
    const login_submit_handler = async (e) => {
        e.preventDefault();
        if (login_user_name_ref.current.value && login_password_ref.current.value) {
            set_login_errors(['', '']);

            const user_auth_infos = {
                username: login_user_name_ref.current.value,
                password: login_password_ref.current.value
            }

            await axios.post('https://dummyjson.com/auth/login', user_auth_infos)
                .then(
                    response => {
                        localStorage.setItem('token', response.data.accessToken)
                        set_change_token(prevState => !prevState)
                        set_login_err_message(false)
                        navigate('/account')
                    })
                .catch(
                    () => set_login_err_message(true)
                )

        } else if (login_user_name_ref.current.value && !login_password_ref.current.value) {
            set_login_errors(['', 'This Input is Required']);
        } else if (login_password_ref.current.value && !login_user_name_ref.current.value) {
            set_login_errors(['This Input is Required', '']);
        } else {
            set_login_errors(['This Input is Required', 'This Input is Required']);
        }

    }

    const user_token = localStorage.getItem('token');
    if (contextData.is_user_auth && user_token) {
        return (
            <main className='login_main_container'>
                <div className='alredy_message_container'>
                    <h1>You are Already Loged In</h1>
                    <Link to='/account'>Go to Account</Link>
                </div>
            </main>
        )
    } else {
        return (
            <main className='login_main_container'>
                <div className='btn_logo_container'>
                    <Link className='logo_link' to='/'>LOGO.</Link>
                    {
                        form_condition ? (
                            <>
                                <h1 className='page_title'>Log in</h1>
                                <div className='login_btns_container'>
                                    <p>Need an Account?</p>
                                    <button className='login_form_btn' onClick={change_form_handler}>Sign in</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <h1 className='page_title'>Sign in</h1>
                                <div className='login_btns_container'>
                                    <p>Already Have An Account?</p>
                                    <button className='login_form_btn' onClick={change_form_handler}>Log in</button>
                                </div>
                            </>
                        )
                    }
                </div>
                <div className='login_form_container'>

                    {
                        form_condition ? (
                            <>
                                {
                                    login_err_message ? <span className='form_warning'>Your User Name or Password is Wrong</span> : ''
                                }
                                <form className='login_form' onSubmit={login_submit_handler}>
                                    <label htmlFor="login_user_name">
                                        <span><PersonIcon /> User Name</span>
                                        <input ref={login_user_name_ref} type='text' id='login_user_name' autoComplete='username' placeholder='User Name' />
                                        {
                                            login_errors[0].length > 0 && login_errors[0] !== 'init' ? <span className='form_warning'>{login_errors[0]}</span> : ''
                                        }

                                    </label>
                                    <label htmlFor="login_password">
                                        <span><LockOpenIcon /> Password</span>
                                        <input ref={login_password_ref} type='text' id='login_password' autoComplete='current-password' placeholder='Password' />
                                        {
                                            login_errors[1].length > 0 && login_errors[1] !== 'init' ? <span className='form_warning'>{login_errors[1]}</span> : ''
                                        }
                                    </label>
                                    <button type="submit">Log in</button>
                                </form>
                                <Link to='#'>Forgot Your Password?</Link>
                            </>
                        ) : (
                            <>
                                <form action='' className='signin_form' onSubmit={formik.handleSubmit}>
                                    <label htmlFor="signin_user_name">
                                        <span><PersonIcon /> Full Name</span>
                                        <input type='text' id='signin_user_name' placeholder='Full Name' {...formik.getFieldProps('full_name')} />
                                        {
                                            formik.touched.full_name && formik.errors.full_name ? <span className='form_warning'>{formik.errors.full_name}</span> : ''
                                        }
                                    </label>
                                    <label htmlFor="signin_email">
                                        <span><EmailIcon /> Email</span>
                                        <input type='email' id='signin_email' placeholder='Email' {...formik.getFieldProps('email')} />
                                        {
                                            formik.touched.email && formik.errors.email ? <span className='form_warning'>{formik.errors.email}</span> : ''
                                        }
                                    </label>
                                    <label htmlFor="signin_password">
                                        <span><LockOpenIcon /> Password</span>
                                        <input type='text' id='signin_password' placeholder='Password' {...formik.getFieldProps('password')} />
                                        {
                                            formik.touched.password && formik.errors.password ? <span className='form_warning'>{formik.errors.password}</span> : ''
                                        }
                                    </label>
                                    <label htmlFor="signin_confirm_password">
                                        <span><LockOpenIcon /> Confirm Password</span>
                                        <input type='text' id='signin_confirm_password' placeholder='Confirm Password' {...formik.getFieldProps('confirm_password')} />
                                        {
                                            formik.touched.confirm_password && formik.errors.confirm_password ? <span className='form_warning'>{formik.errors.confirm_password}</span> : ''
                                        }
                                    </label>
                                    <button type="submit">Sign in</button>
                                </form>

                            </>
                        )
                    }

                </div>

            </main >
        )
    }
}
