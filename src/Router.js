import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/login";
import Main from "./pages/threadMainPage/main";
import Write from "./pages/threadWritePage/write";
import Signup from "./pages/userSignUp/signUp";
import SuccessMessage from "./pages/userSignUp/successMessage";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/write" element={<Write />} />
                <Route path="/successMessage" element={<SuccessMessage />} />
            </Routes>
        </BrowserRouter>
    );
};
export default Router;
