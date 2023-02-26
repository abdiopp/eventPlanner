import React from 'react'
import { Link } from 'react-router-dom';

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <>
            {/* <!-- footer_start --> */}
            <footer className="footer footer_bg_1">
                <div className="circle_ball d-none d-lg-block">
                    <img src="img/banner/footer_ball.png" alt="" />
                </div>
                <div className="footer_top">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-4 col-md-4 col-lg-4">
                                <div className="footer_widget">
                                    <h3 className="footer_title">
                                        Follow Us
                                    </h3>
                                    <ul>
                                        <li><a >Facebook</a></li>
                                        <li><a >Twitter</a></li>
                                        <li><a >Instagram</a></li>
                                        <li><a >Youtube</a></li>
                                    </ul>

                                </div>
                            </div>
                            <div className="col-xl-4 col-md-4 col-lg-4">
                                <div className="footer_widget">
                                    <h3 className="footer_title">
                                        Links
                                    </h3>
                                    <ul>
                                        <li><Link target="_blank" to='/'>Schedule</Link></li>
                                        <li><Link target="_blank" to='/'>Contact</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-4 col-md-4 col-lg-4">
                                <div className="footer_widget">
                                    <h3 className="footer_title">
                                        Venue
                                    </h3>
                                    <p>
                                        200, D-block, Green lane USA <br />
                                        ginnieabdullah007@gmail.com <br />
                                        +10 367 467 8934

                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="copy-right_text">
                    <div className="container">
                        <div className="footer_border"></div>
                        <div className="row">
                            <div className="col-xl-12">
                                <p className="copy_right text-center">
                                    Copyright &copy; {year} All rights reserved
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            {/* <!-- footer_end --> */}
        </>
    )
}
