import {createSlice} from '@reduxjs/toolkit'

const initialState={
   unfollowBoxWithOverlay:{
       isShow:false,
       dataUserToUnfollow:{},
       dataToUpdateFollowStatus:{}
   }
}

const followSlice= createSlice({
    name:'follow',
    initialState,
    reducers:{
    UNFOLLOW_BOX:(state,action)=>{
     state.unfollowBoxWithOverlay=action.payload
    }
    }
})

export default followSlice.reducer
export const selectUnfollow=state=>state.follow.unfollowBoxWithOverlay
export const {UNFOLLOW_BOX} =followSlice.actions