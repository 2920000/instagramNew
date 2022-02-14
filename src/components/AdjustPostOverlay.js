import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAdjustPost } from "../features/postsSlice";
import { ADJUST_POST } from "../features/postsSlice";
import { actionHandleDeletePost } from "../features/postsSlice";
import { selectLoginUserInfor } from "../features/loginSlice";
import { useLocation } from "react-router-dom";
function AdjustPostOverlay() {
  const url = useLocation().pathname;
  const dispatch = useDispatch();
  const adjustPostBoxRef = useRef();
  const isAjustPost = useSelector(selectAdjustPost);
  const logginUserInfor = useSelector(selectLoginUserInfor);
  // xử lý click outside
  useEffect(() => {
    if (isAjustPost.isShowOverlay) document.body.style.overflowY = "hidden";
    else document.body.style.overflowY = "auto";
    const event = window.addEventListener("mousedown", (event) => {
      if (event.target === adjustPostBoxRef.current) {
        dispatch(
          ADJUST_POST({
            isShowOverlay: false,
          })
        );
      }
    });
    return () => {
      window.removeEventListener("mousedown", event);
    };
  });

  // xử lý dispatch hành động async xóa bài post
  const handleDeletePost = () => {
    dispatch(
      actionHandleDeletePost(
        isAjustPost.docIdToDelete,
        isAjustPost.docIdToUpdateNumberPosts,
        isAjustPost.prePostsNumberOfUser
      )
    );
    dispatch(
      ADJUST_POST({
        isShowOverlay: false,
      })
    );
    if (url !== "/") window.history.go(-1);
  };

  // xử lý tắt box adjust-post bằng nút hủy
  const handleOffBox = () => {
    dispatch(
      ADJUST_POST({
        isShowOverlay: false,
      })
    );
  };
  return (
    <>
      {isAjustPost.isShowOverlay && (
        <div>
          <div className="">
            <div className="fixed right-0  top-0 bottom-0 left-0 mix-blend-multiply bg-[#000000A6] z-50"></div>
            <div
              ref={adjustPostBoxRef}
              className="fixed right-0 top-0 bottom-0 left-0 flex justify-center items-center z-50 "
            >
              <ul className="w-[410px] rounded-xl animate-scale list-none bg-whiteColor">
                {logginUserInfor.userId === isAjustPost.userIdOfPost ? (
                  <li
                    onClick={handleDeletePost}
                    className="py-3.5 text-center text-sm font-bold cursor-pointer border-b border-borderColor text-[#ED4956] active:bg-greyLightColor rounded-xl"
                  >
                    Xóa
                  </li>
                ) : (
                  <li className="py-3.5 text-center text-sm font-bold cursor-pointer border-b border-borderColor text-[#ED4956] active:bg-greyLightColor rounded-t-xl">
                    Báo cáo
                  </li>
                )}

                <li className="py-3.5 text-center text-sm border-b cursor-pointer border-borderColor active:bg-greyLightColor">
                  Đi tới bài viết
                </li>
                <li className="py-3.5 text-center text-sm border-b cursor-pointer border-borderColor active:bg-greyLightColor">
                  Chia sẻ lên...
                </li>
                <li className="py-3.5 text-center text-sm border-b cursor-pointer border-borderColor active:bg-greyLightColor">
                  Sao chép liên kết
                </li>
                <li className="py-3.5 text-center text-sm border-b cursor-pointer border-borderColor active:bg-greyLightColor">
                  Nhúng
                </li>
                <li
                  onClick={handleOffBox}
                  className="py-3.5 text-center text-sm cursor-pointer rounded-xl active:bg-greyLightColor"
                >
                  Hủy
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AdjustPostOverlay;
