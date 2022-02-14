import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../configFirebase";
import { createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
const initialState = {
  boxId: undefined,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    GET_BOXID: (state, action) => {
      state.boxId = action.payload;
    },
  },
});

export default chatSlice.reducer;
export const selectBoxId = (state) => state.chat.boxId;
export const { GET_BOXID } = chatSlice.actions;

export const actionNavigateToChatBox =
  (loginUserFullData, filterUserById, navigate) => async (dispatch) => {
    // console.log(loginUserFullData)
    // console.log(filterUserById)

    const checkBoxIdExist = loginUserFullData.chatBoxes.every(
      (chatBox) => chatBox.userId !== filterUserById.userId
    );
    if (checkBoxIdExist) {
      const newBoxId = uuid();
      addDoc(collection(db, "chatBoxes"), {
        user1: {
          userId: loginUserFullData.userId,
          userName: loginUserFullData.userName,
          avatar: loginUserFullData.avatar,
        },
        user2: {
          userId: filterUserById.userId,
          userName: filterUserById.userName,
          avatar: filterUserById.avatar,
        },
        boxId: newBoxId,
        messages: [],
      });
      updateDoc(doc(db, "users", loginUserFullData.docId), {
        chatBoxes: [
          ...loginUserFullData.chatBoxes,
          {
            boxId: newBoxId,
            userId: filterUserById.userId,
            userName: filterUserById.userName,
            avatar: filterUserById.avatar,
          },
        ],
      });
      updateDoc(doc(db, "users", filterUserById.docId), {
        chatBoxes: [
          ...filterUserById.chatBoxes,
          {
            boxId: newBoxId,
            userId: loginUserFullData.userId,
            userName: loginUserFullData.userName,
            avatar: loginUserFullData.avatar,
          },
        ],
      });
      dispatch(GET_BOXID(newBoxId));

      navigate(`/chat/${loginUserFullData.userId}/${newBoxId}`);
    } else {
      const findBoxIdExist = loginUserFullData.chatBoxes.find(
        (chatBox) => chatBox.userId === filterUserById.userId
      ).boxId;
      dispatch(GET_BOXID(findBoxIdExist));
    }
  };
