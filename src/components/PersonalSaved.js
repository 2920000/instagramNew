import React from "react";
import { BsBookmark } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { selectAllUsers } from "../features/usersSilce";
import { useSelector } from "react-redux";
function PersonalSaved() {
  const { userId } = useParams();
  const allUsers = useSelector(selectAllUsers);
  const filterPostsSavedById = allUsers.find(
    (user) => user.userId === userId
  ).postsSaved;

  return (
    <>
      {filterPostsSavedById.length > 0 ? (
        <> <div className="flex justify-between mb-3">
        <p className="text-xs text-gray font-light">
          Chỉ mình bạn có thể xem mục mình đã lưu
        </p>
        <p className="text-[#0095f6] font-medium text-sm cursor-pointer">
          + Bộ sưu tập mới
        </p>
      </div>
      <div className="grid grid-cols-3 gap-6 ">
          {filterPostsSavedById.map((post) => (
            <div key={post.postId}>
              <img
                className="w-full h-[300px] object-cover  "
                src={post.pictureOrVideoOfPost}
                alt=""
              />
            </div>
          ))}
        </div>
      </>
        
      ) : (
        <div className="flex flex-col space-y-10 py-5  ">
          <div className="flex justify-between">
            <p className="text-xs text-gray font-light">
              Chỉ mình bạn có thể xem mục mình đã lưu
            </p>
            <p className="text-[#0095f6] font-medium text-sm  cursor-pointer">
              + Bộ sưu tập mới
            </p>
          </div>
          <div className="flex flex-col space-y-5 items-center">
            <div className="text-2xl rounded-full border-2 border-black p-4">
              <BsBookmark />
            </div>
            <span className="text-3xl font-light">Lưu</span>
            <p className="max-w-[360px] text-center text-sm">
              Lưu ảnh và video mà bạn muốn xem lại. Sẽ không có ai được thông
              báo và chỉ mình bạn có thể xem nội dung mình đã lưu.
            </p>
          </div>
          <div></div>
        </div>
      )}
    </>
  );
}

export default PersonalSaved;
