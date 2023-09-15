import React, { useEffect, useState } from "react";
import "./write.scss";
import { useNavigate, useParams } from "react-router-dom";

const Write = () => {
  const navigate = useNavigate();
  const [imageURL, setImageURL] = useState("");
  const [threadContent, setThreadContent] = useState("");
  const [userNickname, setUserNickname] = useState("");

  const loginToken = localStorage.getItem("token");
  console.log("localStorage", loginToken);

  // const tokenObject = JSON.parse(loginToken);
  useEffect(() => {
    // fetch("엔드포인트 URL", { method: "GET" })
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error("이미지 URL 가져오기 실패");
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     setImageURL(data.imageURL);
    //   })
    //   .catch((error) => {
    //     alert("이미지 URL 가져오기 실패하였습니다.");
    //   });
  }, []);

  const fetchFunction = () => {
    console.log("localStorage", localStorage);
    if (loginToken) {
      if (threadContent) {
        fetch("http://10.58.52.75:8000/threads", {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            authorization: loginToken,
          },
          body: JSON.stringify({
            content: threadContent,
          }),
        })
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            navigate("/");
          })
          .catch((error) => console.error(error));
      } else {
        alert("내용을 확인해 주세요.");
      }
    } else {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  };

  return (
    <div className="thread_container">
      <div className="thread_main">
        <div className="thread_write_main">
          <div className="profile_img_box">
            <div className="profile_img_wrap">
              <img
                className="user_profile"
                src={
                  "https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Ffc7a0770-8294-4680-9cb3-c81efe407127%2Fb5f725e6-ab7c-44cc-ad87-1214e26017a9%2FUntitled.jpeg?table=block&id=9589c573-1bbb-48d7-a06b-a0502555d9cd&spaceId=fc7a0770-8294-4680-9cb3-c81efe407127&width=2000&userId=3389c2f0-8e40-4e50-a5a8-1876a4ee6b79&cache=v2"
                }
                alt="user's profile images"
              ></img>
            </div>
          </div>
          <div className="thread_box">
            <div className="title">정현우</div>
            <textarea
              className="thread_text_zone"
              placeholder="스레드를 시작해주세요."
              value={threadContent}
              onChange={(e) => setThreadContent(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="thread_btn">
          <button className="cancel_btn" onClick={() => navigate("/")}>
            취소
          </button>
          <button className="confirm_btn" onClick={fetchFunction}>
            게시
          </button>
        </div>
      </div>
    </div>
  );
};
export default Write;
