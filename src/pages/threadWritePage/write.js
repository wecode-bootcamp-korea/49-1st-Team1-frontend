import React, { useEffect, useState } from "react";
import "./write.scss";
import { useNavigate, useParams } from "react-router-dom";

const Write = () => {
  const navigate = useNavigate();

  //   const {parameter} = useParams();

  const [imageURL, setImageURL] = useState("");
  const [threadContent, setThreadContent] = useState("");
  const [userNickname, setUserNickName] = useState("");
  const [checkedThread, setCheckedThread] = useState(false);
  const [userId, setUserId] = useState("");

  const loginToken = localStorage.getItem("token");

  //   useEffect(() => {
  //     fetch("", { method: "GET" })
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error("이미지 URL 가져오기 실패");
  //         }
  //         return response.json();
  //       })
  //       .then((data) => {
  //         setImageURL(data.imageURL);
  //       })
  //       .catch((error) => {
  //         alert("이미지 URL 가져오기 실패하였습니다.");
  //       });
  //   }, []);

  const fetchFunction = () => {
    if (loginToken) {
      if (threadContent) {
        fetch("http://10.58.52.215:8000/threads/writeThread", {
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
          .then((result) => console.log(result))
          .catch((error) => console.error(error));
      } else {
        alert("내용을 확인해 주세요.");
      }
    } else {
      alert("로그인이 필요합니다.");
    }
  };

  //   const ThreadUpdate = () => {
  //     if (loginToken) {
  //       if (threadContent) {
  //         fetch("http://10.58.52.222:8000/thread", {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json;charset=utf-8",
  //             Authorization: loginToken,
  //           },
  //           body: JSON.stringify({
  //             content: threadId,
  //           }),
  //         })
  //           .then((response) => {
  //             if (!response.ok) {
  //               throw new Error("게시글 수정 실패");
  //             }
  //             return response.json();
  //           })
  //           .then((result) => {
  //             console.log(result);
  //             navigate(`/thread/${"쓰레드 아이디"}`); // 수정 완료 후 해당 게시글 페이지로 이동
  //           })
  //           .catch((error) => {
  //             console.error(error);
  //             alert("게시글 수정 실패하였습니다.");
  //           });
  //       } else {
  //         alert("내용을 확인해 주세요.");
  //       }
  //     } else {
  //       alert("로그인이 필요합니다.");
  //     }
  //   };

  //   const UpdateSending = () => {
  //     fetch(`http://10.58.52.222:8000/thread/${쓰레드아이디}`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json;charset=utf-8",
  //       },
  //       body: JSON.stringify({
  //         content: threadContent,
  //       }),
  //     })
  //       .then((reponse) => {})
  //       .then((result) => {});
  //   };

  return (
    <div className="thread_container">
      <div className="thread_main">
        <div className="thread_write_main">
          <div className="profile_img_box">
            <div className="profile_img_wrap">
              <img
                className="user_profile"
                src={imageURL}
                alt="user's profile images"
              ></img>
            </div>
          </div>
          <div className="thread_box">
            <div className="title">Name</div>
            <textarea
              className="thread_text_zone"
              placeholder="스레드를 시작해주세요."
              value={threadContent} // textarea 값을 상태 변수에 바인딩
              onChange={(e) => setThreadContent(e.target.value)} // 상태 업데이트
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
