import { createSlice } from "@reduxjs/toolkit";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../configFirebase";
import { v4 as uuid } from "uuid";
import moment from "moment";
const initialState = {
  allPosts: [],
  AdjustPost: {
    isShowOverlay: false,
    docIdToDelete: "",
    userIdOfPost: "",
    docIdToUpdateNumberPosts: "",
    prePostsNumberOfUser: "",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    GET_ALL_POSTS: (state, action) => {
      state.allPosts = action.payload;
    },
    ADJUST_POST: (state, action) => {
      state.AdjustPost = action.payload;
    },
  },
});

export default postsSlice.reducer;
// actions
export const { GET_ALL_POSTS, ADJUST_POST } = postsSlice.actions;
// select
export const selectAllPosts = (state) => state.posts.allPosts;
export const selectAdjustPost = (state) => state.posts.AdjustPost;
// async action
export const getPostsFromFirebase = () => async (dispatch) => {
  const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
  onSnapshot(q, (postsDocs) => {
    const allPosts = postsDocs.docs.map((doc) => ({
      ...doc.data(),
      docId: doc.id,
    }));
    dispatch(GET_ALL_POSTS(allPosts));
  });
  //  const querySnapshot= await getDocs(collection(db,'posts'))
  //  const allPosts=querySnapshot.docs.map(doc=>({...doc.data(),docId:doc.id}))
  //  dispatch(GET_ALL_POSTS(allPosts))
};
// xử lý love bài viết
export const actionHandleLoved =
  (docId, love, loginUserInfor) => async (dispatch) => {
    const checkLoved = love.every(
      (userLoved) => userLoved.userIdLoved !== loginUserInfor.userId
    );
    if (checkLoved) {
      updateDoc(doc(db, "posts", docId), {
        love: [
          ...love,
          {
            userIdLoved: loginUserInfor.userId,
            userName: loginUserInfor.name,
          },
        ],
      });
    } else {
      const indexOfUserLoved = love.map((userLoved, index) => {
        if (userLoved.userIdLoved === loginUserInfor.userId) {
          return index;
        }
      });
      const filterIndex = indexOfUserLoved.find((index) => index !== undefined);
      // copy lại array love cũ để splice không sẽ lỗi
      const loveCopy = [...love];
      loveCopy.splice(filterIndex, 1);
      updateDoc(doc(db, "posts", docId), {
        love: [...loveCopy],
      });
    }
  };
// xử lý submit comment bài viết
export const actionHandleSubmitComment =
  (preComments, docId, loginUserInfor, message) => async (dispatch) => {
    updateDoc(doc(db, "posts", docId), {
      comments: [
        ...preComments,
        {
          commentId: uuid(),
          avatar: loginUserInfor.avatar,
          name: loginUserInfor.name,
          comment: message,
          createAt: moment().format(),
        },
      ],
    });
  };
// xử lý lưu bài viết muốn lưu
export const actionHandleSavePost =
  (pictureOrVideoOfPost, postId, docId, postsSaved) => async (dispatch) => {
    const checkPostsSavedExist = postsSaved.every(
      (post) => post.postId !== postId
    );
    if (checkPostsSavedExist) {
      updateDoc(doc(db, "users", docId), {
        postsSaved: [
          ...postsSaved,
          { postId: postId, pictureOrVideoOfPost: pictureOrVideoOfPost },
        ],
      });
    } else {
      const indexOfPostsSaved = postsSaved.map((postsSaved, index) => {
        if (postsSaved.postId === postId) {
          return index;
        }
      });
      const filterIndex = indexOfPostsSaved.find(
        (index) => index !== undefined
      );
      // copy lại array love cũ để splice không sẽ lỗi
      const postsSavedCopy = [...postsSaved];
      postsSavedCopy.splice(filterIndex, 1);
      updateDoc(doc(db, "users", docId), {
        postsSaved: [...postsSavedCopy],
      });
    }
  };

// xử lý xóa bài viết của bản thân
export const actionHandleDeletePost =
  (docId, docIdToUpdateNumberPosts, prePostsNumberOfUser) => async () => {
    deleteDoc(doc(db, "posts", docId));
    document.body.style.overflowY = "auto";
    updateDoc(doc(db, "users", docIdToUpdateNumberPosts), {
      postsNumber: prePostsNumberOfUser - 1,
    });
  };
