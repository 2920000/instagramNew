import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllUserExceptLoginUser } from "../features/usersSilce";
import { selectLoginUserFullData } from "../features/usersSilce";
function AllUserSuggested() {
  const allUserExceptLoginUser = useSelector(selectAllUserExceptLoginUser);
  const loginUserFullData=useSelector(selectLoginUserFullData)
  if (allUserExceptLoginUser) {
    // docId  user đang đăng nập
    return (
      <div>
        <div className="max-w-[600px] m-auto mt-[100px]">
          <p className="font-medium mb-2 ml-2 ">Gợi ý</p>
          <div className="w-full rounded-sm bg-whiteColor ">
            {allUserExceptLoginUser.map((user) => (
              <div
                className="flex items-center justify-between px-3 py-2"
                key={user.userId}
              >
                <div className="flex items-center gap-x-2">
                  <div>
                    <img
                      className="w-10 h-10 cursor-pointer rounded-full"
                      src={user.avatar}
                      alt=""
                    />
                  </div>
                  <span className="text-sm cursor-pointer font-medium">
                    {user.userName}
                  </span>
                </div>

                <div>
                  {loginUserFullData.following.every(followingUser=>followingUser.userId!==user.userId) ? (
                    <span className="rounded py-1.5 px-3  bg-[#0095f6] text-sm font-medium cursor-pointer text-whiteColor">
                      Theo dõi
                    </span>
                  ) : (
                    <div className="">
                      <span className="py-1 px-2.5 text-sm font-medium rounded border cursor-pointer border-borderColor">
                        Đang theo dõi
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return "";
  }
}

export default AllUserSuggested;
