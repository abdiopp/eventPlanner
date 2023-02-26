import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { signOut } from "firebase/auth";
import { auth } from '../../../config/firebase';
import { AuthContext } from '../../../context/AuthContext';
import logo from './../../../assets/img/logo.png';


export default function Header() {
  const [bgColor, setBgColor] = useState("");


  const handleScroll = () => {
    const position = window.pageYOffset;
    if (position > 300) {
      setBgColor('black')
    } else {
      setBgColor('transparent')
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);








  const { dispatch, isAuthenticated } = useContext(AuthContext)



  const handleLogout = () => {
    signOut(auth).then(() => {
      dispatch({ type: "LOGOUT" });
      console.log("logged out");
      window.location.reload();

    });
  }




  return (
    <header>
      <nav id='navbar' style={{ backgroundColor: bgColor }} className="navbar navbar-expand-lg navbar-dark fixed-top ">
        <div className="container-fluid">
          <Link className="navbar-brand" to='/'><img src={logo} alt="" /></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mx-auto mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link mx-3 active" aria-current="page" to='/'>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mx-3" to='/events'>Events</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mx-3" to='/contact'>Contact</Link>
              </li>
              {isAuthenticated
                ? <li className="nav-item">
                  <Link className="nav-link mx-3" to='/myEvents'>My Events</Link>
                </li>
                : ''

              }
            </ul>
            <div className="col-xl-2 col-lg-2">
              <div className="buy_ticket">
                {isAuthenticated
                  ? <button className="boxed-btn-white" onClick={handleLogout}>Log Out</button>
                  : <Link to='/auth/register' className="boxed-btn-white">Sign Up Now!</Link>

                }
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>

  )
}
