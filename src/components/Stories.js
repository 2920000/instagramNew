import React, { memo } from "react";
import { useSelector } from "react-redux";
import { selectLoginUserFullData } from "../features/usersSilce";
function Stories() {
  const allFollowingUser = useSelector(selectLoginUserFullData);

  return (
    <div className="w-full bg-whiteColor border relative border-borderColor ">
      <div className="flex px-5 py-3">
        <div className="flex gap-x-1 cursor-pointer space-y-1    items-center">
          {allFollowingUser.following.slice(0, 7).map((user) => (
            <div
              key={user.userId}
              className="flex flex-col justify-center items-center"
            >
              <span>
                <img
                  className="w-14 h-14 rounded-full shadow-inner object-cover outline outline-[#e45478] p-[1.5px] "
                  src={user.avatar}
                  alt=""
                />
              </span>
              <div className="text-xs w-[70px] mt-2 text-center text-ellipsis whitespace-nowrap overflow-hidden">
                {user.userName}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="opacity-0 hover:opacity-100">
        <div className="absolute top-0 right-0 bottom-0 left-0  mix-blend-multiply bg-greyColor"></div>
        <div className="absolute top-0 right-0 bottom-0 left-0 cursor-not-allowed  flex justify-center items-center ">
          <span className="font-medium text-whiteColor text-lg">
            Chức năng tạm thời chưa phát triển
          </span>
        </div>
      </div>
    </div>
  );
}

export default memo(Stories);
