import React, { useEffect, useState } from "react";
import "./main.scss";
import { useNavigate } from "react-router-dom";

const Main = () => {
    const [list, setList] = useState([]);
    const [addLike, setAddLike] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const navigate = useNavigate();

    const handleAddLike = () => {
        setAddLike(!addLike);

        setLikeCount((prev) => (addLike ? prev - 1 : prev + 1));
    };

    // useEffect(() => {
    //     fetch("http://10.58.52.222:8000/threads", {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json;charset=utf-8",
    //             //authorization: localStorage.getItem("token"),
    //         },
    //     })
    //         .then((res) => res.json())
    //         .then((result) => {
    //             console.log(result);
    //             if (result.message === "READ_SUCCESS") {
    //                 localStorage.setItem("token", result.accessToken);
    //                 setList(result.data);
    //                 console.log(result.data);
    //             } else {
    //                 alert("실패");
    //             }
    //         });
    // }, []);
    return (
        <div className="main">
            <div className="main-inner">
                {/* {list.map((data) => (
                    <div className={`thread-form ${data.postId}`} key={data.postId}>
                        <div className="top-wrapper">
                            <div className="profile">
                                <p className="profile-img">
                                    <img src={`${data.profileImage}`} alt="유저 프로필 이미지" />
                                </p>
                                <span>{data.nickname}</span>
                            </div>
                            <div className="currentTime">
                                <span>{data.createdAt}</span>
                            </div>
                        </div>
                        <div className="bottom-wrapper">
                            <div className="thread-contents">{data.content}</div>
                            <span>댓글 00</span>
                        </div>
                    </div>
                ))} */}
                <div className="thread-form">
                    <div className="top-wrapper">
                        <div className="profile">
                            <p className="profile-img">
                                <img src="/images/logo.png" alt="유저 프로필 이미지" />
                            </p>
                            <span>크롱이</span>
                        </div>
                        <div className="currentTime">
                            <span>23.02.30</span>
                        </div>
                    </div>
                    <div className="bottom-wrapper">
                        <div className="thread-contents">
                            아이스크림아이스크림아이스크림아이스크림아이스크림아이스크림아이스크림아이스크림아이스크림아이스크림아이스크림아이스크림아이스크림아이스크림아이스크림아이스크림아이스크림아이스크림아이스크림
                        </div>
                        <div className="btn-wrapper">
                            <button className="btn-like-count">좋아요 {likeCount}</button>
                            <details className="btn-comment">댓글</details>
                        </div>
                        <button className="btn-like" onClick={handleAddLike}>
                            <img src={`${addLike ? "/images/like.png" : "/images/unlike.png"}`} />
                        </button>
                    </div>
                </div>
                <div className="btn-bottom-fixed">
                    <button
                        onClick={
                            localStorage.setItem("token") ? navigate("/Write") : navigate("/Login")
                        }
                    >
                        글 쓰기
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Main;
