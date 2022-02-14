import "./App.css";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import Login from "./components/Login";
import MainPage from "./components/MainPage";
import { AiOutlineInstagram } from "react-icons/ai";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { LOGIN_USER_INFOR } from "./features/loginSlice";
import { getUsersFromFirebase } from "./features/usersSilce";
import { getPostsFromFirebase } from "./features/postsSlice";
function App() {
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);
  const dispatch = useDispatch();
  const auth = getAuth();
  // khi load lại trang , lấy dữ liệu từ firebase đổ vào store để dùng

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // khi tồn tại user dispatch mọi dự liệu cần thiết để sử dụng toàn cục
        dispatch(getUsersFromFirebase(user.uid));
        dispatch(getPostsFromFirebase());
        // một số thông tin cần thiết của user đang đăng nhập
        const loginUserInfor = {
          userId: user.uid,
          name: user.displayName,
          avatar: user.photoURL,
        };
        dispatch(LOGIN_USER_INFOR(loginUserInfor));
        setX(true);
        setY(false);
      } else {
        setY(true);
        setX(false);
      }
    });
  }, []);

  return (
    <>
      {x === null && y === null ? (
        <div className="h-screen flex items-center justify-center">
          <AiOutlineInstagram className=" text-greyColor text-6xl" />
        </div>
      ) : (
        ""
      )}
      {x && <MainPage />}
      {y && <Login />}
    </>
  );
}

export default memo(App);
