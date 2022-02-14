import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { db } from "../configFirebase";
import { selectLoginUserFullData } from "../features/usersSilce";
import { useSelector } from "react-redux";
import { FiSmile } from "react-icons/fi";
import { v4 as uuid } from "uuid";
function MessagesById() {
  const { messagesId } = useParams();
  const [messageById, setMessageById] = useState({});
  const [input, setInput] = useState("");
  const scrollRef = useRef();
  const loginUserFullData = useSelector(selectLoginUserFullData);
  useEffect(() => {
    onSnapshot(collection(db, "chatBoxes"), (chatBoxesDocs) => {
      const allChatBoxes = chatBoxesDocs.docs.map((chatBox) => ({
        ...chatBox.data(),
        docId: chatBox.id,
      }));
      const filterMessageById = allChatBoxes.find(
        (chatBox) => chatBox.boxId === messagesId
      );
      setMessageById(filterMessageById);
    });
  }, [messagesId]);
  const handleSubmitMessage = (e, user) => {
    e.preventDefault();
    updateDoc(doc(db, "chatBoxes", messageById.docId), {
      messages: [
        ...messageById.messages,
        {
          messageId: uuid(),
          userId: user.userId,
          avatar: user.avatar,
          userName: user.userName,
          message: input,
        },
      ],
    });
    setInput("");

    // const height=document.getElementById('scroll').scrollHeight
    scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  if (messageById.docId) {
    const arrayUser = [messageById.user1, messageById.user2];
    // lọc ra user không phải người dùng
    const filterUser = arrayUser.find(
      (user) => user.userId !== loginUserFullData.userId
    );
    // lọc ra user đang dùng ứng dụng
    const filterUser1 = arrayUser.find(
      (user) => user.userId === loginUserFullData.userId
    );

    return (
      <div className="flex flex-col w-full">
        <div className="flex  w-full items-center gap-x-3 py-4 pl-10 border-b border-borderColor">
          <img className="rounded-full w-8" src={filterUser.avatar} alt="" />
          <span className="font-medium text-sm">{filterUser.userName}</span>
        </div>
        <div
          id="scroll"
          className="grow overflow-y-auto p-5 
            "
        >
          {messageById.messages.map((messageOfUser) => (
            <div
              className={`flex w-full gap-x-2 mb-3 ${
                messageOfUser.userId === loginUserFullData.userId
                  ? "justify-end"
                  : ""
              } `}
              key={messageOfUser.messageId}
            >
              <img
                className={`rounded-full ${
                  messageOfUser.userId === loginUserFullData.userId
                    ? "hidden"
                    : ""
                } w-10`}
                src={messageOfUser.avatar}
                alt=""
              />
              <span
                className={`py-2 px-3 ${
                  messageOfUser.userId === loginUserFullData.userId
                    ? " bg-greyLightColor text-sm"
                    : ""
                } rounded-[30px] border border-borderColor`}
              >
                {messageOfUser.message}
              </span>
            </div>
          ))}
          <div ref={scrollRef} className=""></div>
        </div>

        <form className="px-8 py-5 flex relative items-center  w-full">
          <div className=" flex relative items-center border px-2 border-borderColor rounded-[35px]  w-full ">
            <span className="p-2">
              <FiSmile className=" left-[50px]  text-2xl" />
            </span>
            <input
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              className="p-2.5  outline-none w-full bg-[#fafafa] text-sm"
              placeholder="Nhắn tin..."
            />
            <button
              className="text-sm disabled:hidden  font-medium text-textFollowColor p-2 cursor-pointer  "
              disabled={!input}
              onClick={(e) => {
                handleSubmitMessage(e, filterUser1);
              }}
            >
              Gửi
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    return "";
  }
}

export default MessagesById;
