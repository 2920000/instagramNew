import { async } from '@firebase/util'
import {createSlice} from '@reduxjs/toolkit'
import {collection, onSnapshot} from 'firebase/firestore'
import { db } from '../configFirebase'

export const getUsersFromFirebase=()=>async(dispatch)=>{
    // lấy xuống tất cả user kèm vs docId để cập nhật
    onSnapshot(collection(db,'users'),usersDocs=>{
        const allUsers= usersDocs.docs.map(doc=>({...doc.data(),docId:doc.id}))
       dispatch(GET_ALL_USERS(allUsers))
   })
}

const initialState={
    allUsers:[],
}
const usersSlice=createSlice({
    name:'users',
    initialState,
    reducers:{
       GET_ALL_USERS:(state,action)=>{
         state.allUsers=action.payload
       }
    }
})
// reducer
export default usersSlice.reducer
// actions
export const {GET_ALL_USERS} =usersSlice.actions
// selects
export const selectAllUsers=state=>state.users