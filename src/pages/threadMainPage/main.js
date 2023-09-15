import React, { useEffect, useState } from "react";
import "./main.scss";
import { useNavigate } from "react-router-dom";
const Main = () => {
  const [list, setList] = useState([]);
  const [addLike, setAddLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [deletewrie, setDeleteWirte] = useState("");

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  console.log(1, token);

  const handleAddLike = () => {
    setAddLike(!addLike);
    setLikeCount((prev) => (addLike ? prev - 1 : prev + 1));
  };
  const handleNavigate = () => {
    if (token) {
      navigate("/write");
    } else {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  };

  useEffect(() => {
    console.log("token", token);
    fetch("http://10.58.52.75:8000/threads", {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.message === "READ_SUCCESS") {
          setList(result.data);
          console.log(result.data);
        } else {
          alert("실패");
        }
      });
  }, []);

  const handleDelete = (postId) => {
    if (window.confirm("삭제하시겠습니까?")) {
      fetch(`http://10.58.52.75:8000/threads/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          authorization: token,
        },
      })
        .then((result) => {
          if (result.ok) {
            navigate("/");
          } else {
            alert("삭제가 되지 않았습니다.");
          }
        })
        .catch((error) => {
          console.error("게시물 삭제 오류:", error);
        });
    }
  };

  return (
    <div className="main">
      <div className="main-inner">
        {list.map((data) => (
          <div className={`thread-form ${data.postId}`} key={data.postId}>
            <div className="top-wrapper">
              <div className="profile">
                <p className="profile-img">
                  <img src={`${data.profileImage}`} alt="유저 프로필 이미지" />
                </p>
                <span>{data.nickname}</span>
              </div>
              <div className="currentTime">
                <div
                  className={`update-and-delete ${data.isMyPost ? "on" : ""}`}
                >
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(data.postId)}
                  >
                    삭제
                  </button>
                  <button className="update-button"> 수정</button>
                </div>
                <span>{data.createdAt}</span>
              </div>
            </div>
            <div className="bottom-wrapper">
              <div className="thread-contents">{data.content}</div>
              <span>댓글 00</span>
            </div>
          </div>
        ))}
        {/* <div className="thread-form">
          <div className="top-wrapper">
            <div className="profile">
              <p className="profile-img">
                <img src="/images/logo.png" alt="유저 프로필 이미지" />
              </p>
              <span>크롱이</span>
            </div>
            <div className="currentTime">
              <div className={`update-and-delete ${token ? "on" : ""}`}>
                <button className="delete-button" onClick={handleDelete}>
                  삭제
                </button>
                <button className="update-button"> 수정</button>
              </div>
              <span>23.02.30</span>
            </div>
          </div>
          <div className="bottom-wrapper">
            <div className="thread-contents">
              아이스크림아이스크림아이스크림아이스크림아이스크림아이스크림아이스크림아이스크림아이스크림아이스크림아이스크림아이스크림아이스크림아이스크림아이스크림아이스크림아이스크림아이스크림아이스크림
            </div>
            <div className="btn-wrapper">
              <button className="btn-like-count">좋아요 {likeCount}</button>
              <button className="btn-comment">댓글</button>
            </div>
            <button className="btn-like" onClick={handleAddLike}>
              <img
                src={`${addLike ? "/images/like.png" : "/images/unlike.png"}`}
                alt="YourProfilePicture"
              />
            </button>
          </div>
        </div>

        <div className="thread-form">
          <div className="top-wrapper">
            <div className="profile">
              <p className="profile-img">
                <img src="/images/logo.png" alt="유저 프로필 이미지" />
              </p>
              <span>크롱이</span>
            </div>
            <div className="currentTime">
              <div className={`update-and-delete ${token ? "on" : ""}`}>
                <button className="delete-button" onClick={handleDelete}>
                  삭제
                </button>
                <button className="update-button"> 수정</button>
              </div>
              <span>23.02.30</span>
            </div>
          </div>
          <div className="bottom-wrapper">
            <div className="thread-contents">
              아이스크림아이스크림아이스크림아이스크림아이스크림아이스크림아이스크림아이스크림아이스크림아이스크림아이스크림아이스크림아이스크림아이스크림아이스크림아이스크림아이스크림아이스크림아이스크림
            </div>
            <div className="btn-wrapper">
              <button className="btn-like-count">좋아요 {likeCount}</button>
              <button className="btn-comment">댓글</button>
            </div>
            <button className="btn-like" onClick={handleAddLike}>
              <img
                src={`${addLike ? "/images/like.png" : "/images/unlike.png"}`}
                alt="YourProfilePicture"
              />
            </button>
          </div>
        </div> */}

        <div className="btn-bottom-fixed">
          <button onClick={handleNavigate}>글 쓰기</button>
        </div>
      </div>
    </div>
  );
};
export default Main;
