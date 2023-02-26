import React, { createContext, useEffect, useReducer } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();
const initialState = { isAuthenticated: false, user: { uid: "" } }
const reducer = ((state, { type, payload }) => {
  switch (type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: payload.user,
      };
    case "LOGOUT":
      return {
        isAuthenticated: false,
      };
    default:
      return state;
  }
})
export default function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log("User is signed in");
        dispatch({ type: "LOGIN", payload: { user } });
        // ...
      } else {
        // User is signed out
        // ...
        console.log("User is signed out");
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
