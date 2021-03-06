import React, { memo, useEffect, useState, useRef } from "react";
import { AiFillHome, AiOutlineHeart } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import { BiMessageSquareAdd } from "react-icons/bi";
import { ImCompass2 } from "react-icons/im";
import { HiOutlineSearch, HiOutlineSwitchHorizontal } from "react-icons/hi";
import { IoPersonCircleSharp, IoCloseCircle } from "react-icons/io5";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { RiSettings3Line } from "react-icons/ri";
import { BiHomeCircle } from "react-icons/bi";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { selectLoginUserInfor } from "../features/loginSlice";
import { SHOW_BOX_CREATE_POST } from "../features/postSlice";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import SearchUser from "./SearchUser";

function MainHeader() {
  const dispatch = useDispatch();
  const pathname = useLocation().pathname;
  const subPathnameOfChat = pathname.slice(0, 5);
  const subPathnameOfExplore = pathname.slice(0, 8);
  const auth = getAuth();
  const [boxLogOut, setBoxLogOut] = useState(false);
  const [borderAvatar, setBorderAvatar] = useState(false);
  const [input, setInput] = useState("");
  const [searchBox, setSearchBox] = useState(false);
  const [closeIcon, setCloseIcon] = useState(false);
  const logOutBoxRef = useRef();
  const searchBoxRef = useRef();
  // Lấy thông tin user đang đăng nhập
  const loginUserInfor = useSelector(selectLoginUserInfor);
  // Xử lý đăng xuất
  const handleLogOut = () => {
    signOut(auth);
  };
  // Xử lý toggle box đăng xuất với animation
  const handleToggleBoxLogOut = () => {
    if (logOutBoxRef.current) {
      logOutBoxRef.current.style.opacity = "0";
      logOutBoxRef.current.style.transform = "translateY(0)";
      setTimeout(() => {
        setBoxLogOut(false);
        setBorderAvatar(false);
      }, 100);
    } else {
      setBoxLogOut(true);
      setBorderAvatar(true);
    }
  };
  // Xử lý click ra ngoài phần tử
  useEffect(() => {
    window.onclick = function (event) {
      const avatar = document.getElementById("avatar");
      if (logOutBoxRef.current) {
        if (
          event.target !== avatar &&
          !logOutBoxRef.current.contains(event.target)
        ) {
          logOutBoxRef.current.style.opacity = "0";
          logOutBoxRef.current.style.transform = "translateY(0)";
          setTimeout(() => {
            setBoxLogOut(false);
            setBorderAvatar(false);
          }, 100);
        }
      }
    };
  });
  // xử lý ẩn thanh scroll body
  const handleShowBoxCreatePost = () => {
    dispatch(SHOW_BOX_CREATE_POST());
    document.body.style.overflowY = "hidden";
  };
  const handleOffBoxWhenClick = () => {
    setBoxLogOut(false);
    setBorderAvatar(false);
  };
  const handeShowSearchBox = () => {
    setSearchBox(true);
    setCloseIcon(true);
  };
  const handleCloseSearchBoxByIcon = () => {
    setSearchBox(false);
    setCloseIcon(false);
    setInput("");
  };
  return (
    <>
      <div className="h-[60px] border-b border-borderColor fixed  w-full z-20  bg-whiteColor ">
        <div className=" relative  max-w-5xl m-auto h-full   flex items-center px-10  ">
          <div className="min-w-[120px] flex justify-start grow basis-[127px] w-full ">
            <Link to="/">
              {" "}
              <img
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />
            </Link>
          </div>
          <div className="  hidden sm:block  ">
            <div
              ref={searchBoxRef}
              className="flex grow items-center relative px-10 py-1 bg-greyLightColor rounded-md  "
            >
              <HiOutlineSearch className="absolute left-3 text-lg text-greyColor " />
              <input
                onClick={handeShowSearchBox}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                className=" w-full border-none outline-none h-7  rounded-md bg-greyLightColor font-light "
                placeholder="Tìm kiếm"
              />
              {closeIcon && (
                <IoCloseCircle
                  onClick={handleCloseSearchBoxByIcon}
                  className="text-greyColor cursor-pointer text-lg absolute right-3"
                />
              )}
              <SearchUser
                input={input}
                setInput={setInput}
                searchBoxstatus={searchBox}
                setSearchBox={setSearchBox}
                searchBoxRef={searchBoxRef}
                setCloseIcon={setCloseIcon}
              />
            </div>
          </div>
          <div className="w-full justify-end flex grow basis-[127px] ">
            <div className="flex space-x-6 text-2xl items-center pl-5 ">
              <Link to="/">
                {pathname === "/" ? (
                  <BiHomeCircle className="cursor-pointer text-[27px] text-blueColor " />
                ) : (
                  <>
                    <BiHomeCircle className="cursor-pointer text-[27px]  " />
                  </>
                )}
              </Link>
              <Link to={`chat/${loginUserInfor.userId}`}>
                {subPathnameOfChat === `/chat` ? (
                  <FiSend className="cursor-pointer text-blueColor " />
                ) : (
                  <FiSend className="cursor-pointer " />
                )}
              </Link>
              <BiMessageSquareAdd
                onClick={handleShowBoxCreatePost}
                className="cursor-pointer"
              />
              <Link to="/explore/">
                {subPathnameOfExplore === "/explore" ? (
                  <ImCompass2 className="cursor-pointer text-blueColor " />
                ) : (
                  <ImCompass2 className="cursor-pointer" />
                )}
              </Link>
              <AiOutlineHeart className="text-[28px] cursor-no-drop" />

              <div className="">
                {borderAvatar && (
                  <div
                    className={
                      "outline-1  w-6 h-6 z-[-1] absolute outline-black outline outline-offset-2 rounded-full p-[1px]"
                    }
                  ></div>
                )}
                <img
                  onClick={handleToggleBoxLogOut}
                  id="avatar"
                  className="w-6 h-6 rounded-full  cursor-pointer  outline  outline-1  outline-greyColor"
                  src={loginUserInfor.avatar}
                  alt=""
                />
                {boxLogOut && (
                  <div
                    ref={logOutBoxRef}
                    className="box  absolute right-[15px] transition-all duration-100     translate-y-3 opacity-100 w-[230px] rounded h-4xl list-none bg-whiteColor  shadow-[0px_0px_3px_grey] "
                  >
                    <Link to={`${loginUserInfor.userId}`}>
                      <li
                        onClick={handleOffBoxWhenClick}
                        className="py-2 pl-4 flex items-center gap-x-3 text-sm hover:bg-greyLightColor cursor-pointer"
                      >
                        <IoPersonCircleSharp className="text-lg " />
                        Trang cá nhân
                      </li>
                    </Link>
                    <li className="py-2 pl-4 flex items-center gap-x-3 text-sm  hover:bg-greyLightColor cursor-pointer">
                      <MdOutlineBookmarkBorder className="text-lg " />
                      Đã lưu
                    </li>
                    <li className="py-2 pl-4 flex items-center gap-x-3 text-sm  hover:bg-greyLightColor cursor-pointer">
                      <RiSettings3Line className="text-lg " />
                      Cài đặt
                    </li>
                    <li className="py-2 pl-4 flex items-center gap-x-3 text-sm  hover:bg-greyLightColor cursor-pointer">
                      <HiOutlineSwitchHorizontal className="text-lg " />
                      Chuyển tài khoản
                    </li>
                    <li
                      onClick={handleLogOut}
                      className="py-2 pl-4 border-t-2 border-borderColor text-sm    hover:bg-greyLightColor cursor-pointer"
                    >
                      Đăng xuất
                    </li>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
}

export default memo(MainHeader);
