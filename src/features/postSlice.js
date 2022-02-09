
import {createSlice} from '@reduxjs/toolkit'
import {collection,serverTimestamp,addDoc} from 'firebase/firestore'
import {ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage'
import { storage } from '../configFirebase'
import { db } from '../configFirebase'
import {v4 as uuid} from 'uuid'

const initialState={
     preAvatar:'',
     load:false
}

const postSlice= createSlice({
    name:'post',
    initialState,
    reducers:{
    GET_PRE_AVATAR:(state,action)=>{
       state.preAvatar=action.payload
    },
    ADD_POST_REQUEST:(state,action)=>{
         state.load=true
    },
    ADD_POST_SUCCESS:(state,action)=>{
         state.load=false
    }    
    }
})

export default postSlice.reducer
// actions
export const {GET_PRE_AVATAR,ADD_POST_REQUEST,ADD_POST_SUCCESS} =postSlice.actions
// select
export const  selectPreAvatar=state=>state.post.preAvatar
export const selectLoad=state=>state.post.load
// async action thêm post vào firebase
export const addPostToFirebase=(postData)=>async(dispatch)=>{
             
    dispatch(ADD_POST_REQUEST(true))
       const storageRef=ref(storage,`${postData.type}`+postData.postPictureUpToFirebaseStorage.name)
       const uploadTask=uploadBytesResumable(storageRef,postData.postPictureUpToFirebaseStorage)
       uploadTask.on(
         'state_changed',
         (snapshot)=>{
         },
         (err)=>{
           console.log(err)
         },
         ()=>{
           getDownloadURL(uploadTask.snapshot.ref)
           .then(downloadURL=>{      
                addDoc(collection(db,'posts'),{
                     userId:postData.userId,
                     postId:uuid(),
                     userName:postData.userName,
                     avatar:postData.avatar,
                     message:postData.message,
                     pictureOrVideoOfPost:downloadURL,
                     timestamp:serverTimestamp(),
                     love:[],
                     comments:[],
                     type:postData.type
                })
               dispatch(ADD_POST_SUCCESS(false))
           })
         }
       
       )
     
}