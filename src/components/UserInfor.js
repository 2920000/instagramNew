import React from 'react'
import {useParams,Link,useNavigate} from 'react-router-dom'
import { selectAllUsers } from '../features/usersSilce'
import { selectLoginUserInfor } from '../features/loginSlice'
import {Outlet,useLocation} from 'react-router-dom'
import {AiOutlineTable} from 'react-icons/ai'
import {FiBookmark} from 'react-icons/fi' 
import {MdOutlinePersonPin} from 'react-icons/md'
import {BsThreeDots,BsChevronDown} from 'react-icons/bs'
import {FaUserCheck} from 'react-icons/fa'
import {IoChevronDown} from 'react-icons/io5'
import {IoIosSettings} from 'react-icons/io'
import {useSelector,useDispatch} from 'react-redux'
import { actionUpdateFollow } from '../features/usersSilce'
import Footer from './Footer'
import { selectLoginUserFullData } from '../features/usersSilce'
import { UNFOLLOW_BOX } from '../features/followSlice'
import SeeFollowing from './SeeFollowing'
import { actionNavigateToChatBox } from '../features/chatSlice'
import { selectBoxId } from '../features/chatSlice'
function UserInfor() {
   const dispatch=useDispatch()
   const allUsers=useSelector(selectAllUsers)
   const loginUserInfor=useSelector(selectLoginUserInfor)
   const loginUserFullData=useSelector(selectLoginUserFullData)
   const boxId=useSelector(selectBoxId)
   const {userId} = useParams()
   const urlObject=useLocation()
   const navigate=useNavigate()
   const url=urlObject.pathname
   if(allUsers.length>0){

  const filterUserById=allUsers.find(user=>user.userId===userId)    
  const handleFollow=()=>{
    dispatch(actionUpdateFollow(loginUserFullData,filterUserById))
   }

   const handleUnFollow=()=>{
    const unfollowBoxWithOverlay={
      isShow:true,
      dataUserToUnfollow:{
        avatar:filterUserById.avatar,
        userName:filterUserById.userName
      },
      dataToUpdateFollowStatus:{
       loginUserFullData,
       userClickedToUnfollow:filterUserById
      }
   }
 dispatch(UNFOLLOW_BOX(unfollowBoxWithOverlay))
   }
   const handleChat=()=>{
      dispatch(actionNavigateToChatBox(loginUserFullData,filterUserById))  
   }
   // mai sửa lại ,nếu có dữ liệu r thì dùng link luôn 
   if(boxId){
    navigate(`/chat/${loginUserFullData.userId}/${boxId}`)
  }
 return <div className='mt-[40px]'>
      <div className='max-w-[990px] pt-[30px] px-[20px] m-auto h-[200px]'>
          <div className='flex items-center mb-[44px] '>
              <div className='grow-[1] mr-[30px]  '><img className=' w-20  md:w-36  m-auto rounded-full object-cover' src={filterUserById.avatar} alt='' /></div>
              <div className='grow-[2]'>
                  {loginUserInfor.userId===userId
                  ?<div className='flex flex-col space-y-4'>
                      <div className='flex items-center space-x-4'>
                      <span className='text-2xl font-light'>{filterUserById.userName}</span>
                      <span className='border border-solid rounded py-[6px] leading-none px-2 font-medium text-sm cursor-pointer  border-greyColor'>Chỉnh sửa trang cá nhân</span>
                      <span><IoIosSettings className='text-2xl cursor-pointer'/></span></div>
                       <div className='flex space-x-10'>
                          <span><span className='font-medium'>{filterUserById.postsNumber}</span> bài viết</span>
                          <span><span className='font-medium cursor-pointer'>{filterUserById.followers.length}</span> người theo dõi</span>
                          <span> Đang theo dõi <span  className='font-medium cursor-pointer' >{filterUserById.following.length}</span> người dùng  </span>

                       </div>
                  </div>
                  :<div>
                  {loginUserFullData.following
                  ?<>{loginUserFullData.following.every(followingUser=>followingUser.userId!==filterUserById.userId)
                  ?<div className='flex gap-x-2 h-[30px] items-center mb-5 '>
                            <span className='text-2xl font-light mr-5'>{filterUserById.userName}</span>
                        <div  onClick={handleFollow} className=' h-full  flex items-center  px-6 text-whiteColor font-medium text-sm rounded bg-[#0095f6] cursor-pointer '>Theo dõi </div>
                            <div className='text-whiteColor px-2.5 h-full flex items-center rounded bg-[#0095f6] cursor-pointer'><BsChevronDown/></div>
                            <span className='px-1 text-xl cursor-pointer ' ><BsThreeDots/></span>
                        </div>
                      : <div className='flex  h-[30px] gap-x-2 mb-5 items-center'>
                      <span className='text-2xl font-light mr-5'>{filterUserById.userName}</span>
                          <div onClick={()=>{handleChat()}} className='h-full px-2 rounded border cursor-pointer border-borderColor font-medium text-sm flex items-center'>Nhắn tin</div>
                                <div  onClick={handleUnFollow} className='h-full px-7 text-greyColor  cursor-pointer rounded border border-borderColor flex items-center'><FaUserCheck/></div>
                                <div className='h-full px-2 rounded border cursor-pointer border-borderColor flex items-center'><IoChevronDown/></div>

                           </div>   }</>:''}
                      
                           
                            <div className='flex space-x-10'>
                          <span><span className='font-medium'>{filterUserById.postsNumber}</span> bài viết</span>
                          <span><span className='font-medium cursor-pointer'>{filterUserById.followers.length}</span> người theo dõi</span>
                          <span> Đang theo dõi <span  className='font-medium cursor-pointer' >{filterUserById.following.length}</span> người dùng  </span>

                       </div>
                  </div>}
              </div>
          </div>
          <div className='flex justify-center space-x-16 border-t border-borderColor'> 
             <Link to={``}><span className={`py-4 flex gap-x-1 items-center ${url===`/${filterUserById.userId}`?'shadow-[0_-0.8px_0_black]':'opacity-50'} tracking-[1px] text-xs cursor-pointer font-medium`}><AiOutlineTable/>BÀI VIẾT</span></Link>
             {userId===loginUserInfor.userId?<Link to={`saved`}><span className={`py-4 flex gap-x-1 items-center ${url===`/${filterUserById.userId}/saved`?'shadow-[0_-0.8px_0_black]':'opacity-50'} tracking-[1px] text-xs cursor-pointer font-medium`}><FiBookmark/>ĐÃ LƯU</span></Link>:<></>}
             <Link to={`tagged`}><span className={`py-4 flex gap-x-1 items-center ${url===`/${filterUserById.userId}/tagged`?'shadow-[0_-0.8px_0_black]':'opacity-50'} tracking-[1px] text-xs cursor-pointer font-medium`}><MdOutlinePersonPin/>ĐƯỢC GẮN THẺ</span></Link>

          </div>
          <div>
             <Outlet/>
          </div>
         <Footer/>
      </div>
      {/* <SeeFollowing/> */}
 </div>
   }
   else{
     return ''
   }
 
}

export default UserInfor