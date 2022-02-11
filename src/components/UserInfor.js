import React from 'react'
import {useParams,Link} from 'react-router-dom'
import { GET_ALL_USERS } from '../features/usersSilce'
import { selectAllUsers } from '../features/usersSilce'
import { selectLoginUserInfor } from '../features/loginSlice'
import {Outlet,useLocation,use} from 'react-router-dom'
import {AiOutlineTable} from 'react-icons/ai'
import {FiBookmark} from 'react-icons/fi' 
import {MdOutlinePersonPin} from 'react-icons/md'
import {FaUserCheck} from 'react-icons/fa'
import {BsThreeDots,BsChevronDown} from 'react-icons/bs'
import {IoIosSettings} from 'react-icons/io'
import {IoChevronDown} from 'react-icons/io5'
import {useSelector} from 'react-redux'
import Footer from './Footer'


function UserInfor() {
   const allUsers=useSelector(selectAllUsers)
   const loginUserInfor=useSelector(selectLoginUserInfor)
   const {userId} = useParams()
   const urlObject=useLocation()
   const url=urlObject.pathname
   if(allUsers.length>0){
  const filterUserById=allUsers.find(user=>user.userId===userId)
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
                  <div className='flex gap-x-2 h-[30px] items-center mb-[20px]'>
                            <span className='text-2xl font-light'>{filterUserById.userName}</span>
                            <div  className=' h-full  flex items-center  px-6 text-whiteColor font-medium text-sm rounded bg-[#0095f6] cursor-pointer '>Theo dõi </div>
                            <div className='text-whiteColor px-2.5 h-full flex items-center rounded bg-[#0095f6] cursor-pointer'><BsChevronDown/></div>
                            <span className='px-1 text-xl cursor-pointer ' ><BsThreeDots/></span>
                        </div>
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
 </div>
   }
   else{
     return ''
   }
 
}

export default UserInfor