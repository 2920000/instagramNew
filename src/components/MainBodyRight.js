import React,{memo,useState} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {VscDeviceCamera} from 'react-icons/vsc'
import { selectLoginUserInfor } from '../features/loginSlice';
import { selectAllUserExceptLoginUser } from '../features/usersSilce';
import { Link } from 'react-router-dom';
import { actionUpdateFollow } from '../features/usersSilce';
import { UNFOLLOW_BOX } from '../features/followSlice';
import { selectAllPosts } from '../features/postsSlice';

import { selectLoginUserFullData } from '../features/usersSilce';
function MainBodyRight() {
   const dispatch=useDispatch()
   const [userId,setUserId]=useState()
   const [postsOfUserHover,setPostsOfUserHover]=useState([])
   const [clearTimeOut,setClearTimeOut]=useState()
   const loginUserInfor =useSelector(selectLoginUserInfor)
   const loginUserFullData=useSelector(selectLoginUserFullData)
   const allUsersExceptLoginUser=useSelector(selectAllUserExceptLoginUser)
   const allPosts=useSelector(selectAllPosts)

   const handleFollow=(userClickedToFollow)=>{
    dispatch(actionUpdateFollow(loginUserFullData,userClickedToFollow))
   }
   const handleUnFollow=(userClickedToUnfollow)=>{
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
   const handleHoverToCreateInforMini=(userId)=>{
    const x =  setTimeout(()=>{
      setUserId(userId)
     },800)
     setClearTimeOut(x)
     const filterPosts=allPosts.filter(post=>post.userId===userId)
     setPostsOfUserHover(filterPosts)
     
   }
   const handleUnHoverToCloseInforMini=()=>{
    setUserId()
    clearTimeout(clearTimeOut)

  }
  return <div className=' fixed w-full max-w-[293px]   '>
         <div>
             <div className=' flex justify-between items-center mt-[18px] mb-[10px]'>
                 <div className='flex items-center gap-x-4  '>
                   <Link to={`${loginUserInfor.userId}`}><div><img className='w-14 h-14 rounded-full cursor-pointer ' src={loginUserInfor.avatar} alt='' /></div></Link>
                   <Link to={`${loginUserInfor.userId}`}> <span className='text-sm font-medium cursor-pointer' >{loginUserInfor.name}</span></Link>
                 </div>
                 <span className='text-xs text-textFollowColor  cursor-pointer font-medium '>Chuyển</span>
             </div>
         </div>

         <div>
         <div className=''>
          <div className='flex justify-between items-center mt-5'>
              <span className='text-[#8E8E8E] cursor-pointer font-medium text-sm'>Gợi ý cho bạn</span>
              <Link to='explore/people'> <span className='text-xs cursor-pointer font-medium'>Xem tất cả</span></Link>
          </div>
           <div className='py-3'>
              {allUsersExceptLoginUser.map(user=><div className='flex justify-between items-center ml-1 mb-4' key={user.userId}>
                    <div onMouseLeave={()=>{handleUnHoverToCloseInforMini()}} onMouseEnter={()=>{handleHoverToCreateInforMini(user.userId)}} className='flex items-center relative gap-x-2'>
                         <Link to={`/${user.userId}`}> <span  ><img className='w-8 rounded-full cursor-pointer' src={user.avatar} alt='' /></span></Link>
                         <Link to={`/${user.userId}`}><span className='text-sm font-medium cursor-pointer'>{user.userName}</span></Link>
                         {userId===user.userId
                         ?<div className=' absolute z-30 top-[32px]  w-[400px] rounded-xl shadow-[0_0_3px_grey] bg-whiteColor '>
                          <div className='flex space-x-3 px-4 py-5 items-center'>
                          <img className='w-12 h-12 rounded-full object-cover cursor-pointer'  src={user.avatar} alt='' /> 
                          <span className='text-sm font-medium cursor-pointer' >{user.userName}</span>
                          </div>
                           <div className='flex justify-around  p-4 border-y border-borderColor' >
                               <div className='flex flex-col items-center'>
                                   <span className='font-medium'>{user.postsNumber}</span>
                                   <span className='text-greyColor text-sm'>bài viết</span>
                               </div>
                               <div className='flex flex-col items-center'>
                                   <span className='font-medium'>{user.followers.length}</span>
                                   <span className='text-greyColor text-sm'>người theo dõi</span>
                               </div>
                               <div className='flex flex-col items-center'>
                                   <span className='text-greyColor text-sm'>Đang theo dõi </span>
                                    <span className='font-medium'>{user.following.length}</span>
                                    <span className='text-greyColor text-sm'>người dùng</span>
                               </div>
                           </div>
                           {user.postsNumber>0?<div className='grid grid-cols-3 mx-[2px] '>{postsOfUserHover.map((post,index)=>{
                             if(index<=2){
                            return  <div  key={post.postId}>
                           {post.type==='image'? <img className='h-32 cursor-pointer  object-cover w-full' src={post.pictureOrVideoOfPost} alt='' />
                           :<video className='h-[128px] w-full bg-greyColor' controls><source src={post.pictureOrVideoOfPost} type='video/mp4' /></video>}
                           </div>
                             }
                             else{
                               return  ''
                             }
                           })}</div>:
                            <div className='flex flex-col items-center pt-5 pb-2 '>
                                 <span><VscDeviceCamera className='text-3xl'/></span>
                                 <span className='font-medium text-sm'>Chưa có bài viết nào</span>
                                 <span></span>
                           </div>}
                           <div className='flex items-center justify-center py-3.5 border-t border-borderColor'>{user.followers
                           ?<div>
                               {user.followers.some(user=>user.userId===loginUserInfor.userId)
                               ?<div className='flex items-center gap-x-2'>
                                    <span className='py-1 px-14 text-sm font-medium rounded border cursor-pointer border-borderColor'>Nhắn tin</span>
                                    <span   className='py-1 px-14 text-sm font-medium rounded border cursor-pointer border-borderColor'>Đang theo dõi</span>
                               </div>
                               :<span  className='rounded-md py-1.5 px-40 bg-[#0095f6] text-sm font-medium cursor-pointer text-whiteColor'>Theo dõi</span>}

                           </div>
                           :''}</div>
                           </div>
                         :<div></div>}
                    </div>
                   {user.followers.some(user=>user.userId===loginUserInfor.userId)
                   ? <span onClick={()=>{handleUnFollow(user)}} className='font-medium text-xs  cursor-pointer'>Đang theo dõi</span>
                   : <span onClick={()=>{handleFollow(user)}} className='font-medium text-xs text-textFollowColor  cursor-pointer'>Theo dõi</span>}
              </div>)}
           </div>
             <div>
             <div className='mt-5'>
                <div className='text-[0.70rem] text-greyColor'>Giới thiệu &middot; Trợ giúp &middot; Báo chí &middot; API&middot; Việc làm &middot;</div>
                <div className='text-[0.70rem] text-greyColor' >Quyền riêng tư &middot; Điều khoản &middot; Vị trí &middot; </div>
                <div className='text-[0.70rem] text-greyColor'>Tài khoản liên quan nhất &middot; Hashtag &middot; Ngôn ngữ </div>
                </div>
                <div className='text-[0.70rem] text-greyColor mt-5'>@ 2022 INSTAGRAM FROM META</div>
             </div>
      </div>
         </div>     
  </div>
}

export default memo(MainBodyRight)
