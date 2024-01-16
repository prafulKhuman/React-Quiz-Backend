/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import { Link } from "react-router-dom"
import { useHistory } from 'react-router-dom';
import "./Coustom.css"
import Logo from "./Image/Main.png"
import React, { useState } from "react";
import { useAuth } from '../AuthContext/AuthContext';
import {GET_ADMIN} from "../ApolloClient/Authentication/LogonApollo" ;
import { useQuery } from '@apollo/client';

function Header() {
    const { dispatch } = useAuth();
    const history = useHistory();
    const [show, setShow] = useState(false);

    const handleLogout =()=>{
        dispatch({ type: 'LOGOUT' });
        history.push("/Login")
    }

    const authorizeUser = useQuery(GET_ADMIN, {
        variables: { id: localStorage.getItem("USER_ID") }
    });

    console.log(authorizeUser , "authorize");
    return (<>
        <nav className="navbar navbar-expand-lg "  >
            <div className="container">
                <a className="navbar-brand">
                    {/* <i className="bi-back"></i> */}
                    <img src={Logo} alt="" width="60px" height="55px" />

                </a>

                <div className="d-lg-none ms-auto me-4">
                    <a href="#top" className="navbar-icon bi-person smoothscroll"></a>
                </div>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" >
                    <ul className="navbar-nav ms-lg-5 me-lg-auto">
                        <li className="nav-item">
                            <a className="nav-link pointer" ><Link to="/dashboard">Home</Link></a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link pointer" ><Link to="/question">Question</Link></a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link pointer" ><Link to="/quiz">Quiz</Link></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link pointer" ><Link to="/category"> Category </Link></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link pointer" ><Link to="/rules"> Rules </Link></a>
                        </li>

                    </ul>

                    <div className="d-none d-lg-block profile-icon">
                        <i className="navbar-icon bi-person smoothscroll " onClick={() => setShow(!show)}></i>
                    </div>

                    {
                        show && <div className="profile-card d-flex flex-column card">
                            <strong className="word"><i class="bi bi-person icon-size"> </i> <span>{authorizeUser.data ?   authorizeUser?.data?.Admin[0].username : "UnAuthorize"} </span></strong>
                           
                            <div class="card-footer d-flex justify-content-end">
                               <button className="btn btn-outline-secondary" onClick={handleLogout}>Logout</button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </nav>

    </>);
}

export default Header;