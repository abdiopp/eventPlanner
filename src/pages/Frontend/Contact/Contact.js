import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'

export default function Contact() {
    const { user } = useContext(AuthContext)

    return (
        <>

            {/* <!-- slider_area_start --> */}
            <div class="slider_area slider_bg_1">
                <div class="slider_text">
                    <div class="container">
                        <div class="position_relv">
                            <div class="row">
                                <div class="col-xl-8 col-lg-8">
                                    <div class="title_text title_text2 ">
                                        <h3>contact</h3>
                                        <Link to='/events' class="boxed-btn-white">Events</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className="slider_bg_1">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="card p-5  mx-auto" style={{ maxWidth: 620, margin: 100 }}>
                                <h1 className="text-center mb-5">Get in Touch</h1>
                                <div class="row">
                                    <div class="col-12">
                                        <div class="form-group">
                                            <textarea class="form-control my-1 w-100" name="message" id="message" cols="30" rows="9" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Message'" placeholder="Your Query"></textarea>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <input class="form-control my-1 valid" name="name" id="name" type="text" value={user.displayName} onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter your name'" placeholder="Enter your name" />
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <input class="form-control my-1 valid" name="email" id="email" type="email" value={user.email} onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter email address'" placeholder="Email" />
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-group">
                                            <input class="form-control my-1" name="subject" id="subject" type="text" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Subject'" placeholder="Enter Subject" />
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group mt-3">
                                    <button type="submit" class="button button-contactForm boxed-btn">Send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
