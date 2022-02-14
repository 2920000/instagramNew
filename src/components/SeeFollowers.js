import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectAllUsers } from "../features/usersSilce";
import { GrClose } from "react-icons/gr";
import { selectFollowersBoxStatus } from "../features/followSlice";
import { SEE_FOLLOWERS } from "../features/followSlice";
function SeeFollowers() {
  const dispatch = useDispatch();
  const allUsers = useSelector(selectAllUsers);
  const followersBoxStatus = useSelector(selectFollowersBoxStatus);
  const url = useLocation().pathname;
  const filterUserById = allUsers.find((user) => `/${user.userId}` === url);
  const moduleRef = useRef();
  useEffect(() => {
    if (followersBoxStatus) document.body.style.overflowY = "hidden";
    else document.body.style.overflowY = "auto";
    const event = window.addEventListener("mousedown", (event) => {
      if (event.target === moduleRef.current) {
        dispatch(SEE_FOLLOWERS(false));
      }
    });
    return () => {
      window.removeEventListener("mousedown", event);
    };
  });
  const handleOffBox = () => {
    dispatch(SEE_FOLLOWERS(false));
  };
  return (
    <>
      {filterUserById ? (
        <>
          {followersBoxStatus && (
            <div>
              <div className="fixed top-0 right-0 left-0 bottom-0 bg-overlayLightColor  mix-blend-multiply z-40 "></div>
              <div
                ref={moduleRef}
                className="fixed top-0 right-0 left-0 bottom-0 animate-scale   flex justify-center items-center z-50 "
              >
                <div className="w-[400px] h-[380px] bg-whiteColor flex flex-col rounded-xl">
                  <p className="py-2 text-center border-b border-borderColor relative font-medium ">
                    {" "}
                    Người theo dõi{" "}
                    <span
                      onClick={handleOffBox}
                      className="absolute right-[12px] text-2xl cursor-pointer "
                    >
                      <GrClose />
                    </span>
                  </p>
                  <div className="flex grow overflow-y-auto flex-col ">
                    {filterUserById.followers.map((user) => (
                      <div
                        className="flex justify-between py-2 px-3 "
                        key={user.userId}
                      >
                        <div className="flex items-center  gap-x-2">
                          <img
                            className="w-8 rounded-full"
                            src={user.avatar}
                            alt=""
                          />
                          <span className="text-sm font-medium hover:underline hover:underline-offset-0 cursor-pointer">
                            {user.userName}
                          </span>
                        </div>
                        <div className="text-sm cursor-pointer font-medium py-1 px-2 rounded border border-borderColor">
                          Xóa
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default SeeFollowers;
