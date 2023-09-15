import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../src/pages/Login/login";
import Main from "./pages/threadMainPage/main";
import Write from "./pages/threadWritePage/write";
import Signup from "./pages/userSignUp/signUp";
import SuccessMessage from "./pages/userSignUp/successMessage";
import Detail from "./pages/threadMainPage/detail";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/write/" element={<Write />} />
        <Route path="/write/:id" element={<Write />} />
        <Route path="/successMessage" element={<SuccessMessage />} />
        <Route path="/detail" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
