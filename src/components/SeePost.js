import React, { useEffect, useRef, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiMessageRounded } from "react-icons/bi";
import { FiSend, FiBookmark } from "react-icons/fi";
import { CgSmile } from "react-icons/cg";
import {BsThreeDots} from 'react-icons/bs'
import { useSelector ,useDispatch} from "react-redux";
import { selectLoginUserInfor } from "../features/loginSlice";
import { selectAllPosts } from "../features/postsSlice";
import { useParams } from "react-router-dom";
import { actionHandleLoved,actionHandleSubmitComment } from "../features/postsSlice";
import { selectLoginUserFullData } from "../features/usersSilce";
import { ADJUST_POST } from "../features/postsSlice";
import moment from "moment";

function SeePost() {
  const dispatch=useDispatch()
  const [message, setMessage] = useState("");
  const { postId } = useParams();
  const overlayRef = useRef();
  const commentRef=useRef()
  const loginUserInfor = useSelector(selectLoginUserInfor);
  const allPosts = useSelector(selectAllPosts);
  const filterPostsById = allPosts.find((post) => post.postId === postId);
  const loginUserInforFullData=useSelector(selectLoginUserFullData)

  // handle Click ra ngoài phần tử
  // mai sửa lại
  useEffect(() => {
    if(filterPostsById) document.body.style.overflowY='hidden'
    else document.body.style.overflowY='auto'
    window.onclick=function(event){
      if (overlayRef.current === event.target) {
        window.history.back(-1)
        
      }
     
    }
  });
  // xử lý love ảnh
  const handleLove = (docId, love) => {
    dispatch(actionHandleLoved(docId,love,loginUserInfor))
  };
  // Xử lý update comment
  const handleSubmit = (e, preComments, docId) => {
    e.preventDefault();
    dispatch(actionHandleSubmitComment(preComments,docId,loginUserInfor,message))
    setMessage("");
  };
  // Xử lý khi ấn sẽ focus vào input
  const handleFocusInput=()=>{
    commentRef.current.focus()
  }
  // xử lý dispatch hiển thị hộp adjust-post  
  const handleShowBoxAdjustPost=()=>{
    const  data={
      isShowOverlay:true,
      docIdToDelete:filterPostsById.docId,
      userIdOfPost:filterPostsById.userId,
      docIdToUpdateNumberPosts:filterPostsById.docIdUser,
      prePostsNumberOfUser:loginUserInforFullData.postsNumber
     }
     dispatch(ADJUST_POST(data))
  }
  return (
    <>
      {filterPostsById ? (
        <>
          <div className="fixed right-0 top-0 bottom-0 left-0 bg-greyColor mix-blend-multiply z-40"></div>
          <div
            ref={overlayRef}
            className=" fixed animate-scale top-0 right-0 left-0 bottom-0 flex py-[26px] px-[70px] 2xl:px-[200px] z-40  "
          >
            <div className="w-full flex z-50 min-h-[100px] h-auto  ">
              <div className="w-[666px]  bg-blackColor h-full py-20">
                {filterPostsById.type === "image" ? (
                  <img
                    src={filterPostsById.pictureOrVideoOfPost}
                    alt=""
                    className="object-cover w-full  h-full"
                  />
                ) : (
                  <video className="w-[99.9%] h-full" controls>
                    <source
                      src={filterPostsById.pictureOrVideoOfPost}
                      type="video/mp4"
                    />
                  </video>
                )}
              </div>
              <div className="bg-whiteColor rounded-r-md grow">
                <div className="flex flex-col h-full">
                  <div className="flex justify-between border-b p-3  border-borderLightColor items-center">
                     <div className="flex items-center gap-x-4 ">
                      <img
                        className="w-8 h-8 rounded-full cursor-pointer"
                        src={filterPostsById.avatar}
                        alt=""
                      />
                      <span className="text-sm font-medium cursor-pointer">
                        {filterPostsById.userName}
                      </span>
                     </div>
                     <span onClick={()=>{handleShowBoxAdjustPost()}} className="cursor-pointer"><BsThreeDots/>
                      
                     </span>
                   
                  </div>
                  <div className="flex grow w-full overflow-y-auto ">
                    <div className="w-full">
                      <div className="flex gap-x-4 p-3 ">
                        <img
                          className="w-8 h-8 rounded-full"
                          src={filterPostsById.avatar}
                          alt=""
                        />
                        <div className="flex flex-col ">
                          <div className="flex items-center gap-x-2">
                            <span className="text-sm font-medium cursor-pointer">
                              {filterPostsById.userName}
                            </span>
                            <span className="font-light">
                              {filterPostsById.message}
                            </span>
                          </div>
                          <div>
                            <span className="text-xs  text-[#8E8E8E]">
                              {moment(filterPostsById.createAt).fromNow(true)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="w-full">
                          {filterPostsById.comments.map((comment) => (
                            <div key={comment.commentId}>
                              <div className="flex items-center justify-between p-3 w-full">
                                <div className="flex gap-x-4  ">
                                  <img
                                    className="w-8 h-8 rounded-full"
                                    src={comment.avatar}
                                    alt=""
                                  />
                                  <div className="flex flex-col ">
                                    <div className="flex items-center gap-x-2">
                                      <span className="text-sm font-medium cursor-pointer">
                                        {comment.name}
                                      </span>
                                      <span className="font-light">
                                        {comment.comment}
                                      </span>
                                    </div>
                                    <div>
                                      <span className="text-xs  text-[#8E8E8E]">
                                        {moment(comment.createAt).fromNow(true)}
                                        <span className="font-medium ml-3">
                                          Trả lời
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <span className="text-sm cursor-pointer">
                                  <AiOutlineHeart />
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="h-40 w-full border-t border-borderLightColor">
                    <div className="flex justify-between p-3  items-center">
                      <div className="flex gap-x-3  items-center">
                        <span className="relative">
                          <AiOutlineHeart className="text-[27px] cursor-pointer " />
                          <div
                            onClick={() => {
                              handleLove(
                                filterPostsById.docId,
                                filterPostsById.love
                              );
                            }}
                            className={`text-[28px]  ${
                              filterPostsById.love.some(
                                (userLoved) =>
                                  userLoved.userIdLoved ===
                                  loginUserInfor.userId
                              )
                                ? "text-[#ed4956] opacity-100"
                                : "opacity-0"
                            }  ${
                              filterPostsById.love.some(
                                (userLoved) =>
                                  userLoved.userIdLoved ===
                                  loginUserInfor.userId
                              )
                                ? ""
                                : "active:scale-[2]"
                            } absolute top-0 transition-transform duration-700  cursor-pointer `}
                          >
                            <AiFillHeart />
                          </div>
                        </span>

                        <span onClick={handleFocusInput} className='hover:opacity-50' ><BiMessageRounded className="text-[27px]  cursor-pointer" /></span>
                        <FiSend className="text-[25px] hover:opacity-50  cursor-pointer" />
                      </div>
                      <div>
                        <FiBookmark className="text-[26px]  cursor-pointer" />
                      </div>
                    </div>
                    <div className="px-3">
                      <span className="font-medium text-sm">
                        {filterPostsById.love.length} lượt thích
                      </span>
                    </div>
                    <div className="px-3 pb-1">
                      <span className="text-xs text-[#8E8E8E]">
                        {moment(filterPostsById.createAt).fromNow()}
                      </span>
                    </div>
                    <div className="border-t bg-[#ffffff] border-borderLightColor">
                      <form className="flex items-center  justify-between">
                        <div className="   px-4 cursor-pointer">
                          <CgSmile className="text-3xl" />
                        </div>
                        <div className="grow">
                          <input
                            value={message}
                            ref={commentRef}
                            onChange={(e) => {
                              setMessage(e.target.value);
                            }}
                            className="w-full border-0 text-sm outline-none"
                            placeholder="Thêm bình luận"
                          />
                        </div>
                        <button
                          disabled={!message}
                          onClick={(e) => {
                            handleSubmit(
                              e,
                              filterPostsById.comments,
                              filterPostsById.docId
                            );
                          }}
                          className="p-4 text-sm font-medium disabled:opacity-40 text-textFollowColor cursor-pointer"
                        >
                          Đăng
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
   
    </>
  );
}

export default SeePost;
