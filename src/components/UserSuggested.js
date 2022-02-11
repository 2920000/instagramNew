import React from 'react'
import { selectAllUserExceptLoginUser,selectLoginUserFullData } from '../features/usersSilce'
import {useDispatch,useSelector} from 'react-redux'
import { actionUpdateFollow } from '../features/usersSilce'
import { selectUnfollow } from '../features/followSlice'
import { UNFOLLOW_BOX } from '../features/followSlice'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../configFirebase'
function UserSuggested() {
    const dispatch=useDispatch()
  const loginUserFullData=useSelector(selectLoginUserFullData)
   const followingArrayOfLoginUser=loginUserFullData.following
    const allUsersExceptLoginUser=useSelector(selectAllUserExceptLoginUser)

    const handleFollow=(userClickedToFollow)=>{
     dispatch(actionUpdateFollow(loginUserFullData,userClickedToFollow))
    }
    const handleStartToUseApp=()=>{
      updateDoc(doc(db,'users',loginUserFullData.docId),{
        isReady:true
      })
    }
    
    const handleUnfollow=(userClickedToUnfollow)=>{
      const unfollowBoxWithOverlay={
         isShow:true,
         dataUserToUnfollow:{
           avatar:userClickedToUnfollow.avatar,
           userName:userClickedToUnfollow.userName
         },
         dataToUpdateFollowStatus:{
          loginUserFullData,
          userClickedToUnfollow
         }
      }
 
    dispatch(UNFOLLOW_BOX(unfollowBoxWithOverlay))
    }
    if(followingArrayOfLoginUser){
      return (
        <div className='pt-[55px] max-w-[600px] m-auto '>
            <div className='font-medium mb-3 '>Gợi ý cho bạn</div>
            <div className='border border-borderColor py-2'>
               {allUsersExceptLoginUser.map(user=><div className='flex py-2 px-4 items-center justify-between' key={user.userId}>
                       <div className='flex items-center cursor-pointer gap-x-2'>
                            <span><img className='w-12 rounded-full' src={user.avatar} alt='' /></span>
                            <span className='text-sm font-medium'>{user.userName}</span>
                       </div>
                       <div>
                       {followingArrayOfLoginUser.some(followingUser=>followingUser.userId===user.userId)
                       ?<span onClick={()=>{handleUnfollow(user)}} className='text-sm font-medium border border-borderColor rounded py-1.5 px-2.5 cursor-pointer'>Đang theo dõi</span>
                       :<span  onClick={()=>{handleFollow(user)}} className='py-1.5 px-2.5 cursor-pointer  rounded-md bg-textFollowColor text-whiteColor font-medium text-sm'>Theo dõi</span>}
                       </div>
               </div>)}
              {followingArrayOfLoginUser.length>0
              ? <div className='py-2 px-4 mt-5'>
                 <div onClick={()=>{handleStartToUseApp()}} className='bg-textFollowColor rounded py-1.5  cursor-pointer font-medium text-sm text-center text-whiteColor'>Bắt đầu</div>
              </div>:''}
            </div>
           
        </div>
      )
    }
    else{
      return ''
    }
  
}

export default UserSuggested