import React, { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Frontend from "./Frontend";
import Auth from "./Auth";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { AuthContext } from "../context/AuthContext";
import MyEvents from "./Frontend/MyEvents";
import PrivateRoutes from "../components/PrivateRoutes";

export default function Index() {
  const { isAuthenticated } = useContext(AuthContext)
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/*" element={<Frontend />} />
          <Route path="/auth/*" element={!isAuthenticated ? <Auth /> : <Navigate to='/myEvents' />} />
          <Route path="/myEvents/*" element={<PrivateRoutes Component={MyEvents} />} />

        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
