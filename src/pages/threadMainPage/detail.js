import React, { useEffect, useState } from "react";
import "./main.scss";
import { useNavigate } from "react-router-dom";

const Detail = () => {
    const [comment, setCommnet] = useState([]);
    const [addLike, setAddLike] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [userComment, setUserComment] = useState();
    const navigate = useNavigate();

    const handleAddLike = () => {
        setAddLike(!addLike);

        setLikeCount((prev) => (addLike ? prev - 1 : prev + 1));
    };

    const saveUseComment = (event) => {
        setUserComment(event.target.value);
    };
    const token = localStorage.getItem("token");

    const handleCommentPut = () => {
        fetch("http://10.58.52.215:8000/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                authorization: localStorage.getItem("token"),
            },
            body: JSON.stringify({
                postId: 25,
                comment: userComment,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result) {
                    localStorage.setItem("token", result.accessToken);
                    setCommnet(result.data);
                    console.log(result.data);
                } else {
                    alert("실패");
                }
            });
    };

    return (
        <div className="detail">
            <div className="main-inner">
                {/*}{list.map((data) => (
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
                            <div className="thread-contents">{data.comment}</div>
                            <span>댓글 00</span>
                        </div>
                    </div>
                ))}*/}
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
                            <button className="btn-comment-count">댓글</button>
                        </div>
                        <button className="btn-like" onClick={handleAddLike}>
                            <img src={`${addLike ? "/images/like.png" : "/images/unlike.png"}`} />
                        </button>
                    </div>
                </div>
                <div className={`comment-input-wrapper ${token ? "on" : ""}`}>
                    <div className="comment-input">
                        <input
                            type="text"
                            name="comment"
                            placeholder="댓글을 작성해주세요."
                            onChange={saveUseComment}
                        />
                        <button type="button" onClick={handleCommentPut}>
                            댓글 게시
                        </button>
                    </div>
                </div>
                <div className="comment-wrapper">
                    {comment &&
                        comment.map((data) => {
                            <div className={`user-comment-list ${data.commentId}`}>
                                <div className="comment-profile">
                                    <p className="comment-profile-img">
                                        <img src="/images/logo.png" alt="" />
                                    </p>
                                    <div className="comment-contents">
                                        <span className="comment-user-name">{data.nickname}</span>
                                        <p className="contents">data.comments[0].comment</p>
                                    </div>
                                    <span className="comment-date">createdAt</span>
                                </div>
                            </div>;
                        })}

                    <div className="user-comment-list">
                        <div className="comment-profile">
                            <p className="comment-profile-img">
                                <img src="/images/logo.png" alt="" />
                            </p>
                            <div className="comment-contents">
                                <span className="comment-user-name">세연</span>
                                <p className="contents">내용입니다</p>
                            </div>
                            <span className="comment-date">00.00.00</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Detail;
