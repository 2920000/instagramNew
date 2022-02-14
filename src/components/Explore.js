import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts } from "../features/postsSlice";
import { FaHeart } from "react-icons/fa";
import { AiTwotoneMessage } from "react-icons/ai";
import { Link } from "react-router-dom";
function Explore() {
  const dispatch = useDispatch();
  const allPosts = useSelector(selectAllPosts);
  const n = 3;
  const result = new Array(Math.ceil(allPosts.length / n)).fill();
  // .map(_=>allPosts.splice(0,n))
  console.log(result);
  return (
    <div className="mt-[50px] max-w-[945px] grid grid-cols-3 gap-7 m-auto">
      {allPosts.map((post) => (
        <Link
          to={`/post/${post.postId}`}
          key={post.postId}
          className="relative"
        >
          {post.type === "image" ? (
            <div className="col-span-1">
              <img
                className="w-full aspect-square object-cover cursor-pointer "
                src={post.pictureOrVideoOfPost}
                alt=""
              />
            </div>
          ) : (
            <div className="col-span-2">
              <video controls className="w-full  aspect-square cursor-pointer ">
                <source src={post.pictureOrVideoOfPost} type="video/mp4" />
              </video>
            </div>
          )}
          <div className="opacity-0 hover:opacity-100">
            <div className="absolute top-0 right-0 left-0 bottom-0 x-40 bg-greyColor mix-blend-multiply"></div>
            <div className="absolute top-0 right-0 hover: cursor-pointer left-0 bottom-0 z-50 flex gap-x-8 justify-center items-center ">
              <span className="flex text-whiteColor gap-x-2 items-center text-lg">
                <FaHeart />
                {post.love.length}
              </span>
              <span className="flex text-whiteColor gap-x-2 items-center text-lg">
                <AiTwotoneMessage />
                {post.comments.length}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Explore;
