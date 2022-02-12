import React, { useEffect, useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import { useSelector, useDispatch } from "react-redux";
import { selectIsShow } from "../features/postSlice";
import { ImFilePicture } from "react-icons/im";
import { BiArrowBack } from "react-icons/bi";
import { OFF_BOX_CREATE_POST, GET_PRE_AVATAR } from "../features/postSlice";
import { selectLoginUserInfor } from "../features/loginSlice";
import { selectPreAvatar, addPostToFirebase } from "../features/postSlice";
import { selectAllUsers } from "../features/usersSilce";
import { selectLoad } from '../features/postSlice';
import UpLoadPost from "./UpLoadPost";

function CreatePost() {
  const dispatch = useDispatch();
  // useHook
  const [linkPreview, setLinkPreview] = useState();
  const [input, setInput] = useState("");
  const overlayRef = useRef();
  //selector
  const isShow = useSelector(selectIsShow);
  const loginUserInfor = useSelector(selectLoginUserInfor);
  const preAvatar = useSelector(selectPreAvatar);
  const allUsers = useSelector(selectAllUsers);
  const isLoad=useSelector(selectLoad)
  // Lọc người dùng với docId
  const filterUserLogin = allUsers.find(
    (user) => user.userId === loginUserInfor.userId
  );
  // xử lý click ra ngoài phần tử sẽ qua trở về trang chính
  useEffect(() => {
          if(isShow) document.body.style.overflowY='hidden'
    window.onclick = function (event) {
      if (overlayRef.current) {
        if (overlayRef.current === event.target) {
          dispatch(OFF_BOX_CREATE_POST());
          setLinkPreview('')
          document.body.style.overflowY='auto'
        }
      }
    };
  });
   // Xử lý 
  const handlePhotoPreview = (e) => {
    const photoUrlPreview = URL.createObjectURL(e.target.files[0]);
    setLinkPreview({
      link: photoUrlPreview,
      type: e.target.files[0].type.slice(0, 5),
    });
    dispatch(
      GET_PRE_AVATAR({
        link: photoUrlPreview,
        type: e.target.files[0].type.slice(0, 5),
        linkUpToFirebaseStorage: e.target.files[0],
      })
    );
  };
  const handleBackToSelectAgain = () => {
    setLinkPreview("");
  };
  // dữ liệu cần thiết để đưa lên firebase
  const postData = {
    userId: loginUserInfor.userId,
    userName: loginUserInfor.name,
    message: input,
    avatar: loginUserInfor.avatar,
    postPictureUpToFirebaseStorage: preAvatar.linkUpToFirebaseStorage,
    type: preAvatar.type,
  };
  // xử lý dispatch hành động đưa ảnh lên firebase
  const handlePost = () => {
    setLinkPreview('')
    dispatch(
      addPostToFirebase(
        postData,
        filterUserLogin.docId,
        filterUserLogin.postsNumber
      )
    );
  dispatch(OFF_BOX_CREATE_POST())
  setInput('')
  };
  return (
    <>
      {isLoad?<>
       <UpLoadPost/>
      </>:
        <>
      {isShow && (
        <div className="">
          <div className="fixed  flex justify-center items-center  top-0 right-0 bottom-0 left-0 z-30  bg-overlayColor mix-blend-multiply  "></div>
          <div
            ref={overlayRef}
            className="fixed flex z-50 top-0 right-0 left-0 bottom-0 justify-center items-center"
          >
            <div className="absolute right-4 top-4 ">
              <CgClose className="text-4xl cursor-pointer  text-whiteColor" />
            </div>
            <div className="w-[500px]  flex flex-col overflow-hidden animate-scale  rounded-xl z-50 m-auto absolute bg-whiteColor h-[540px]">
              {linkPreview ? (
                <div className="flex items-center flex-col  h-full">
                  <div className="w-full">
                    <div className="flex justify-between items-center py-2 px-3">
                      <span
                        onClick={handleBackToSelectAgain}
                        className="text-2xl cursor-pointer"
                      >
                        <BiArrowBack />
                      </span>
                      <span
                        onClick={handlePost}
                        className="font-medium text-blueColor cursor-pointer"
                      >
                        Post
                      </span>
                    </div>

                    <div className="px-2 mt-5">
                      <div className="flex items-center gap-x-2  ">
                        <img
                          className="w-8 h-8  rounded-full"
                          src={loginUserInfor.avatar}
                          alt=""
                        />
                        <span className="font-medium text-sm">
                          {loginUserInfor.name}
                        </span>
                      </div>
                      <div>
                        <textarea
                          autoFocus
                          value={input}
                          onChange={(e) => {
                            setInput(e.target.value);
                          }}
                          className="border-0 w-full pt-2 outline-none"
                          placeholder="Viết chú thích"
                        />
                      </div>
                    </div>
                  </div>

                  {preAvatar.type === "image" && (
                    <img
                      className=" object-contain  max-w-full mt-5 "
                      src={preAvatar.link}
                      alt=""
                    />
                  )}
                  {preAvatar.type === "video" && (
                    <video width="500" controls className="mt-5">
                      <source src={preAvatar.link} type="video/mp4" />
                    </video>
                  )}
                </div>
              ) : (
                <div className="h-full flex flex-col">
                  <div className="text-center py-2 border-b border-borderColor font-medium">
                    Tạo bài viết mới
                  </div>
                  <div className="flex flex-col items-center justify-center gap-y-5  grow">
                    <ImFilePicture className="text-7xl" />
                    <span className="text-xl font-light">
                      Kéo ảnh và video vào đây
                    </span>
                    <input
                      className=" hidden"
                      onChange={(e) => {
                        handlePhotoPreview(e);
                      }}
                      id="file-upload"
                      type="file"
                    />
                    <label
                      className="cursor-pointer py-2 px-2 text-sm rounded leading-none text-whiteColor font-medium bg-[#0095f6]"
                      htmlFor="file-upload"
                    >
                      Chọn từ máy tính
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>}
    </>
  );
}

export default CreatePost;
