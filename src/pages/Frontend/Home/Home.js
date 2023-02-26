import React from 'react'
import abtshape1 from '../../../assets/img/about/shap1.png'
import abtshape2 from '../../../assets/img/about/shap2.png'
import abt from '../../../assets/img/about/about.png'
import { Link } from 'react-router-dom'



export default function Home() {
  return (
    <>
      {/* <!-- slider_area_start --> */}
      <div className="slider_area slider_bg_1">
        <div className="slider_text">
          <div className="container">
            <div className="position_relv">
              <h1 className="opcity_text d-none d-lg-block">EVENT</h1>
              <div className="row">
                <div className="col-xl-9">
                  <div className="title_text">
                    <h3>Digital Event <br />
                      Planner <br />
                      2023 </h3>
                    <Link to='/event' className="boxed-btn-white">Find Nearby Events</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      {/* <!-- slider_area_end --> */}

      {/* <!-- about_area_start --> */}
      <div className="about_area">
        <div className="shape-1 d-none d-xl-block">
          <img src={abtshape1} alt="" />
        </div>
        <div className="shape-2 d-none d-xl-block">
          <img src={abtshape2} alt="" />
        </div>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-md-6">
              <div className="about_thumb">
                <img src={abt} alt="" />
              </div>
            </div>
            <div className="col-xl-5 offset-xl-1 col-md-6">
              <div className="about_info">
                <div className="section_title">
                  <span className="sub_heading">Welcome To</span>
                  <h3>The Biggest Event <br />
                    Planner of the <br />
                    Year 2019</h3>
                </div>
                <p>Our set he for firmament morning sixth subdue darkness creeping gathered divide our let god.
                  moving. Moving in fourth air night bring upon you’re it beast.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- about_area_end --> */}





      {/* <!-- resister_book_start --> */}
      <div className="resister_book resister_bg_1">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="resister_text text-center">
                <h3>Register Now to Book <br />
                  Your Presence</h3>
                <Link to='/events' className="boxed-btn-white">Join Now</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- resister_book_end --> */}



    </>
  )
}
