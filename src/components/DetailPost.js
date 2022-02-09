import React,{useState} from 'react';
import {BiArrowBack} from 'react-icons/bi'
import {useNavigate} from 'react-router-dom'
import { selectLoginUserInfor } from '../features/loginSlice';
import {useSelector} from 'react-redux'
function DetailPost() {
    const [input,setInput]=useState()
    const loginUserInfor=useSelector(selectLoginUserInfor)
    const navigate=useNavigate()
    const handleBackToSelectAgain=()=>{
          navigate('/create/select')
    }
  return <div className='flex items-center flex-col  h-full'>
  <div className='w-full'>
          <div className='flex justify-between items-center py-2 px-3'>
              <span onClick={handleBackToSelectAgain}  className='text-2xl cursor-pointer'><BiArrowBack  /></span>     
              <span  className='font-medium text-blueColor cursor-pointer'>Post</span>
          </div>

          <div className='px-2 mt-5'>
              <div className='flex items-center gap-x-2  '> 
               <img className='w-8 h-8  rounded-full' src={loginUserInfor.avatar}  alt='' />
                <span className='font-medium text-sm'>{}</span>
              </div>
            <div><textarea autoFocus  className='border-0 w-full pt-2 outline-none' placeholder='Viết chú thích' /></div>
          </div>
          
        </div> 

         {/* {linkPreview.type==='image' &&<img className=' object-contain  max-w-full mt-5 '  src={linkPreview.link} alt=''/> }
         {linkPreview.type==='video'&& <video width="500"  controls className='mt-5'>
         <source src={linkPreview} type="video/mp4"/>

       </video>} */}
        </div>
}

export default DetailPost;
