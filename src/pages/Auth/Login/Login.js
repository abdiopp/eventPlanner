import React, { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "../../../config/firebase";
import { AuthContext } from "../../../context/AuthContext";

const initialState = { email: "", password: "" };

export default function Login() {
  const { dispatch } = useContext(AuthContext);


  const [state, setState] = useState(initialState);
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleLogin = () => {
    console.log(state);
    const { email, password } = state;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("signInWithEmailAndPassword success", user);

        dispatch({ type: "LOGIN", payload: { user } });

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
      });
  };
  return (
    <div className="slider_bg_1">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card p-5  mx-auto " style={{ maxWidth: 580, margin: 100 }}>
              <h1 className="text-center mb-5">Login</h1>
              <input
                className="form-control"
                onChange={handleChange}
                type="email"
                placeholder="Email"
                name="email"
              />
              <input
                className="form-control my-5"
                onChange={handleChange}
                type="password"
                placeholder="Password"
                name="password"
              />
              <button className="btn btn-info w-50 mx-auto" onClick={handleLogin}>
                Login
              </button>
              <Link
                to="/auth/register"
                className="btn btn-primary w-50 mt-1 mx-auto"
              >
                Not a User?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
