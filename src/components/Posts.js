import React, { useEffect, useState,memo } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiMessageRounded } from "react-icons/bi";
import { FiSend, FiBookmark } from "react-icons/fi";
import { CgSmile } from "react-icons/cg";
import {BsFillBookmarkFill,BsThreeDots} from 'react-icons/bs'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectAllPosts } from "../features/postsSlice";
import { selectLoginUserInfor } from "../features/loginSlice";
import { actionHandleLoved } from "../features/postsSlice";
import { actionHandleSubmitComment } from "../features/postsSlice";
import { actionHandleSavePost } from "../features/postsSlice";
import { ADJUST_POST } from "../features/postsSlice";
import { selectLoginUserFullData } from "../features/usersSilce";
import moment from "moment";
function Posts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Lấy ra những posts có trong firebase
  const posts = useSelector(selectAllPosts);
  // lấy thông tin user đang đăng nhập
  const loginUserInfor = useSelector(selectLoginUserInfor);
  //
  const loginUserInforFullData=useSelector(selectLoginUserFullData)
  const [message, setMessage] = useState("");
  // xử lý  xem user đã thả tim hay chưa,nếu thả tim rồi sẽ xóa đi,còn chưa thả tim sẽ được thêm vào
  const handleLove = (docId, love) => {
    dispatch(actionHandleLoved(docId, love, loginUserInfor));
  };
  // xử lý submit comment lên firebase
  const handleSubmit = (e, preComments, docId) => {
    e.preventDefault();
    dispatch(
      actionHandleSubmitComment(preComments, docId, loginUserInfor, message)
    );
    setMessage("");
  };
  // xử lý khi ấn vào comments để chuyển sang xem ảnh
  const handleNavigate = (postId) => {
    sessionStorage.setItem("positionOfScrollBody", window.pageYOffset);
    navigate(`/post/${postId}`);
  };
  // xử lý nếu nhớ vị trí scroll trước khi chuyển sang link mới
  useEffect(() => {
    const positionOfScrollBoryPrePage = sessionStorage.getItem(
      "positionOfScrollBody"
    );
    if (positionOfScrollBoryPrePage) {
      window.scrollTo(0, positionOfScrollBoryPrePage);
    }
    sessionStorage.removeItem("positionOfScrollBody");
  });
 
 
  // xử lý dispatch hiển thị hộp adjust-post  
   const handleShowBoxAdjustPost=(docIdOfPost,userIdOfPost,docIdUser)=>{
     const  data={
      isShowOverlay:true,
      docIdToDelete:docIdOfPost,
      userIdOfPost:userIdOfPost,
      docIdToUpdateNumberPosts:docIdUser,
      prePostsNumberOfUser:loginUserInforFullData.postsNumber

     }
     dispatch(ADJUST_POST(data))
   }
   
 // lọc post những ai đã theo dõi và chưa theo dõi
  const filterPostsArray=posts.map(post=>{
    const followingUser=loginUserInforFullData.following
    const lengthOfFollowing=followingUser.length
     for(let i=0;i<lengthOfFollowing;i++){
         if(followingUser[i].userId===post.userId){
           return  post
         }
     }
  })
  const findPosts=filterPostsArray.filter(post=>post!==undefined)
 //
 const handleThrowLove=()=>{
   
 } 
 
  return (
    <div>
      {posts.length > 0 ? (
        <div>
          {findPosts.map((post) => (
            <div
              key={post.postId}
              className="my-5 border border-borderColor rounded"
            >
              <div className="flex p-3 justify-between " >
               <div className="flex gap-x-4 items-center  ">
                <Link to={`${post.userId}`} className="flex gap-x-4 items-center  " >
                  <img
                    className="w-8 h-8 rounded-full"
                    src={post.avatar}
                    alt=""
                  />
                  <span className="text-sm font-medium">{post.userName}</span>
                  </Link>
                  {post.userId!==loginUserInfor.userId
                  ?<div>
                    {loginUserInforFullData.following.every(followingUserId=>followingUserId.userId!==post.userId)
                  &&<span className="font-medium text-textFollowColor text-sm">Theo dõi</span>
                  }
                  </div>
                  :<></>
                  }
                </div>
              
                <div onClick={()=>{handleShowBoxAdjustPost(post.docId,post.userId,post.docIdUser)}} className="font-medium cursor-pointer text-xl"><BsThreeDots/></div>
              </div>
              <div onClick={()=>{handleThrowLove()}}>
                {post.type === "image" ? (
                  <img
                    className=" object-fill w-full"
                    src={post.pictureOrVideoOfPost}
                    alt=""
                  />
                ) : (
                  <video controls className="object-cover w-full">
                    <source src={post.pictureOrVideoOfPost} type="video/mp4" />
                  </video>
                )}
              </div>
              <div className="flex justify-between px-4 py-3 ">
                <div className="flex gap-x-4 ">
                  <span className="relative">
                    <AiOutlineHeart className="text-[28px] cursor-pointer  " />
                    {
                      <div
                        onClick={() => {
                          handleLove(post.docId, post.love);
                        }}
                        className={`text-[28px] ${
                          post.love.some(
                            (userLoved) =>
                              userLoved.userIdLoved === loginUserInfor.userId
                          )
                            ? "text-[#ed4956] opacity-100"
                            : "opacity-0"
                        }  ${
                          post.love.some(
                            (userLoved) =>
                              userLoved.userIdLoved === loginUserInfor.userId
                          )
                            ? ""
                            : "active:scale-[2]"
                        } absolute top-0 transition-transform duration-700  cursor-pointer `}
                      >
                        <AiFillHeart />
                      </div>
                    }
                  </span>
                  <span
                    onClick={() => {
                      handleNavigate(post.postId);
                    }}
                  >
                    <BiMessageRounded className="text-[28px] cursor-pointer" />
                  </span>
                  <span>
                    <FiSend className="text-[26px] cursor-pointer" />
                  </span>
                </div>
                <div>
                 {}
                </div>
              </div>
              <div className="px-5 pb-5">
                <div className="text-sm font-medium ">
                  {post.love.length > 0 ? (
                    <span>{post.love.length} lượt thích</span>
                  ) : (
                    ""
                  )}
                </div>
                {post.message ? (
                  <div className="flex items-center gap-x-2 ">
                    <div className="font-medium text-sm">{post.userName}</div>
                    <div>{post.message}</div>
                  </div>
                ) : (
                  ""
                )}
                {post.comments.length > 0 ? (
                  <p
                    onClick={() => {
                      handleNavigate(post.postId);
                    }}
                    className="text-sm text-greyColor cursor-pointer"
                  >
                    Xem tất cả {post.comments.length} bình luận
                  </p>
                ) : (
                  ""
                )}
                <ul className="list-none">
                  {post.comments
                    .map((comment) => (
                      <div key={comment.commentId}>
                        <span className="text-sm font-medium">
                          {" "}
                          {comment.name}
                        </span>
                        <span className="text-sm ml-2">{comment.comment}</span>
                      </div>
                    ))
                    .slice(0, 4)}
                </ul>
                <span className="text-xs text-[#8E8E8E]">
                  {moment(post.createAt).fromNow()}
                </span>
              </div>
              <form className="flex items-center border-t  border-greyLightColor justify-between">
                <div className="py-3 px-4 cursor-pointer">
                  <CgSmile className="text-3xl" />
                </div>
                <div className="grow">
                  <input
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                    className="w-full bg-[#fafafa] border-0 text-sm outline-none"
                    placeholder="Thêm bình luận"
                  />
                </div>
                <button
                  disabled={!message}
                  onClick={(e) => {
                    handleSubmit(e, post.comments, post.docId);
                  }}
                  className="p-4 text-sm font-medium disabled:opacity-40 text-textFollowColor cursor-pointer"
                >
                  Đăng
                </button>
              </form>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default memo(Posts);
