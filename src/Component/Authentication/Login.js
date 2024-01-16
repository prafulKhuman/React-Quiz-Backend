/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../../ApolloClient/Authentication/LogonApollo';
import * as Yup from 'yup';
import './style.css';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../../AuthContext/AuthContext';




function Login({ onSuccess }) {
    const [login] = useMutation(LOGIN_MUTATION);
    const { dispatch } = useAuth();


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',

        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),

        }),
        onSubmit: (values, action) => {
            login({ variables: { username: values.email, password: values.password } })
                .then((response) => {
                                     
                    toast.success('Login Successfully', {
                        position: "top-right",
                        autoClose: 1000,
                        onClose: () => {

                            dispatch({ type: 'LOGIN', payload: { token: response.data.adminLogin.token } });
                            localStorage.setItem("USER_ID", response.data.adminLogin.userId);
                            // onSuccess();
                        },
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    action.resetForm({
                        values: {
                            email: '',
                            password: '',


                        }
                    });




                })
                .catch(() => {

                    toast.error("SomeThing Want Wrong", {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })




                });


        }

    });

    return (
        <>
            <section className="vh-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="img-fluid"
                                alt="Sample image"
                            />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">

                            <form onSubmit={formik.handleSubmit}>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form3Example3">
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        id="form3Example3"
                                        name="email"
                                        className={`form-control form-control-lg ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                                        placeholder="Enter a valid email address"
                                        {...formik.getFieldProps('email')}
                                    />
                                    {formik.touched.email && formik.errors.email && <div className="invalid-feedback">{formik.errors.email}</div>}
                                </div>
                                <div className="form-outline mb-3">
                                    <label className="form-label" htmlFor="form3Example4">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="form3Example4"
                                        name="password"
                                        className={`form-control form-control-lg ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                                        placeholder="Enter password"
                                        {...formik.getFieldProps('password')}
                                    />
                                    {formik.touched.password && formik.errors.password && <div className="invalid-feedback">{formik.errors.password}</div>}
                                </div>

                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="form-check mb-0">
                                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                        <label className="form-check-label" htmlFor="form2Example3">
                                            Remember me
                                        </label>
                                    </div>
                                    <a href="#!" className="text-body">
                                        Forgot password?
                                    </a>
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg"
                                        style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                                    >
                                        Login
                                    </button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">
                                        Don't have an account?{' '}
                                        <span className="link-danger">
                                            <Link to="/Register"> Register </Link>
                                        </span>
                                    </p>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>

                <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
                    <div>
                        <a href="#!" className="text-white me-4">
                            <i className="bi bi-facebook"></i>
                        </a>
                        <a href="#!" className="text-white me-4">
                            <i className="bi bi-twitter"></i>
                        </a>
                        <a href="#!" className="text-white me-4">
                            <i className="bi bi-google"></i>
                        </a>
                        <a href="#!" className="text-white">
                            <i className="bi bi-linkedin"></i>
                        </a>
                    </div>
                </div>
            </section>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                theme="light"
            />
        </>
    );
}

export default Login;
