import React from "react";
import "./signUp.scss";
import { useNavigate } from "react-router-dom";

const SuccessMessage = ({ onClose }) => {
    const navigate = useNavigate();
    const goLoin = () => {
        navigate("/login");
    };
    return (
        <div className="success-message">
            <div className="message-inner">
                <img src="/images/banner_square.png" alt="회원가입 완료 체크" />
                <p>회원 가입되었습니다!</p>
                <span>이제 로그인해주세요.</span>
            </div>
            <div className="btn-ok" onClick={goLoin}>
                확인
            </div>
        </div>
    );
};

export default SuccessMessage;
