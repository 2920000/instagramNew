import React from "react";
import { useParams, Outlet, useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsChevronDown } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import { selectLoginUserFullData } from "../features/usersSilce";
function ChatBox() {
  const { userId } = useParams();
  const url = useLocation().pathname;
  const subLink = `/chat/${userId}/`;

  const loginUserFullData = useSelector(selectLoginUserFullData);

  if (loginUserFullData.chatBoxes) {
    return (
      <div className="mt-12">
        <div className="max-w-[940px] m-auto h-[85vh] rounded flex border border-borderColor  ">
          <div className="flex w-[350px] flex-col">
            <div className="flex justify-center border-b border-borderColor">
              <div className="py-5  font-medium flex items-center gap-x-2  ">
                {loginUserFullData.userName}{" "}
                <BsChevronDown className="cursor-pointer text-xl" />
              </div>
            </div>
            <div>
              {loginUserFullData.chatBoxes.map((chatBox) => (
                <Link
                  to={`/chat/${userId}/${chatBox.boxId}`}
                  className={`flex ${
                    url === `${subLink}${chatBox.boxId}`
                      ? "bg-greyLightColor"
                      : ""
                  } items-center gap-x-2 py-1.5 px-5 `}
                  key={chatBox.boxId}
                >
                  <img
                    className="w-14 rounded-full"
                    src={chatBox.avatar}
                    alt=""
                  />
                  <span>{chatBox.userName}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex grow h-full border-l border-borderColor ">
            {`${url}/` !== subLink ? (
              <Outlet />
            ) : (
              <div className="flex w-full h-full flex-col justify-center items-center">
                <div className=" p-5 rounded-full border-[3px] border-[black]">
                  <FiSend className="text-5xl" />
                </div>
                <p className="text-2xl font-light py-1">Tin nhắn của bạn</p>
                <p className="text-greyColor text-sm">
                  Gửi ảnh và tin nhắn riêng tư cho bạn bè hoặc nhóm.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return "";
  }
}

export default ChatBox;
