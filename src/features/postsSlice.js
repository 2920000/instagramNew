import { async } from '@firebase/util'
import {createSlice} from '@reduxjs/toolkit'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../configFirebase'

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