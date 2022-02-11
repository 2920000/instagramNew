import { async } from '@firebase/util'
import {createSlice} from '@reduxjs/toolkit'
import {collection, onSnapshot,updateDoc,doc} from 'firebase/firestore'
import { db } from '../configFirebase'

export const getUsersFromFirebase=(loginUserId)=>async(dispatch)=>{
    // lấy xuống tất cả user kèm vs docId để cập nhật
    onSnapshot(collection(db,'users'),usersDocs=>{
        const allUsers= usersDocs.docs.map(doc=>({...doc.data(),docId:doc.id}))
       dispatch(GET_ALL_USERS(allUsers))
       const getLoginUserFullData=allUsers.find(user=>user.userId===loginUserId)
       dispatch(GET_LOGIN_USER_FULL_DATA(getLoginUserFullData))
       const getUsersExceptLoginUser=allUsers.filter(user=>user.userId!==loginUserId)
       dispatch(GET_USERS_EXCEPT_LOGIN_USER(getUsersExceptLoginUser))
   })
}

const initialState={
    allUsers:[],
    loginUserFullData:{},
    allUsersExceptLoginUser:[]
}
const usersSlice=createSlice({
    name:'users',
    initialState,
    reducers:{
       GET_ALL_USERS:(state,action)=>{
         state.allUsers=action.payload
       },
       GET_LOGIN_USER_FULL_DATA:(state,action)=>{
            state.loginUserFullData=action.payload
       },
       GET_USERS_EXCEPT_LOGIN_USER:(state,action)=>{
              state.allUsersExceptLoginUser=action.payload
       }
    }
})
// reducer
export default usersSlice.reducer
// actions
export const {GET_ALL_USERS,GET_LOGIN_USER_FULL_DATA,GET_USERS_EXCEPT_LOGIN_USER} =usersSlice.actions
// selects
export const selectAllUsers=state=>state.users.allUsers
export const selectLoginUserFullData=state=>state.users.loginUserFullData
export const selectAllUserExceptLoginUser=state=>state.users.allUsersExceptLoginUser
// async actions
export const actionUpdateFollow=(loginUserFullData,userClickedToFollow)=>async()=>{
    // console.log(loginUserFullData)
    // console.log(userClickedToFollow)

 // kiểm tram xem user muốn follow tồn tại trong mảng following chưa , có thì xóa , không có thì add
const checkFollow=loginUserFullData.following.every(user=>user.userId!==userClickedToFollow.userId)
 console.log('render')  
 if(checkFollow){
       // update following của user đang đăng nhập
    updateDoc(doc(db,'users',loginUserFullData.docId),{
        following:[...loginUserFullData.following,{
           userId:userClickedToFollow.userId,
           userName:userClickedToFollow.userName,
           avatar:userClickedToFollow.avatar
        }]
 
   })
       // update followers của user được click để follow
   updateDoc(doc(db,'users',userClickedToFollow.docId),{
       followers:[...userClickedToFollow.followers,{
         userId:loginUserFullData.userId,
         userName:loginUserFullData.userName,
         avatar:loginUserFullData.avatar
       }]
       
 })
   }else{
       //lấy ra mảng chứa index , vị trí user muốn unfollow
     const arrayContainIndexOfLoginUser = loginUserFullData.following.map((user,index)=>{
         if(user.userId===userClickedToFollow.userId){
             return index
         }
     })
     // lấy chính xác ra số index
     const indexOfUserToUnfollow=arrayContainIndexOfLoginUser.find(index=>index!==undefined)
     // copy mảng following của user đang đăng nhập để splice không bị lỗi
      const arrayFollowingCopy=[...loginUserFullData.following]
      // splice user muốn unfollow
      arrayFollowingCopy.splice(indexOfUserToUnfollow,1)
    // update dữ liệu mới lên
      updateDoc(doc(db,'users',loginUserFullData.docId),{
        following:[...arrayFollowingCopy]
        
  })
  const arrayContainIndexOfUserClicked = userClickedToFollow.followers.map((user,index)=>{
    if(user.userId===loginUserFullData.userId){
        return index
    }
})
const indexOfUserToDeletefollow=arrayContainIndexOfUserClicked.find(index=>index!==undefined)
 const arrayFollowersCopy=[...userClickedToFollow.followers]
 arrayFollowersCopy.splice(indexOfUserToDeletefollow,1)
 updateDoc(doc(db,'users',userClickedToFollow.docId),{
    followers:[...arrayFollowersCopy]
    
})
      
   }
}
