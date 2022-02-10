import { async } from '@firebase/util'
import {createSlice} from '@reduxjs/toolkit'
import { collection, onSnapshot, orderBy, query,updateDoc,doc } from 'firebase/firestore'
import { db } from '../configFirebase'
import { v4 as uuid } from "uuid";
import moment from "moment";
const initialState={
    allPosts:[]
}

const postsSlice=createSlice({
    name:'posts',
    initialState,
    reducers:{
    GET_ALL_POSTS:(state,action)=>{
         state.allPosts=action.payload
    }
    }
})

export default postsSlice.reducer
// actions
export const {GET_ALL_POSTS} =postsSlice.actions
// select
export const selectAllPosts=state=>state.posts.allPosts
// async action
export const getPostsFromFirebase=()=>async(dispatch)=>{
    const q=query(collection(db,'posts'),orderBy('timestamp','desc'))
    onSnapshot(q,postsDocs=>{
        const allPosts=postsDocs.docs.map(doc=>({...doc.data(),docId:doc.id}))
        dispatch(GET_ALL_POSTS(allPosts))
    })
}
export const actionHandleLoved=(docId, love,loginUserInfor)=>async(dispatch)=>{

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
        // copy lại array love cũ để splice không sẽ lỗi
        const loveCopy = [...love];
        loveCopy.splice(indexOfUserLoved[0], 1);
        updateDoc(doc(db, "posts", docId), {
          love: [...loveCopy],
        });
      }
}

export const actionHandleSubmitComment=( preComments, docId,loginUserInfor,message)=>async(dispatch)=>{
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
}

