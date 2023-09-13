import React, { Link, useState } from "react";
import "./login.scss";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [thema, setThema] = useState("light");
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    //ID/PW값
    const saveUserId = (event) => {
        setId(event.target.value);
    };
    const saveUserPw = (event) => {
        setPw(event.target.value);
    };

    const isButtonEnabled = id.includes("@") && pw.length >= 5;

    //
    const handleLogin = () => {
        fetch("http://10.58.52.215:8000/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                email: id,
                password: pw,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.message === "LOGIN_SUCCESS") {
                    localStorage.setItem("token", result.accessToken);
                    console.log(result.accessToken);
                    alert("성공");
                    navigate("/");
                } else {
                    alert("로그인 실패");
                }
            });
    };

    //경로
    const navigate = useNavigate();

    const goJoin = () => {
        navigate("/signup");
    };
    //const goMain = () => {
    //    navigate("/main");
    //};

    return (
        <div className={`login ${thema}`}>
            <div className="inner-box background-color">
                <div className="themaToggleWrapper">
                    <button className="btn-back"></button>
                    <button
                        className="themaToggle"
                        onClick={() => setThema(thema === "light" ? "dark" : "light")}
                    >
                        <span></span>
                    </button>
                </div>
                <div className="logo-wrapper">
                    <h1 className="logo-symbol symbol">wecode</h1>
                    <h2 className="logo-wecode text-logo">wecode</h2>
                </div>
                <div className="login-form">
                    <div className="input-wrapper">
                        <input
                            type="text"
                            name="e-mail"
                            placeholder="이메일"
                            onChange={saveUserId}
                        />
                        <input
                            type="text"
                            name="password"
                            placeholder="비밀번호"
                            onChange={saveUserPw}
                        />
                        <button
                            className="btn-login"
                            onClick={handleLogin}
                            disabled={!isButtonEnabled}
                        >
                            로그인
                        </button>
                        {/* <Link to="/main">메인페이지로</Link> */}
                    </div>
                    <div className="form-bottom">
                        <button className="btn-join button-color" onClick={goJoin}>
                            회원가입
                        </button>
                        <button className="btn-password button-color">비밀번호</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
