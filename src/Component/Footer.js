/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
import Logo from "./Image/Main.png"
function Footer() {
    return (<>
    
        <footer className="site-footer section-padding">
        <hr className="mb-4"/>
            <div className="container">
                <div className="row">

                    <div className="col-lg-3 col-12 mb-4 pb-2">
                        <a className="navbar-brand mb-2" href="index.html">
                            <img src={Logo} alt="" width="70px" height="70px" />
                        </a>
                    </div>

                    <div className="col-lg-3 col-md-4 col-6">
                        <h6 className="site-footer-title mb-3">Resources</h6>

                        <ul className="site-footer-links">
                            <li className="site-footer-link-item">
                                <a href="#" className="site-footer-link">Home</a>
                            </li>

                            <li className="site-footer-link-item">
                                <a href="#" className="site-footer-link">How it works</a>
                            </li>

                            <li className="site-footer-link-item">
                                <a href="#" className="site-footer-link">FAQs</a>
                            </li>

                            <li className="site-footer-link-item">
                                <a href="#" className="site-footer-link">Contact</a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-lg-3 col-md-4 col-6 mb-4 mb-lg-0">
                        <h6 className="site-footer-title mb-3">Information</h6>

                        <p className="text-white d-flex mb-1">
                            <a href="tel: 305-240-9671" className="site-footer-link">
                                305-240-9671
                            </a>
                        </p>

                        <p className="text-white d-flex">
                            <a href="mailto:info@company.com" className="site-footer-link">
                                info@company.com
                            </a>
                        </p>
                    </div>

                    <div className="col-lg-3 col-md-4 col-12 mt-4 mt-lg-0 ms-auto">
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                English</button>

                            <ul className="dropdown-menu">
                                <li><button className="dropdown-item" type="button">Gujrati</button></li>

                                <li><button className="dropdown-item" type="button">English</button></li>

                                <li><button className="dropdown-item" type="button">Hindi</button></li>
                            </ul>
                        </div>

                        <p className="copyright-text mt-lg-5 mt-4">Copyright © 2023 Quiz Center. All rights reserved.
                            <br /><br />Design: Quiz Center </p>

                    </div>

                </div>
            </div>
        </footer>
    </>);
}

export default Footer;