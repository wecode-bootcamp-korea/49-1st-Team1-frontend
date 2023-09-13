import React, { useEffect, useState } from "react";
import "./signUp.scss";
import { useNavigate } from "react-router-dom";
import SuccessMessage from "./successMessage";

const Signup = () => {
  const [userInfo, setUserInfo] = useState();
  const [success, setSuccess] = useState(false);
  const [userPhoneNumber, setUserPhoneNumber] = useState({
    phoneNumber: "010",
    phone: "",
  });

  const handlePhoneNumber = (e) => {
    const selectedPhoneNumber = e.target.value;
    console.log(selectedPhoneNumber);
    setUserPhoneNumber({
      ...userPhoneNumber,
      phonNumber: selectedPhoneNumber,
    });
  };

  const handlePhoneInput = (e) => {
    const phoneValue = e.target.value;
    setUserInfo({
      ...userInfo,
      phone: phoneValue,
    });
  };

  const navigate = useNavigate();

  const goLogin = () => {
    navigate("/Login");
  };

  const handleUserInfo = (e) => {
    const { name, value } = e.target;

    setUserInfo({ ...userInfo, [name]: value });
  };
  console.log(userInfo);

  const fowardPhoneNumberFunction = () => {
    const newNumberArray = [];
    const fowardPhoneNumber = ["010", "011", "016", "019"];
    for (let i = 0; i < fowardPhoneNumber.length; i++) {
      newNumberArray.push(
        <option key={fowardPhoneNumber[i]}>{fowardPhoneNumber[i]}</option>
      );
    }
    console.log(newNumberArray);
    return newNumberArray;
  };

  const CreateYear = () => {
    const listYear = [];
    const CreateYear = new Date();
    for (let i = 1920; i <= CreateYear.getFullYear(); i++) {
      listYear.push(<option key={i}>{i} 년</option>);
    }
    return listYear;
  };

  const createMonth = () => {
    const listMonth = [];
    for (let i = 1; i <= 12; i++) {
      listMonth.push(<option key={i}>{i}월</option>);
    }
    return listMonth;
  };

  const createDay = () => {
    const listDay = [];
    for (let i = 1; i <= 31; i++) {
      listDay.push(<option key={i}>{i}일</option>);
    }
    return listDay;
  };
  //이메일, 비밀번호 정규식
  const isEmailValid = (email) => {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    return password.length >= 10;
  };

  const isButtonEnabled = (e) => {
    e.preventDefault();
    const { email, password, "confirm-password": confirmPassword } = userInfo;

    if (
      !userInfo ||
      !userInfo["email"] ||
      !userInfo["password"] ||
      !userInfo["confirm-password"]
    ) {
      alert("모든 필드를 채워주세요.");
    } else if (!isEmailValid(email)) {
      alert("올바른 이메일 형식이 아닙니다.");
    } else if (!isPasswordValid(password)) {
      alert("비밀번호는 10자리 이상으로 작성해 주세요.");
    } else if (userInfo["password"] !== userInfo["confirm-password"]) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
    } else {
      setSuccess(true);
    }

    fetch("http://10.58.52.222:8000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(userInfo, userPhoneNumber),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        // if (result.message === "LOGIN_SUCCESS") {
        //     alert("성공이다 !");
        // }
      });
  };

  return (
    <div className="Signup">
      <div className="inner-box">
        <div className="btn-back-wrapper">
          <button onClick={goLogin} className="btn-back"></button>
        </div>
        <form className="join-form">
          {success && <SuccessMessage onClose={() => setSuccess(false)} />}
          <h2>회원가입</h2>
          <div className="input-wrapper mt-24">
            <label>
              <span>기본 정보</span>
              <span className="color-red note">필수 사항</span>
            </label>
            <input
              type="text"
              name="email"
              placeholder="이메일"
              onChange={handleUserInfo}
            />
            <input
              type="password"
              name="password"
              placeholder="비밀번호"
              onChange={handleUserInfo}
            />
            <input
              type="password"
              name="confirm-password"
              placeholder="비밀번호 확인"
              onChange={handleUserInfo}
            />
          </div>
          <div className="input-wrapper mt-24">
            <label>
              <span>닉네임과 프로필 이미지</span>
              <span className="note">선택 사항</span>
            </label>
            <input
              type="text"
              name="nickname"
              placeholder="닉네임"
              onChange={handleUserInfo}
            />
          </div>
          <div className="input-wrapper input-phonenumber mt-24">
            <label>
              <span>전화번호</span>
              <span className="note">선택 사항</span>
            </label>
            <div className="input-inner">
              <select
                className="phone-number"
                id="phone-number"
                value={userPhoneNumber.phoneNumber}
                onChange={handlePhoneNumber}
              >
                {fowardPhoneNumberFunction()}
              </select>
              <input
                id="phone"
                type="tel"
                name="phone-number"
                placeholder="휴대폰 번호를 입력해주세요."
                //value={userPhoneNumber.phone}
                onChange={handlePhoneInput}
              />
            </div>
          </div>
          <div className="input-wrapper mt-24">
            <label id="">
              <span>생일</span>
              <span className="note">선택 사항</span>
            </label>
            <div className="input-inner">
              <select id="year" className="year">
                {CreateYear()}
              </select>
              <select id="month" className="month">
                {createMonth()}
              </select>
              <select id="day" className="day">
                {createDay()}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="btn-join-b"
            onClick={isButtonEnabled}
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
