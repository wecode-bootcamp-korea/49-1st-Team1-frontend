import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../src/pages/Login/login";
import Main from "./pages/threadMainPage/main";
import Write from "./pages/threadWritePage/write";
import Signup from "./pages/userSignUp/signUp";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/write" element={<Write />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
